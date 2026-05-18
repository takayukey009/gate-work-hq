/**
 * ====================================================
 * 週次オーディション情報自動配信システム
 * GATE株式会社 - Grok API × LINE Messaging API
 * ====================================================
 * 
 * 【セットアップ手順】
 * 1. このスクリプトをGoogle Apps Scriptにコピー
 * 2. スクリプトプロパティに以下を設定:
 *    - XAI_API_KEY: xAIのAPIキー
 *    - LINE_CHANNEL_ACCESS_TOKEN: LINE Messaging APIのチャネルアクセストークン
 *    - LINE_USER_ID: 送信先のLINEユーザーID
 * 3. setupWeeklyTrigger() を1回実行してトリガー設定
 */

// ============================================================
// メイン関数
// ============================================================

/**
 * メイン実行関数 - トリガーから呼ばれる
 */
function main() {
  try {
    Logger.log('=== オーディション情報検索 開始 ===');
    
    // 1. Grok APIでX上のオーディション情報を検索
    const searchResult = searchAuditions();
    
    if (!searchResult) {
      Logger.log('検索結果が空でした');
      sendToLine('【オーディション情報】\n今週は新しい募集情報が見つかりませんでした。');
      return;
    }
    
    // 2. LINE向けにメッセージを整形
    const message = formatMessage(searchResult);
    
    // 3. LINEに送信
    sendToLine(message);
    
    // 4. バックアップとしてGmailにも送信（オプション）
    sendBackupEmail(searchResult);
    
    Logger.log('=== オーディション情報検索 完了 ===');
    
  } catch (error) {
    Logger.log('エラー発生: ' + error.message);
    // エラー通知
    sendToLine('【システムエラー】オーディション情報の自動検索でエラーが発生しました。\n' + error.message);
  }
}

// ============================================================
// Grok API連携
// ============================================================

/**
 * Grok APIでX上のオーディション・キャスト募集情報を検索
 */
function searchAuditions() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('XAI_API_KEY');
  if (!apiKey) {
    throw new Error('XAI_API_KEY が設定されていません');
  }
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  
  const prompt = `${year}年${month}月に東京で開催される、または応募締切がある以下の募集情報をX（旧Twitter）から探してください：

【検索対象】
- 俳優オーディション
- キャスト募集（映画・ドラマ・舞台・CM・MV・ショートドラマ・Web動画）
- エキストラ募集
- モデル募集
- 声優オーディション

【条件】
- 東京またはオンラインで応募可能なもの
- 事務所所属の俳優・タレントが応募できるもの
- 締切が今後2週間以内のものを優先

【出力形式】
各案件について以下を含めてください：
1. 案件名・作品名
2. ジャンル（映画/ドラマ/舞台/CM等）
3. 募集内容（役柄・条件）
4. 応募締切
5. 応募方法・連絡先
6. X投稿元アカウント
7. 関連URL（あれば）

日本語で回答してください。見つからない場合は正直にその旨を伝えてください。`;

  const url = 'https://api.x.ai/v1/responses';
  const payload = {
    model: 'grok-4.3',
    input: [{ role: 'user', content: prompt }],
    tools: [{ type: 'x_search' }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  Logger.log('Grok API 呼び出し中...');
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();
  
  if (statusCode !== 200) {
    throw new Error('Grok API エラー (HTTP ' + statusCode + '): ' + response.getContentText().substring(0, 500));
  }

  const data = JSON.parse(response.getContentText());
  
  // Responses APIのレスポンスからテキストを抽出
  let resultText = '';
  if (data.output) {
    for (const item of data.output) {
      if (item.type === 'message' && item.content) {
        for (const c of item.content) {
          if (c.type === 'output_text') {
            resultText += c.text;
          }
        }
      }
    }
  }
  
  Logger.log('検索結果: ' + resultText.substring(0, 200) + '...');
  return resultText;
}

// ============================================================
// メッセージ整形
// ============================================================

/**
 * 検索結果をLINE向けに整形
 * LINEテキストメッセージは最大5000文字
 */
function formatMessage(rawText) {
  const today = new Date();
  const dateStr = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyy/MM/dd (E)');
  
  let message = '🎬 週次オーディション情報レポート\n';
  message += '📅 ' + dateStr + '\n';
  message += '━━━━━━━━━━━━━━━━\n\n';
  message += rawText;
  message += '\n\n━━━━━━━━━━━━━━━━\n';
  message += '🤖 Grok API × X Search で自動取得\n';
  message += '📌 GATE株式会社 総務AI';
  
  // LINEの文字数制限（5000文字）に収める
  if (message.length > 4900) {
    message = message.substring(0, 4850) + '\n\n...(続きはメールで確認)';
  }
  
  return message;
}

// ============================================================
// LINE Messaging API連携
// ============================================================

/**
 * LINE Messaging APIでプッシュメッセージを送信
 */
function sendToLine(message) {
  const token = PropertiesService.getScriptProperties().getProperty('LINE_CHANNEL_ACCESS_TOKEN');
  const userId = PropertiesService.getScriptProperties().getProperty('LINE_USER_ID');
  
  if (!token || !userId) {
    Logger.log('LINE設定が未完了のため、LINEへの送信をスキップします');
    Logger.log('メッセージ内容: ' + message.substring(0, 500));
    return;
  }
  
  const url = 'https://api.line.me/v2/bot/message/push';
  
  // 長いメッセージは分割送信（LINEは1メッセージ5000文字まで）
  const messages = splitMessage(message, 4900);
  const lineMessages = messages.map(function(text) {
    return { type: 'text', text: text };
  });
  
  // 最大5メッセージまで1リクエストで送信可能
  const payload = {
    to: userId,
    messages: lineMessages.slice(0, 5)
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();
  
  if (statusCode !== 200) {
    throw new Error('LINE API エラー (HTTP ' + statusCode + '): ' + response.getContentText());
  }
  
  Logger.log('LINE送信完了');
}

/**
 * メッセージを指定文字数で分割
 */
function splitMessage(text, maxLength) {
  const chunks = [];
  let remaining = text;
  
  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }
    // 改行位置で分割を試みる
    let splitIndex = remaining.lastIndexOf('\n', maxLength);
    if (splitIndex < maxLength * 0.5) {
      splitIndex = maxLength;
    }
    chunks.push(remaining.substring(0, splitIndex));
    remaining = remaining.substring(splitIndex);
  }
  
  return chunks;
}

