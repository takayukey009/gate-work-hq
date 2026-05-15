/**
 * ====================================================
 * GATE オーディション管理 - GAS WebApp API
 * ダッシュボードからの新規追加 & ファイルアップロード対応
 * ====================================================
 * 
 * 【セットアップ手順】
 * 1. Google Apps Script に新規プロジェクト作成
 * 2. このスクリプトをコピー
 * 3. SPREADSHEET_ID を自分のスプレッドシートIDに変更
 * 4. DRIVE_FOLDER_ID を保存先フォルダIDに変更（任意）
 * 5. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」
 *    - 実行ユーザー: 自分
 *    - アクセス: 全員
 * 6. 表示されるURLをダッシュボードの app.js の GAS_WEBAPP_URL に設定
 */

const SPREADSHEET_ID = '1NBZce4Xqx7FgbXujQlaO15xd-nAZvUmAqBVGRBgIaGU';
const SHEET_NAME = 'シート1';
const DRIVE_FOLDER_ID = '1EyDWtQ_yBsGMpsw0ZKGsImFgVHjQOAhd'; // GATE_オーディション資料フォルダ

// ============================================================
// POST: 新規オーディション追加
// ============================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // 次のIDを取得
    const lastRow = sheet.getLastRow();
    const nextId = lastRow > 1 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
    
    const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd');
    
    // ファイルがBase64で送られてきた場合、Driveに保存
    let fileUrl = data.fileUrl || '';
    if (data.fileBase64 && data.fileName) {
      fileUrl = saveFileToDrive(data.fileBase64, data.fileName, data.fileMimeType);
    }
    
    // スプレッドシートに追記
    sheet.appendRow([
      nextId,
      data.talentName || '',
      data.auditionName || '',
      data.genre || '',
      data.deadline || '',
      data.auditionDate || '',
      data.status || '情報収集',
      data.owner || 'マネージャー',
      data.action || '',
      data.result || '未定',
      data.notes || '',
      today,
      today,
      fileUrl,
      data.resultDate || '',
      data.releaseDate || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, id: nextId, fileUrl: fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// GET: データ取得API
// ============================================================
const SALES_SPREADSHEET_ID = '107oRwGTZM7-_OKOwjgw_efgXYDQJTarm6Da1SsJjVOg';
const SALES_SHEET_NAME = '2025年7月~2026年6月';
const MANAGED_TALENTS = ['谷口彩菜','寺崎ひな','小久保宏紀','島田和奏','中塚智','太田陽菜'];

// タレント別カレンダーID
const TALENT_CALENDARS = {
  '谷口彩菜': 'ayana.taniguchi@gate-agency.com',
  '寺崎ひな': 'hina.terasaki@gate-agency.com',
  '小久保宏紀': 'hiroki.kokubo@gate-agency.com',
  '島田和奏': 'wakana.shimada@gate-agency.com',
  '中塚智': 'satoshi.nakatsuka@gate-agency.com',
  '太田陽菜': 'hina.ota@gate-agency.com'
};

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  
  if (action === 'sales') {
    return getSalesData();
  }
  
  if (action === 'calendar') {
    return getCalendarData(e);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'GATE Audition API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// カレンダーデータ取得
// ============================================================
function getCalendarData(e) {
  try {
    const now = new Date();
    const startDate = e && e.parameter && e.parameter.start
      ? new Date(e.parameter.start)
      : new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = e && e.parameter && e.parameter.end
      ? new Date(e.parameter.end)
      : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    const allEvents = [];
    
    for (var talent in TALENT_CALENDARS) {
      try {
        var cal = CalendarApp.getCalendarById(TALENT_CALENDARS[talent]);
        if (!cal) continue;
        var events = cal.getEvents(startDate, endDate);
        for (var i = 0; i < events.length; i++) {
          var ev = events[i];
          allEvents.push({
            talent: talent,
            title: ev.getTitle(),
            start: Utilities.formatDate(ev.getStartTime(), 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mm:ss"),
            end: Utilities.formatDate(ev.getEndTime(), 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mm:ss"),
            allDay: ev.isAllDayEvent(),
            location: ev.getLocation() || '',
            description: (ev.getDescription() || '').substring(0, 200)
          });
        }
      } catch (calErr) {
        Logger.log('Calendar error for ' + talent + ': ' + calErr.message);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, events: allEvents }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSalesData() {
  try {
    const ss = SpreadsheetApp.openById(SALES_SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SALES_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // ヘッダー行（月ラベル）
    const headers = data[0];
    
    const result = {};
    for (let i = 1; i < data.length; i++) {
      const name = String(data[i][0] || '').trim();
      if (!MANAGED_TALENTS.includes(name)) continue;
      
      const monthly = [];
      for (let j = 1; j <= 12; j++) {
        const raw = data[i][j];
        let val = 0;
        if (typeof raw === 'number') {
          val = raw;
        } else if (raw) {
          val = parseFloat(String(raw).replace(/[¥,]/g, '')) || 0;
        }
        monthly.push(val);
      }
      
      const totalRaw = data[i][13];
      let total = 0;
      if (typeof totalRaw === 'number') {
        total = totalRaw;
      } else if (totalRaw) {
        total = parseFloat(String(totalRaw).replace(/[¥,]/g, '')) || 0;
      }
      
      result[name] = { monthly, total };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// ファイルをGoogle Driveに保存
// ============================================================
function saveFileToDrive(base64Data, fileName, mimeType) {
  try {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      mimeType || 'application/octet-stream',
      fileName
    );
    
    let file;
    if (DRIVE_FOLDER_ID) {
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      file = folder.createFile(blob);
    } else {
      file = DriveApp.createFile(blob);
    }
    
    // 共有設定（リンクを知っている人がアクセス可能）
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (error) {
    Logger.log('ファイル保存エラー: ' + error.message);
    return '';
  }
}

// ============================================================
// テスト関数
// ============================================================
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        talentName: '中塚智',
        auditionName: 'テスト案件',
        genre: '映画',
        deadline: '2026/06/01',
        status: '情報収集',
        owner: 'マネージャー',
        action: 'テスト',
        result: '未定',
        notes: 'GAS APIテスト'
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
