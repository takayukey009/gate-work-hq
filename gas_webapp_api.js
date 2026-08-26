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
const SHEET_NAME = 'オーディション';
const DRIVE_FOLDER_ID = '1EyDWtQ_yBsGMpsw0ZKGsImFgVHjQOAhd'; // GATE_オーディション資料フォルダ
const NANDEMO_FOLDER_ID = '1eN0gfw6f1DjFvdVoSYPrxMKxQd4t1of2'; // 何でもフォルダ

// ============================================================
// Access Control (Token Validation)
// ============================================================
function checkToken(e, data) {
  const expected = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
  if (!expected) return true; // 未設定時は素通り
  const got = (data && data.token) || (e && e.parameter && e.parameter.token) || '';
  return got === expected;
}

function forbidden() {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: 'unauthorized' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// POST: 新規オーディション追加
// ============================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const postMode = data.mode || data.action || '';

    // ミッション管理系POST処理
    if (postMode === 'mission_progress') {
      return handleMissionProgress(data);
    }
    if (postMode === 'mission_target') {
      return handleMissionTarget(data);
    }
    if (postMode === 'init_mission') {
      return ContentService
        .createTextOutput(JSON.stringify(initMissionSheets()))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.sheetType !== 'talent_survey' && !checkToken(null, data)) return forbidden();

    // 個人キーが送られてきた場合は本人性を検証し、名前はサーバ側で確定する（なりすまし・上書き事故防止）
    if (data.sheetType === 'talent_survey' && data.surveyKey) {
      const talent = findTalentByKey(data.surveyKey);
      if (!talent) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'invalid key' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      data.talentName = talent.name; // クライアントの申告値より優先
    }

    // カレンダー操作の判定を最初に行う（スプレッドシート操作でのエラー回避）
    if (data.action === 'create_calendar_event' || data.action === 'get_calendar_free_busy' || data.action === 'create_allday_event' || data.action === 'delete_calendar_events' || data.action === 'export_obsidian') {
      let result;
      if (data.action === 'create_calendar_event') {
        result = createCalendarEvent(data.calendarId, data.summary, data.startTime, data.endTime, data.description);
      } else if (data.action === 'get_calendar_free_busy') {
        result = getCalendarFreeBusy(data.calendarId, data.start, data.end);
      } else if (data.action === 'create_allday_event') {
        result = createAllDayEvent(data.calendarId, data.summary, data.date);
      } else if (data.action === 'delete_calendar_events') {
        result = deleteCalendarEvents(data.calendarId, data.titlePrefix);
      } else if (data.action === 'export_obsidian') {
        if (typeof exportVaultToObsidian === 'function') {
          exportVaultToObsidian();
          result = { success: true, message: 'Obsidian sync completed' };
        } else {
          result = { success: false, error: 'exportVaultToObsidian function not found' };
        }
      }
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd');

    // タレントサーベイの指定行削除
    if (data.action === 'delete_survey_row') {
      const sheet = ss.getSheetByName('talent_survey');
      if (sheet) {
        const values = sheet.getDataRange().getValues();
        const targetId = String(data.id || '');
        const targetName = String(data.talentName || '');
        for (let i = values.length - 1; i >= 1; i--) {
          const rowId = String(values[i][0]);
          const rowName = String(values[i][1]);
          if ((targetId && (rowId === targetId || parseFloat(rowId) === parseFloat(targetId))) ||
              (targetName && rowName === targetName)) {
            sheet.deleteRow(i + 1);
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // タレントアンケート回答の追加・上書き処理
    if (data.sheetType === 'talent_survey') {
      let sheet = ss.getSheetByName('talent_survey');
      if (!sheet) {
        sheet = ss.insertSheet('talent_survey');
        sheet.appendRow(['ID', 'タレント名', '更新日', 'バイブル映画', 'バイブルドラマ', '最近の作品', '目標俳優', '演じたい役柄', '偏愛', 'RAWデータ']);
        sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
        sheet.setFrozenRows(1);
      }
      
      const lastRow = sheet.getLastRow();
      const nextId = lastRow > 1 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
      
      const surveyData = data.data || {};
      const bibleMovie = surveyData.bibleMovie || '';
      const bibleDrama = surveyData.bibleDrama || '';
      const recentTitle = surveyData.recentTitle || '';
      const targetActor = surveyData.targetActor || '';
      
      const desiredRolesList = surveyData.desiredRoles || [];
      const desiredRoles = desiredRolesList.join(', ') + (surveyData.desiredRolesOther ? ' (' + surveyData.desiredRolesOther + ')' : '');
      
      const loves = [surveyData.love1, surveyData.love2, surveyData.love3].filter(Boolean).join(', ');
      
      const targetTalentName = normalizeTalentName(data.talentName);
      
      // 同一タレントの既存の回答があるか確認し、あれば上書き、なければ新規追加
      let rowIndex = -1;
      if (lastRow > 1) {
        const range = sheet.getRange(2, 2, lastRow - 1, 1);
        const values = range.getValues();
        for (let i = 0; i < values.length; i++) {
          const existingName = normalizeTalentName(values[i][0]);
          if (existingName === targetTalentName || values[i][0] === data.talentName) {
            rowIndex = i + 2;
            break;
          }
        }
      }
      
      const rowId = rowIndex > 0 ? sheet.getRange(rowIndex, 1).getValue() : nextId;
      const rowData = [
        rowId,
        targetTalentName,
        today,
        bibleMovie,
        bibleDrama,
        recentTitle,
        targetActor,
        desiredRoles,
        loves,
        JSON.stringify(surveyData)
      ];
      
      if (rowIndex > 0) {
        sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'Survey saved successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 営業アタックシートへの追加処理
    if (data.sheetType === 'sales_attack') {
      const sheet = ss.getSheetByName('営業アタック');
      const lastRow = sheet.getLastRow();
      const nextId = lastRow > 1 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
      
      sheet.appendRow([
        nextId,
        data.companyName || '',        // B: 社名
        data.companyType || '',        // C: アプローチ先種別
        data.contactName || '',        // D: 担当者名
        data.contactInfo || '',        // E: 連絡先
        data.lastApproachDate || '',   // F: 最終アプローチ日
        data.approachMethod || '',     // G: アプローチ方法
        data.nextApproachDate || '',   // H: 次回アクション予定日
        data.nextApproachAction || '', // I: 次回アクション内容
        data.status || '未アプローチ',  // J: アタックステータス
        data.talentName || '',         // K: 提案タレント
        data.rating || '',             // L: 確度/感触
        data.notes || '',              // M: 備考/メモ
        today,                         // N: 登録日
        today                          // O: 更新日
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, id: nextId }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // ファイルがBase64で送られてきた場合、Driveに保存
    let fileUrl = data.fileUrl || '';
    if (data.fileBase64 && data.fileName) {
      fileUrl = saveFileToDrive(data.fileBase64, data.fileName, data.fileMimeType);
    }
    
    // 行番号直接指定の削除アクション対応
    if (data.action === 'delete_row_by_index' && data.rowIndex) {
      const sheet = ss.getSheetByName(SHEET_NAME);
      const rowIdx = Number(data.rowIndex);
      if (rowIdx > 1 && rowIdx <= sheet.getLastRow()) {
        sheet.deleteRow(rowIdx);
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, message: 'Row deleted by index', rowIndex: rowIdx }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 行削除アクション対応
    if (data.action === 'delete_row' && data.id) {
      const targetId = String(data.id);
      const sheet = ss.getSheetByName(SHEET_NAME);
      const lastRow = sheet.getLastRow();
      let foundRow = -1;
      if (lastRow > 1) {
        const idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (let i = 0; i < idValues.length; i++) {
          const cellVal = String(idValues[i][0]);
          if (cellVal === targetId || String(Number(cellVal)) === String(Number(targetId))) {
            foundRow = i + 2;
            break;
          }
        }
      }
      if (foundRow > 0) {
        sheet.deleteRow(foundRow);
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, message: 'Row deleted', id: targetId }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Target ID not found: ' + targetId }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    const isUpdate = (data.action === 'update' || (data.id && data.id !== 'undefined') || data.rowIndex);
    if (isUpdate) {
      const targetId = String(data.id || '');
      const lastRow = sheet.getLastRow();
      let foundRow = -1;
      if (data.rowIndex && Number(data.rowIndex) > 1) {
        foundRow = Number(data.rowIndex);
      } else if (lastRow > 1) {
        const values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
        for (let i = 0; i < values.length; i++) {
          const cellVal = String(values[i][0]);
          const talent = String(values[i][1]);
          const audName = String(values[i][3]);
          if (data.matchTalent && data.matchName) {
            if (talent === data.matchTalent && audName.includes(data.matchName)) {
              foundRow = i + 2;
              break;
            }
          } else if (targetId && (cellVal === targetId || String(Number(cellVal)) === String(Number(targetId)))) {
            foundRow = i + 2;
            break;
          }
        }
      }
      if (foundRow === -1) {
        throw new Error('更新対象が見つかりません: ' + (targetId || data.rowIndex || data.matchName));
      }
      
      const existingData = sheet.getRange(foundRow, 1, 1, 17).getValues()[0];
      let origRegDate = today;
      if (existingData[12]) {
        try {
          origRegDate = Utilities.formatDate(new Date(existingData[12]), 'Asia/Tokyo', 'yyyy/MM/dd');
        } catch(e) {
          origRegDate = String(existingData[12]);
        }
      }
      const finalFileUrl = fileUrl || existingData[14] || '';
      
      const rowData = [
        existingData[0], // 元のID形式を保持
        data.talentName || '',
        data.type || 'オーディション',
        data.auditionName || '',
        data.genre || '',
        data.deadline || '',
        data.auditionDate || '',
        data.status || '情報収集',
        data.owner || 'マネージャー',
        data.action || '',
        data.result || '未定',
        data.notes || '',
        origRegDate,
        today,
        finalFileUrl,
        data.resultDate || '',
        data.releaseDate || ''
      ];
      sheet.getRange(foundRow, 1, 1, rowData.length).setValues([rowData]);
      
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, id: targetId, fileUrl: finalFileUrl }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 次のIDを取得
    const lastRow = sheet.getLastRow();
    const nextId = lastRow > 1 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
    
    // スプレッドシートに追記
    sheet.appendRow([
      nextId,                     // A: ID
      data.talentName || '',      // B: タレント名
      data.type || 'オーディション',// C: 案件種別
      data.auditionName || '',    // D: オーディション名
      data.genre || '',           // E: ジャンル
      data.deadline || '',        // F: 締切日
      data.auditionDate || '',    // G: オーディション日
      data.status || '情報収集',   // H: ステータス
      data.owner || 'マネージャー', // I: 対応者
      data.action || '',          // J: アクション
      data.result || '未定',        // K: 結果
      data.notes || '',           // L: 備考
      today,                      // M: 登録日
      today,                      // N: 更新日
      fileUrl,                    // O: 資料リンク
      data.resultDate || '',      // P: 結果発表
      data.releaseDate || ''      // Q: 公開日
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
const MANAGED_TALENTS = ['谷口彩菜','寺崎ひな','小久保宏紀','島田和奏','中塚智','太田陽菜','相馬寿樹'];

// タレント別カレンダーIDをマスタから動的生成
function getTalentCalendars() {
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  let sheet = ss.getSheetByName('タレントマスタ');
  if (!sheet) {
    getTalentMasterInternal();
    sheet = ss.getSheetByName('タレントマスタ');
  }
  
  const values = sheet.getDataRange().getValues();
  const cals = {};
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const name = String(row[0] || '').trim();
    const calId = String(row[3] || '').trim();
    const status = String(row[4] || '在籍').trim();
    if (name && calId && status === '在籍') {
      cals[name] = calId;
    }
  }
  return cals;
}

function doGet(e) {
  const action = (e && e.parameter && (e.parameter.mode || e.parameter.action)) || '';
  
  const publicActions = ['', 'talents', 'mission'];
  if (!publicActions.includes(action) && !checkToken(e, null)) return forbidden();
  
  // パラメータが無い（＝タレントがただURLを開いた）場合は入力フォームを表示する
  if (!action) {
    try {
      const tpl = HtmlService.createTemplateFromFile('talent_survey');
      tpl.webAppUrl = ScriptApp.getService().getUrl();
      const talentParam = (e && e.parameter && (e.parameter.talent || e.parameter.name)) || '';
      let talent = null;
      try {
        talent = findTalentByKey(e && e.parameter && e.parameter.k);
      } catch (err) {
        console.warn('findTalentByKey error:', err);
      }
      tpl.prefillName = talent ? talent.name : talentParam;
      tpl.prefillKey = talent ? String(e.parameter.k) : '';
      let prefillRaw = '{}';
      try {
        if (talent || talentParam) {
          prefillRaw = getSurveyRawByName(talent ? talent.name : talentParam);
        }
      } catch (err) {
        console.warn('getSurveyRawByName error:', err);
      }
      tpl.prefillRaw = prefillRaw;
      return tpl.evaluate()
        .setTitle("GATE 事前課題 & ルーツシート")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    } catch (err) {
      console.error('doGet error:', err);
      return HtmlService.createHtmlOutputFromFile('talent_survey')
        .setTitle("GATE 事前課題 & ルーツシート")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }
  
  if (action === 'mission') {
    return handleMissionGet(e);
  }

  if (action === 'init_mission') {
    return ContentService
      .createTextOutput(JSON.stringify(initMissionSheets()))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'sales') {
    return getSalesData();
  }
  
  if (action === 'calendar') {
    return getCalendarData(e);
  }
  
  if (action === 'folder_files') {
    return getFolderFiles();
  }
  
  if (action === 'fix_validation') {
    return fixValidation();
  }
  
  if (action === 'news') {
    return getNewsData();
  }
  
  if (action === 'survey') {
    return getSurveyData();
  }
  
  if (action === 'talents') {
    return getTalentMaster();
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'GATE Audition API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// 入力規則を統一設定（B列: タレント名、C列: 案件種別、H列: ステータス）
// ============================================================
function fixValidation() {
  try {
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // ヘッダー行を正しい名称に復元（A列〜Q列）
    const correctHeaders = [
      'ID', 'タレント名', '案件種別', 'オーディション名', 'ジャンル', 
      '締切日', 'オーディション日', 'ステータス', '対応者', 'アクション', 
      '結果', '備考', '登録日', '更新日', '資料リンク', '結果発表', '公開日'
    ];
    sheet.getRange(1, 1, 1, correctHeaders.length).setValues([correctHeaders]);

    // B列（タレント名）の入力規則を設定
    const talentRange = sheet.getRange('B2:B199');
    talentRange.clearDataValidations();
    const talentRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['谷口彩菜', '寺崎ひな', '小久保宏紀', '島田和奏', '中塚智', '太田陽菜', '相馬寿樹'], true)
      .setAllowInvalid(true)
      .setHelpText('タレントを選択してください')
      .build();
    talentRange.setDataValidation(talentRule);
    
    // H列の既存의入力規則をすべてクリア
    const range = sheet.getRange('H2:H199');
    range.clearDataValidations();
    
    // 新しい入力規則を設定（カンバンと一致する6ステータス）
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['情報収集', '応募準備', '書類結果待ち', 'オーディション日調整中', '結果待ち', '完了'], true)
      .setAllowInvalid(false)
      .build();
    range.setDataValidation(rule);
    
    // C列（案件種別）の入力規則も統一
    const typeRange = sheet.getRange('C2:C199');
    typeRange.clearDataValidations();
    const typeRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['オーディション', 'オファー', 'レギュラー', 'イベント', '撮影', 'その他'], true)
      .setAllowInvalid(false)
      .build();
    typeRange.setDataValidation(typeRule);
    
    // ==========================================
    // 営業アタックシートの入力規則設定
    // ==========================================
    const salesSheet = ss.getSheetByName('営業アタック');
    if (salesSheet) {
      // C列（アプローチ先種別）
      const sTypeRange = salesSheet.getRange('C2:C199');
      sTypeRange.clearDataValidations();
      const sTypeRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['制作会社', '代理店', 'キャスティング会社', 'クライアント直', 'レーベル'], true)
        .setAllowInvalid(false)
        .build();
      sTypeRange.setDataValidation(sTypeRule);
      
      // G列（アプローチ方法）
      const sMethodRange = salesSheet.getRange('G2:G199');
      sMethodRange.clearDataValidations();
      const sMethodRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['メール', '対面', '電話', '会食', 'イベント', 'その他'], true)
        .setAllowInvalid(true)
        .build();
      sMethodRange.setDataValidation(sMethodRule);
      
      // J列（アタックステータス）
      const sStatusRange = salesSheet.getRange('J2:J199');
      sStatusRange.clearDataValidations();
      const sStatusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['未アプローチ', 'コンタクト中', '面談済', '案件検討中', 'WS講師依頼済', '受注・決定', '休眠'], true)
        .setAllowInvalid(false)
        .build();
      sStatusRange.setDataValidation(sStatusRule);
      
      // L列（確度/感触）
      const sRatingRange = salesSheet.getRange('L2:L199');
      sRatingRange.clearDataValidations();
      const sRatingRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['S', 'A', 'B', 'C', 'D'], true)
        .setAllowInvalid(false)
        .build();
      sRatingRange.setDataValidation(sRatingRule);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Validation rules updated for B2:B199, C2:C199, H2:H199 and sales_attack' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
    const calendars = getTalentCalendars();
    
    for (var talent in calendars) {
      try {
        var cal = CalendarApp.getCalendarById(calendars[talent]);
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

// ============================================================
// 何でもフォルダのファイル一覧取得
// ============================================================
function getFolderFiles() {
  try {
    var folder = DriveApp.getFolderById(NANDEMO_FOLDER_ID);
    var files = folder.getFiles();
    var result = [];
    while (files.hasNext()) {
      var f = files.next();
      result.push({
        id: f.getId(),
        name: f.getName(),
        url: f.getUrl(),
        mimeType: f.getMimeType(),
        size: f.getSize(),
        modifiedDate: f.getLastUpdated().toISOString()
      });
    }
    // 更新日降順でソート
    result.sort(function(a, b) { return b.modifiedDate.localeCompare(a.modifiedDate); });
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, files: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: e.message }))
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
      for (let j = 2; j <= 13; j++) {
        const raw = data[i][j];
        let val = 0;
        if (typeof raw === 'number') {
          val = raw;
        } else if (raw) {
          val = parseFloat(String(raw).replace(/[¥,]/g, '')) || 0;
        }
        monthly.push(val);
      }
      
      const totalRaw = data[i][14];
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

// ============================================================
// ステータス列のドロップダウンを最新定義に更新する（手動実行用）
// GASエディタ上でこの関数を選択して「実行」ボタンを押すだけ！
// ============================================================
function updateStatusValidation() {
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  // ステータスの最新定義（8列目 = H列）
  const STATUS_VALUES = [
    '情報収集',
    '応募準備',
    '書類結果待ち',   // ← 旧「書類送付済」から変更
    'AD提出前',
    'AD提出済',
    'オーディション済',
    '結果待ち',
    '完了'
  ];
  
  // H列（ステータス列）のデータバリデーションを更新
  const statusRange = sheet.getRange(2, 8, lastRow - 1, 1); // H2:H最終行
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_VALUES, true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
  
  // 既存行の「書類送付済」を「書類結果待ち」に一括置換
  const values = statusRange.getValues();
  let updatedCount = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === '書類送付済') {
      values[i][0] = '書類結果待ち';
      updatedCount++;
    }
  }
  if (updatedCount > 0) {
    statusRange.setValues(values);
  }
  
  Logger.log(`✅ ドロップダウン更新完了！「書類送付済」→「書類結果待ち」に ${updatedCount} 件変更しました。`);
  SpreadsheetApp.getActive()?.toast(`ステータス項目を更新しました（${updatedCount}件変換）`, '✅ 完了', 5);
}

// ============================================================
// タレントニュース自動収集処理
// ============================================================
function collectNews() {
  const talents = ['谷口彩菜', '寺崎ひな', '小久保宏紀', '島田和奏', '中塚智', '太田陽菜'];
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  
  // 「ニュース」シートがなければ作成
  let sheet = ss.getSheetByName('ニュース');
  if (!sheet) {
    sheet = ss.insertSheet('ニュース');
    sheet.appendRow(['日付', 'タレント名', 'タイトル', 'リンク', 'メディア名']);
    // 見出し行を固定・ボールドに
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  talents.forEach(talent => {
    // Google ニュース RSS (日本語、日本地域向けにエンコード)
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(talent)}&hl=ja&gl=JP&ceid=JP:ja`;
    try {
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (response.getResponseCode() !== 200) {
        Logger.log(`Failed to fetch RSS for ${talent}: ${response.getResponseCode()}`);
        return;
      }
      
      const xml = response.getContentText();
      const document = XmlService.parse(xml);
      const root = document.getRootElement();
      const channel = root.getChild('channel');
      if (!channel) return;
      const items = channel.getChildren('item');
      
      // 既存のリンク一覧を取得して重複判定に使用
      const lastRow = sheet.getLastRow();
      let existingLinks = [];
      if (lastRow > 1) {
        existingLinks = sheet.getRange(2, 4, lastRow - 1, 1).getValues().map(row => row[0]);
      }
      
      // 直近5件を処理
      items.slice(0, 5).forEach(item => {
        const title = item.getChildText('title') || '';
        const link = item.getChildText('link') || '';
        const pubDateText = item.getChildText('pubDate') || '';
        const source = item.getChild('source') ? item.getChild('source').getText() : 'Google News';
        
        // リンクがすでに登録されていなければ挿入
        if (!existingLinks.includes(link) && link !== '') {
          // pubDateのパース（簡易変換）
          let dateStr = '';
          try {
            const parsedDate = new Date(pubDateText);
            dateStr = Utilities.formatDate(parsedDate, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
          } catch(e) {
            dateStr = pubDateText;
          }
          
          sheet.appendRow([
            dateStr,
            talent,
            title,
            link,
            source
          ]);
        }
      });
      
      // 件数制限（タレントごとに最新30件を残して古いものを削除）
      cleanOldNews(sheet, talent, 30);
      
    } catch (error) {
      Logger.log(`Error processing news for ${talent}: ${error.message}`);
    }
  });
}

// 特定のタレントの古いニュースをクリーンアップする関数
function cleanOldNews(sheet, talentName, maxCount) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;
  
  const data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  
  // 行インデックスとデータをタレントで絞り込み（1-indexedなので行番号は index + 2）
  const talentRows = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === talentName) {
      // 日付のパースに失敗した場合も安全に処理
      let parsedDate;
      try {
        parsedDate = new Date(data[i][0]);
        if (isNaN(parsedDate.getTime())) parsedDate = new Date(0);
      } catch(e) {
        parsedDate = new Date(0);
      }
      talentRows.push({
        rowIndex: i + 2,
        date: parsedDate
      });
    }
  }
  
  // 日付の降順でソート（新しい順）
  talentRows.sort((a, b) => b.date - a.date);
  
  // 制限数を超えた行を削除（下から削除していく必要があるため、行番号を降順ソートして削除）
  if (talentRows.length > maxCount) {
    const rowsToDelete = talentRows.slice(maxCount).map(r => r.rowIndex);
    rowsToDelete.sort((a, b) => b - a); // 行番号の大きい順
    
    rowsToDelete.forEach(rowIdx => {
      sheet.deleteRow(rowIdx);
    });
  }
}

// ニュースデータをJSONで返す関数
function getNewsData() {
  try {
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    const sheet = ss.getSheetByName('ニュース');
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const values = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
    const result = values.map(row => {
      let dateStr = '';
      if (row[0] instanceof Date) {
        dateStr = Utilities.formatDate(row[0], 'Asia/Tokyo', 'yyyy/MM/dd HH:mm');
      } else {
        dateStr = String(row[0]);
      }
      return {
        '日付': dateStr,
        'タレント名': String(row[1]),
        'タイトル': String(row[2]),
        'リンク': String(row[3]),
        'メディア名': String(row[4])
      };
    });
    
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
// 名刺画像自動解析登録処理（Gemini API連携）
// ============================================================
const CARD_FOLDER_ID = '1060pKd3DHS_ABFo7tWswHd2OHeORmsB-'; // 名刺アップロード監視用
const PROCESSED_FOLDER_ID = '187xi-fCYiWjWH9MZsa-6S4F-f4EzRlYr'; // 名刺処理済み用

function processBusinessCards() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) {
    Logger.log('GEMINI_API_KEY が設定されていません。処理をスキップします。');
    return;
  }
  
  const folder = DriveApp.getFolderById(CARD_FOLDER_ID);
  const processedFolder = DriveApp.getFolderById(PROCESSED_FOLDER_ID);
  const files = folder.getFiles();
  
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  const sheet = ss.getSheetByName('営業アタック');
  if (!sheet) {
    Logger.log('「営業アタック」シートが見つかりません。');
    return;
  }
  
  let processedCount = 0;
  
  while (files.hasNext()) {
    const file = files.next();
    const mimeType = file.getMimeType();
    
    // 画像ファイルのみ処理
    if (!mimeType.startsWith('image/')) {
      continue;
    }
    
    try {
      Logger.log(`名刺解析開始: ${file.getName()}`);
      
      // 画像をBase64に変換
      const blob = file.getBlob();
      const bytes = blob.getBytes();
      const base64Image = Utilities.base64Encode(bytes);
      
      // Gemini APIで解析
      const cardInfo = callGeminiVision(base64Image, mimeType);
      Logger.log(`解析結果: ${JSON.stringify(cardInfo)}`);
      
      // スプレッドシートの次のID取得
      const lastRow = sheet.getLastRow();
      const nextId = lastRow > 1 ? Number(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
      
      const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd');
      
      // ファイルを一般公開してURL取得（ダッシュボードで閲覧可能にするため）
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const fileUrl = file.getUrl();
      
      const roleNotes = cardInfo.position ? `【役職】${cardInfo.position}\n` : '';
      
      // 営業アタックシートに登録
      sheet.appendRow([
        nextId,
        cardInfo.companyName || '',                    // B: 社名
        cardInfo.companyType || 'クライアント直',       // C: アプローチ先種別
        cardInfo.contactName || '',                    // D: 担当者名
        cardInfo.contactInfo || '',                    // E: 連絡先
        '',                                            // F: 最終アプローチ日（新規なので空欄）
        '',                                            // G: アプローチ方法
        '',                                            // H: 次回アクション予定日
        '',                                            // I: 次回アクション内容
        '未アプローチ',                                 // J: アタックステータス
        '',                                            // K: 提案タレント
        '',                                            // L: 確度/感触
        `${roleNotes}名刺画像から自動解析登録。\n画像URL: ${fileUrl}`, // M: 備考/メモ
        today,                                         // N: 登録日
        today                                          // O: 更新日
      ]);
      
      // 処理完了したファイルを処理済みフォルダへ移動
      file.moveTo(processedFolder);
      Logger.log(`名刺処理完了。処理済みフォルダへ移動しました: ${file.getName()}`);
      processedCount++;
      
    } catch (err) {
      Logger.log(`エラー発生 (${file.getName()}): ${err.message}`);
    }
  }
  
  Logger.log(`処理完了した名刺枚数: ${processedCount}枚`);
}

function callGeminiVision(base64Image, mimeType) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          {
            text: "これはビジネスカード（名刺）の画像です。画像から以下の情報を正確に抽出し、指定したJSONフォーマットで回答してください。JSON以外のテキストは一切出力しないでください。\n\n" +
                  "【抽出する項目】\n" +
                  "1. companyName (会社名・企業名)\n" +
                  "2. companyType (会社の種類。アプローチ先種別として、文脈から判断して次の4つのうちどれが最も適しているかを選んでください: '制作会社', '代理店', 'キャスティング会社', 'クライアント直')\n" +
                  "3. contactName (氏名・担当者名)\n" +
                  "4. contactInfo (連絡先。メールアドレスと電話番号をカンマ区切りで併記してください。見つからない場合は空欄。例: 'hoge@example.com, 090-1234-5678')\n" +
                  "5. position (役職名。例: 'プロデューサー', '開発部長' など。見つからない場合は空欄)\n\n" +
                  "【出力JSONフォーマット】\n" +
                  "{\n" +
                  "  \"companyName\": \"会社名\",\n" +
                  "  \"companyType\": \"アプローチ先種別\",\n" +
                  "  \"contactName\": \"担当者名\",\n" +
                  "  \"contactInfo\": \"連絡先\",\n" +
                  "  \"position\": \"役職\"\n" +
                  "}"
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          }
        ]
      }
    ]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const responseText = response.getContentText();
  
  if (response.getResponseCode() !== 200) {
    throw new Error('Gemini API Error: ' + responseText);
  }
  
  const result = JSON.parse(responseText);
  let jsonText = result.candidates[0].content.parts[0].text;
  jsonText = jsonText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  return JSON.parse(jsonText);
}

// ============================================================
// タレントアンケート回答データ取得
// ============================================================
function getSurveyData() {
  try {
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    const sheet = ss.getSheetByName('talent_survey');
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const values = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
    const map = {};
    values.forEach(row => {
      let dateStr = '';
      if (row[2] instanceof Date) {
        dateStr = Utilities.formatDate(row[2], 'Asia/Tokyo', 'yyyy/MM/dd');
      } else {
        dateStr = String(row[2]);
      }
      const rawName = String(row[1]);
      const canonicalName = normalizeTalentName(rawName);
      const item = {
        id: row[0],
        talentName: canonicalName,
        updateDate: dateStr,
        bibleMovie: String(row[3]),
        bibleDrama: String(row[4]),
        recentTitle: String(row[5]),
        targetActor: String(row[6]),
        desiredRoles: String(row[7]),
        loves: String(row[8]),
        rawData: String(row[9])
      };
      // 同一タレントは最新（IDが大きい方）で上書き
      if (!map[canonicalName] || Number(item.id) > Number(map[canonicalName].id)) {
        map[canonicalName] = item;
      }
    });
    
    const result = Object.values(map);
    
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
// カレンダー操作ユーティリティ（不足分の追加）
// ============================================================

/**
 * カレンダーにイベントを作成
 */
function createCalendarEvent(calendarId, summary, startTime, endTime, description) {
  try {
    const cal = CalendarApp.getCalendarById(calendarId);
    if (!cal) return { success: false, error: 'カレンダーが見つかりません: ' + calendarId };
    
    const event = cal.createEvent(summary, new Date(startTime), new Date(endTime), {
      description: description
    });
    return { success: true, eventId: event.getId() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * カレンダーに終日イベントを作成
 */
function createAllDayEvent(calendarId, summary, date) {
  try {
    const cal = CalendarApp.getCalendarById(calendarId);
    if (!cal) return { success: false, error: 'カレンダーが見つかりません: ' + calendarId };
    
    const parts = String(date).split(/[\/\-]/);
    let d;
    if (parts.length === 3) {
      d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 9, 0, 0);
    } else {
      d = new Date(date);
      d.setHours(9, 0, 0, 0);
    }
    
    const event = cal.createAllDayEvent(summary, d);
    return { success: true, eventId: event.getId() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * カレンダーの特定のタイトルを含むイベントを一括削除
 */
function deleteCalendarEvents(calendarId, titlePart) {
  try {
    const cal = CalendarApp.getCalendarById(calendarId);
    if (!cal) return { success: false, error: 'カレンダーが見つかりません: ' + calendarId };
    
    // 2026/07/01 ～ 2026/12/31 の範囲のイベントを取得して削除（ひかりと大地は7月〜10月撮影）
    const start = new Date("2026-07-01T00:00:00");
    const end = new Date("2026-12-31T23:59:59");
    const events = cal.getEvents(start, end);
    let deletedCount = 0;
    events.forEach(ev => {
      if (ev.getTitle().indexOf(titlePart) !== -1) {
        ev.deleteEvent();
        deletedCount++;
      }
    });
    return { success: true, deletedCount: deletedCount };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * カレンダーの空き時間（予定あり時間）を取得
 */
function getCalendarFreeBusy(calendarId, start, end) {
  try {
    const cal = CalendarApp.getCalendarById(calendarId);
    if (!cal) return { success: false, error: 'カレンダーが見つかりません: ' + calendarId };
    
    const events = cal.getEvents(new Date(start), new Date(end));
    const busy = events.map(ev => {
      return {
        start: ev.getStartTime().toISOString(),
        end: ev.getEndTime().toISOString()
      };
    });
    return { success: true, busy: busy };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ============================================================
// タレントマスタ取得・自動生成
// ============================================================
function getTalentMasterInternal() {
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  let sheet = ss.getSheetByName('talents');
  if (!sheet) {
    sheet = ss.insertSheet('talents');
    sheet.appendRow(['名前', '色', 'アイコン', 'カレンダーID', '在籍']);
    const initialTalents = [
      ['谷口彩菜', '#FFECEF', '🌸', 'ayana.taniguchi@gate-agency.com', '在籍'],
      ['寺崎ひな', '#FFFBEA', '⭐', 'hina.terasaki@gate-agency.com', '在籍'],
      ['小久保宏紀', '#EBF5FF', '🎭', 'hiroki.kokubo@gate-agency.com', '在籍'],
      ['島田和奏', '#EDFBEF', '🌟', 'wakana.shimada@gate-agency.com', '在籍'],
      ['中塚智', '#F5F3FF', '🎬', 'satoshi.nakatsuka@gate-agency.com', '在籍'],
      ['太田陽菜', '#FFF8E1', '🌻', 'hina.ota@gate-agency.com', '在籍'],
      ['相馬寿樹', '#F3F4F6', '👤', 'toshiki.soma@gate-agency.com', '在籍']
    ];
    initialTalents.forEach(function(row) {
      sheet.appendRow(row);
    });
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet.getDataRange().getValues();
}

function getTalentMaster() {
  try {
    const values = getTalentMasterInternal();
    const list = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const name = String(row[0] || '').trim();
      if (!name) continue;
      
      const status = String(row[4] || '在籍').trim();
      if (status !== '在籍') continue;
      
      list.push({
        name: name,
        color: String(row[1] || '#888').trim(),
        icon: String(row[2] || '👤').trim()
      });
    }
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, talents: list }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
/** タレント名の表記ゆれを正規化 */
function normalizeTalentName(name) {
  if (!name) return '';
  const s = String(name).trim();
  const map = {
    '小久保': '小久保宏紀',
    '島田': '島田和奏',
    '谷口': '谷口彩菜',
    '太田': '太田陽菜',
    '寺崎': '寺崎ひな',
    '中塚': '中塚智',
    '相馬': '相馬寿樹'
  };
  return map[s] || s;
}

/** マスタの6列目「フォームキー」が空の行にランダムキーを発行する。手動で1回実行 or タレント追加時に再実行 */
function generateSurveyKeys() {
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  const sheet = ss.getSheetByName('talents');
  if (!sheet) return;
  // ヘッダーに「フォームキー」が無ければ追加
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let keyCol = headers.indexOf('フォームキー') + 1;
  if (keyCol === 0) {
    keyCol = headers.length + 1;
    sheet.getRange(1, keyCol).setValue('フォームキー').setFontWeight('bold');
  }
  const lastRow = sheet.getLastRow();
  let webAppUrl = '';
  try {
    webAppUrl = ScriptApp.getService().getUrl();
  } catch(e) {}
  if (!webAppUrl) {
    webAppUrl = 'https://script.google.com/macros/s/AKfycbwkG3VmSjPZ07xmapteejCGlvgjIB5oQuTfdgqXCk2X4ffsXPci4PpZwNGdNC3AK_ZGEw/exec';
  }
  const lines = [];
  for (let r = 2; r <= lastRow; r++) {
    const name = sheet.getRange(r, 1).getValue();
    if (!name) continue;
    let key = sheet.getRange(r, keyCol).getValue();
    if (!key) {
      key = Utilities.getUuid().replace(/-/g, '').substring(0, 16);
      sheet.getRange(r, keyCol).setValue(key);
    }
    lines.push(name + ': ' + webAppUrl + '?k=' + key);
  }
  Logger.log('=== 個人URL一覧（各タレントにLINEで送付） ===\n' + lines.join('\n'));
}

/** キーからタレント行を引く。見つからなければ null */
function findTalentByKey(key) {
  if (!key) return null;
  const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
  const sheet = ss.getSheetByName('talents');
  if (!sheet) return null;
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return null;
  
  const headers = values[0].map(function(h) { return String(h).trim(); });
  const nameCol = headers.indexOf('名前');
  
  const keyCols = [];
  for (let c = 0; c < headers.length; c++) {
    if (headers[c].indexOf('フォームキー') !== -1) {
      keyCols.push(c);
    }
  }
  if (keyCols.length === 0) return null;
  
  const targetKey = String(key).trim();
  for (let i = 1; i < values.length; i++) {
    const rowName = values[i][nameCol];
    for (let k = 0; k < keyCols.length; k++) {
      const colIdx = keyCols[k];
      const val = String(values[i][colIdx] || '').trim();
      if (val === targetKey && rowName) {
        return { name: String(rowName).trim() };
      }
    }
  }
  return null;
}


/** タレント名から送信済みサーベイのRAWデータ(JSON文字列)を返す。無ければ空オブジェクト文字列 */
function getSurveyRawByName(name) {
  try {
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    const sheet = ss.getSheetByName('talent_survey');
    if (!sheet || sheet.getLastRow() < 2) return '{}';
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map(String);
    const nameCol = headers.indexOf('タレント名');
    const rawCol = headers.indexOf('RAWデータ');
    if (nameCol === -1 || rawCol === -1) return '{}';
    for (let i = values.length - 1; i >= 1; i--) { // 後ろから＝最新
      if (String(values[i][nameCol]) === String(name)) {
        return String(values[i][rawCol] || '{}');
      }
    }
  } catch (e) {
    console.warn('getSurveyRawByName catch:', e);
  }
  return '{}';
}

// ============================================================
// HtmlServiceからの直接呼び出し用（CORS回避のため google.script.run を使用）
// ============================================================
function submitSurveyDataFromHtml(payloadStr) {
  try {
    const e = { postData: { contents: payloadStr } };
    const response = doPost(e);
    return JSON.parse(response.getContent());
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ============================================================
// ミッション管理系関数 (Phase 1 & Phase 2)
// ============================================================

/**
 * 直近の月曜日の日付文字列 (YYYY-MM-DD) を取得
 */
function getMondayDateString(dateObj) {
  const d = dateObj ? new Date(dateObj) : new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 月曜日を起点
  const monday = new Date(d.setDate(diff));
  return Utilities.formatDate(monday, 'Asia/Tokyo', 'yyyy-MM-dd');
}

/**
 * GET ?mode=mission&week=YYYY-MM-DD
 */
function handleMissionGet(e) {
  try {
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    
    // シートが存在しない場合は初期化
    if (!ss.getSheetByName('社員マスタ') || !ss.getSheetByName('ミッション') || !ss.getSheetByName('週次実績')) {
      initMissionSheets();
    }
    
    const empSheet = ss.getSheetByName('社員マスタ');
    const msnSheet = ss.getSheetByName('ミッション');
    const actSheet = ss.getSheetByName('週次実績');

    let week = (e && e.parameter && e.parameter.week) || '';
    if (!week) {
      week = getMondayDateString();
    }

    // 1. 週次実績のマップ作成 (key: `${week}_${missionId}` -> { actual, comment })
    const actualMap = {};
    if (actSheet && actSheet.getLastRow() > 1) {
      const actValues = actSheet.getDataRange().getValues();
      for (let i = 1; i < actValues.length; i++) {
        const rawWk = actValues[i][0];
        let wkStr = '';
        if (rawWk instanceof Date) {
          wkStr = Utilities.formatDate(rawWk, 'Asia/Tokyo', 'yyyy-MM-dd');
        } else {
          wkStr = String(rawWk).trim().replace(/\//g, '-');
        }
        const mId = String(actValues[i][1]).trim();
        const actVal = Number(actValues[i][2]) || 0;
        const comm = String(actValues[i][3] || '');
        
        actualMap[`${wkStr}_${mId}`] = {
          actual: actVal,
          comment: comm
        };
      }
    }

    // 2. ミッションの社員別マップ作成 (key: empId -> [missions])
    const missionMap = {};
    if (msnSheet && msnSheet.getLastRow() > 1) {
      const msnValues = msnSheet.getDataRange().getValues();
      for (let i = 1; i < msnValues.length; i++) {
        const mId = String(msnValues[i][0]).trim();
        const empId = String(msnValues[i][1]).trim();
        const cat = String(msnValues[i][2] || 'MANAGEMENT').trim();
        const title = String(msnValues[i][3] || '').trim();
        const type = String(msnValues[i][4] || 'unset').trim();
        const target = msnValues[i][5] !== '' ? Number(msnValues[i][5]) : null;
        const unit = String(msnValues[i][6] || '').trim();
        
        let dueStr = null;
        if (msnValues[i][7] instanceof Date) {
          dueStr = Utilities.formatDate(msnValues[i][7], 'Asia/Tokyo', 'yyyy-MM-dd');
        } else if (msnValues[i][7]) {
          dueStr = String(msnValues[i][7]).trim();
        }
        
        const note = String(msnValues[i][8] || '').trim();
        const isConfirmed = Boolean(msnValues[i][10]);

        if (!missionMap[empId]) missionMap[empId] = [];

        const actInfo = actualMap[`${week}_${mId}`] || { actual: 0, comment: '' };

        missionMap[empId].push({
          id: mId,
          category: cat,
          title: title,
          type: type,
          target: target,
          unit: unit,
          due: dueStr,
          note: note,
          confirmed: isConfirmed,
          actual: actInfo.actual,
          comment: actInfo.comment
        });
      }
    }

    // 3. 社員マスタからレスポンス作成
    const employees = [];
    if (empSheet && empSheet.getLastRow() > 1) {
      const empValues = empSheet.getDataRange().getValues();
      for (let i = 1; i < empValues.length; i++) {
        const empId = String(empValues[i][0]).trim();
        const name = String(empValues[i][1]).trim();
        const dept = String(empValues[i][2] || '第3部').trim();
        const role = String(empValues[i][3] || '').trim();
        const talentStr = String(empValues[i][5] || '').trim();
        const isActive = empValues[i][6] === true || String(empValues[i][6]).toUpperCase() === 'TRUE';

        if (!isActive && empValues[i][6] !== '') continue;

        const talents = talentStr ? talentStr.split(',').map(s => s.trim()) : [];
        const missions = missionMap[empId] || [];

        employees.push({
          id: empId,
          name: name,
          dept: dept,
          role: role,
          talents: talents,
          missions: missions
        });
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        week: week,
        employees: employees
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('handleMissionGet error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * POST mode=mission_progress
 */
function handleMissionProgress(data) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    let actSheet = ss.getSheetByName('週次実績');
    if (!actSheet) {
      actSheet = ss.insertSheet('週次実績');
      actSheet.appendRow(['週', 'ミッションID', '実績値', 'コメント', '更新者', '更新日時']);
      actSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      actSheet.setFrozenRows(1);
    }

    let week = data.week || '';
    if (!week) week = getMondayDateString();
    week = week.replace(/\//g, '-');

    const missionId = String(data.missionId || '').trim();
    const actual = Number(data.actual) || 0;
    const comment = String(data.comment || '').trim();
    const employeeId = String(data.employeeId || '').trim();
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

    const lastRow = actSheet.getLastRow();
    let foundRow = -1;

    if (lastRow > 1) {
      const values = actSheet.getRange(2, 1, lastRow - 1, 2).getValues();
      for (let i = 0; i < values.length; i++) {
        let rWk = values[i][0];
        let rWkStr = (rWk instanceof Date) ? Utilities.formatDate(rWk, 'Asia/Tokyo', 'yyyy-MM-dd') : String(rWk).trim().replace(/\//g, '-');
        let rMId = String(values[i][1]).trim();
        if (rWkStr === week && rMId === missionId) {
          foundRow = i + 2;
          break;
        }
      }
    }

    if (foundRow > 0) {
      actSheet.getRange(foundRow, 3).setValue(actual);
      if (comment) actSheet.getRange(foundRow, 4).setValue(comment);
      if (employeeId) actSheet.getRange(foundRow, 5).setValue(employeeId);
      actSheet.getRange(foundRow, 6).setValue(nowStr);
    } else {
      actSheet.appendRow([week, missionId, actual, comment, employeeId, nowStr]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, missionId: missionId, week: week, actual: actual }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('handleMissionProgress error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * POST mode=mission_target
 */
function handleMissionTarget(data) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    const msnSheet = ss.getSheetByName('ミッション');
    if (!msnSheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'ミッション sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const missionId = String(data.missionId || '').trim();
    const target = data.target !== undefined && data.target !== '' ? Number(data.target) : null;
    const unit = String(data.unit || '').trim();
    const due = data.due ? String(data.due).trim() : '';
    const newType = data.type || (unit.includes('/週') ? 'weekly' : 'target');

    const lastRow = msnSheet.getLastRow();
    let foundRow = -1;

    if (lastRow > 1) {
      const values = msnSheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (let i = 0; i < values.length; i++) {
        if (String(values[i][0]).trim() === missionId) {
          foundRow = i + 2;
          break;
        }
      }
    }

    if (foundRow > 0) {
      if (newType) msnSheet.getRange(foundRow, 5).setValue(newType); // E列: 種別
      if (target !== null) msnSheet.getRange(foundRow, 6).setValue(target); // F列: 目標値
      if (unit) msnSheet.getRange(foundRow, 7).setValue(unit); // G列: 単位
      if (due) msnSheet.getRange(foundRow, 8).setValue(due); // H列: 期日
      msnSheet.getRange(foundRow, 11).setValue(true); // K列: 確定

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, missionId: missionId, target: target, unit: unit, due: due }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Mission ID not found: ' + missionId }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    console.error('handleMissionTarget error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * 初期化・データ整合性修復（Phase 0 & Phase 1）
 */
function initMissionSheets() {
  try {
    const ss = (SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID));
    
    // 1. 社員マスタ
    let empSheet = ss.getSheetByName('社員マスタ');
    if (!empSheet) {
      empSheet = ss.insertSheet('社員マスタ');
    }
    empSheet.clear();
    const empHeaders = ['社員ID', '氏名', '部', '役職', '上長社員ID', '担当タレント', '在籍'];
    const empData = [
      ['EMP-003', '十河', '第3部', '部長', 'EMP-001', '中島健太,相馬寿樹', true],
      ['EMP-004', '内田', '第3部', 'チーフ', 'EMP-003', '友田オレ,中塚智,島田和奏,谷口彩菜,寺崎ひな', true],
      ['EMP-005', '佐藤', '第3部', '現場M', 'EMP-003', 'リンドバーグ,イクラボブチャンチャン,めっちゃ最高ズ,深海魚,リバーサイドマエストロ,YAGATE,友田オレ,シャワーカーテニスト,チェット,一向聴', true]
    ];
    empSheet.getRange(1, 1, 1, empHeaders.length).setValues([empHeaders]).setFontWeight('bold');
    empSheet.getRange(2, 1, empData.length, empHeaders.length).setValues(empData);
    empSheet.setFrozenRows(1);

    // 2. ミッション
    let msnSheet = ss.getSheetByName('ミッション');
    if (!msnSheet) {
      msnSheet = ss.insertSheet('ミッション');
    }
    msnSheet.clear();
    const msnHeaders = ['ミッションID', '社員ID', 'カテゴリ', '内容', '種別', '目標値', '単位', '期日', '備考', '出典', '確定'];
    const msnData = [
      // 十河
      ['MSN-001', 'EMP-003', 'MANAGEMENT', '部長定例で全項目の進捗・数値を報告', 'weekly', 1, '回/週', '', '', '2026-08-26 個別ミッションシート', true],
      ['MSN-002', 'EMP-003', 'MANAGEMENT', '内田・佐藤のカレンダーを確認し空き時間を営業・企画で埋める', 'weekly', 5, '回/週', '', '平日毎日', '2026-08-26 個別ミッションシート', true],
      ['MSN-003', 'EMP-003', 'SALES', '制作会社への営業', 'weekly', 3, '回/週', '', 'ショートドラマ営業は停止。ドラマ・映画のキャスティング営業へ完全シフト', '2026-08-26 個別ミッションシート', true],
      ['MSN-004', 'EMP-003', 'SUPPORT', '森ひかる スポンサー会議（福永と）', 'weekly', 1, '回/週', '', '', '2026-08-26 個別ミッションシート', true],
      ['MSN-005', 'EMP-003', 'SUPPORT', '井上とのAI活用会議', 'weekly', 1, '回/週', '', '業務改善・AI活用の協議', '2026-08-26 個別ミッションシート', true],
      ['MSN-006', 'EMP-003', 'MANAGEMENT', '内田・佐藤との個別MTG／3人MTG', 'unset', '', '', '', '週あたり何回か未設定', '2026-08-26 個別ミッションシート', false],
      ['MSN-007', 'EMP-003', 'SALES', '若手俳優5名の売り込み営業（内田と前線で）', 'unset', '', '', '', '友田オレ・中塚智・島田和奏・谷口彩菜・寺崎ひな。月何社か未設定', '2026-08-26 個別ミッションシート', false],
      ['MSN-008', 'EMP-003', 'SALES', '丸一との定例会議・グッズ制作の推進', 'unset', '', '', '', '定例頻度が未設定', '2026-08-26 個別ミッションシート', false],
      ['MSN-009', 'EMP-003', 'SALES', '中島健太・相馬寿樹の案件で売上構築', 'unset', '', '', '', '金額が未設定', '2026-08-26 個別ミッションシート', false],
      ['MSN-010', 'EMP-003', 'PROJECT', 'YAGATE以外の事務所主催ライブを立ち上げ・定期開催', 'unset', '', '', '', '初回日と開催間隔が未設定', '2026-08-26 個別ミッションシート', false],
      ['MSN-011', 'EMP-003', 'PROJECT', '若手芸人中心のPodcast番組を立ち上げ', 'unset', '', '', '', '年内本数が未設定', '2026-08-26 個別ミッションシート', false],
      ['MSN-012', 'EMP-003', 'PROJECT', 'YAGATEのSNS発信強化による収益化', 'unset', '', '', '', '投稿数・売上目標が未設定', '2026-08-26 個別ミッションシート', false],
      
      // 内田（仮）
      ['MSN-013', 'EMP-004', 'SALES', '担当5名の売り込み営業（十河と同行）', 'weekly', 3, '回/週', '', '仮', '2026-08-26 個別ミッションシート', true],
      ['MSN-014', 'EMP-004', 'MANAGEMENT', '翌週スケジュールを十河へ共有', 'weekly', 1, '回/週', '', '仮', '2026-08-26 個別ミッションシート', true],
      ['MSN-015', 'EMP-004', 'SALES', '担当タレントの営業資料（プロフィール・素材）更新', 'unset', '', '', '', '仮', '2026-08-26 個別ミッションシート', false],
      ['MSN-016', 'EMP-004', 'SALES', '丸一とのグッズ制作やり取り', 'unset', '', '', '', '仮', '2026-08-26 個別ミッションシート', false],

      // 佐藤（仮）
      ['MSN-017', 'EMP-005', 'PROJECT', 'YAGATE公式SNSの発信', 'weekly', 5, '回/週', '', '仮', '2026-08-26 個別ミッションシート', true],
      ['MSN-018', 'EMP-005', 'MANAGEMENT', '翌週スケジュールを十河へ共有', 'weekly', 1, '回/週', '', '仮', '2026-08-26 個別ミッションシート', true],
      ['MSN-019', 'EMP-005', 'PROJECT', '新規主催ライブの出演者ブッキング', 'unset', '', '', '', '仮', '2026-08-26 個別ミッションシート', false],
      ['MSN-020', 'EMP-005', 'PROJECT', 'Podcast収録の運営', 'unset', '', '', '', '仮', '2026-08-26 個別ミッションシート', false]
    ];
    msnSheet.getRange(1, 1, 1, msnHeaders.length).setValues([msnHeaders]).setFontWeight('bold');
    msnSheet.getRange(2, 1, msnData.length, msnHeaders.length).setValues(msnData);
    msnSheet.setFrozenRows(1);

    // 3. 週次実績
    let actSheet = ss.getSheetByName('週次実績');
    if (!actSheet) {
      actSheet = ss.insertSheet('週次実績');
      actSheet.appendRow(['週', 'ミッションID', '実績値', 'コメント', '更新者', '更新日時']);
      actSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      actSheet.setFrozenRows(1);
    }

    // 4. talents シートの更新（新体制対応・吉富千桜の除外・担当社員ID追加）
    let talSheet = ss.getSheetByName('talents');
    if (talSheet) {
      const talValues = talSheet.getDataRange().getValues();
      const headers = talValues[0].map(String);
      let empIdCol = headers.indexOf('担当社員ID');
      if (empIdCol === -1) {
        talSheet.getRange(1, headers.length + 1).setValue('担当社員ID').setFontWeight('bold');
      }
    }

    return { success: true, message: 'Mission sheets initialized successfully' };

  } catch (err) {
    console.error('initMissionSheets error:', err);
    return { success: false, error: err.message };
  }
}