// ============================================================
// バックアップメール送信
// ============================================================

/**
 * Gmailにもバックアップとして送信
 */
function sendBackupEmail(content) {
  try {
    const today = new Date();
    const dateStr = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyy/MM/dd');
    const subject = '【GATE】週次オーディション情報レポート ' + dateStr;
    const body = '以下、Grok API × X検索による自動レポートです。\n\n' + content;
    
    GmailApp.sendEmail(
      Session.getActiveUser().getEmail(),
      subject,
      body
    );
    Logger.log('バックアップメール送信完了');
  } catch (e) {
    Logger.log('メール送信エラー（非致命的）: ' + e.message);
  }
}

// ============================================================
// トリガー設定
// ============================================================

/**
 * 週次トリガーを設定（毎週月曜 9:00-10:00）
 * ※ 初回1回だけ手動実行する
 */
function setupWeeklyTrigger() {
  // 既存のトリガーを削除
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'main') {
      ScriptApp.deleteTrigger(trigger);
    }
  }
  
  // 新しい週次トリガーを作成
  ScriptApp.newTrigger('main')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .nearMinute(0)
    .create();
  
  Logger.log('週次トリガーを設定しました（毎週月曜 9:00-10:00）');
}

/**
 * テスト用トリガーを削除
 */
function removeAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  Logger.log('全トリガーを削除しました');
}

// ============================================================
// テスト関数
// ============================================================

/**
 * Grok API接続テスト
 */
function testGrokApi() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('XAI_API_KEY');
  
  const url = 'https://api.x.ai/v1/chat/completions';
  const payload = {
    model: 'grok-3-mini',
    messages: [{ role: 'user', content: 'Hello! 日本語で自己紹介してください。一文で。' }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + apiKey },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  Logger.log('Status: ' + response.getResponseCode());
  Logger.log('Response: ' + response.getContentText().substring(0, 500));
}

/**
 * LINE送信テスト
 */
function testLineSend() {
  sendToLine('🧪 テスト通知\n\nGATE株式会社 オーディション情報自動配信システムのテストメッセージです。\nこのメッセージが届いていれば、LINE連携は正常に動作しています。');
}

/**
 * 全体テスト（Grok検索 → LINE送信）
 */
function testFullFlow() {
  main();
}
