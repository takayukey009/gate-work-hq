/**
 * スプレッドシートの入力規則を一括設定するスクリプト
 * 実行方法: GASエディタで setupAllValidation を選んで ▶ 実行
 */
function setupAllValidation() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');
  const lastRow = 200; // 対応する行数
  
  // ===== B列: タレント名（プルダウン） =====
  const talentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['谷口彩菜', '寺崎ひな', '小久保宏紀', '島田和奏', '中塚智', '太田陽菜', '吉富千桜'], true)
    .setAllowInvalid(true)
    .setHelpText('タレントを選択してください')
    .build();
  sheet.getRange('B2:B' + lastRow).setDataValidation(talentRule);
  
  // ===== C列: 案件種別（プルダウン） =====
  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['オーディション', 'オファー', 'レギュラー', 'イベント', '撮影', 'その他'], true)
    .setAllowInvalid(true)
    .setHelpText('案件の種別を選択してください')
    .build();
  sheet.getRange('C2:C' + lastRow).setDataValidation(typeRule);
  
  // ===== E列: ジャンル（プルダウン） =====
  const genreRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['映画', 'ドラマ', '舞台', 'CM', 'MV', 'Web', '広告', 'ショートドラマ', 'バラエティ'], true)
    .setAllowInvalid(true)
    .setHelpText('ジャンルを選択してください')
    .build();
  sheet.getRange('E2:E' + lastRow).setDataValidation(genreRule);
  
  // ===== F列: 締切日（日付） =====
  const dateRule = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(true)
    .setHelpText('日付を選択してください（yyyy/mm/dd）')
    .build();
  sheet.getRange('F2:F' + lastRow).setDataValidation(dateRule);
  sheet.getRange('F2:F' + lastRow).setNumberFormat('yyyy/mm/dd');
  
  // ===== G列: オーディション日（日付） =====
  sheet.getRange('G2:G' + lastRow).setDataValidation(dateRule);
  sheet.getRange('G2:G' + lastRow).setNumberFormat('yyyy/mm/dd');
  
  // ===== H列: ステータス（プルダウン） =====
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['情報収集', '応募準備', '書類送付済', 'AD提出前', 'AD提出済', 'オーディション済', '結果待ち', '完了'], true)
    .setAllowInvalid(true)
    .setHelpText('ステータスを選択してください')
    .build();
  sheet.getRange('H2:H' + lastRow).setDataValidation(statusRule);
  
  // ===== I列: 対応者（プルダウン） =====
  const ownerRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['マネージャー', '本人', '営業'], true)
    .setAllowInvalid(true)
    .setHelpText('対応者を選択してください')
    .build();
  sheet.getRange('I2:I' + lastRow).setDataValidation(ownerRule);
  
  // ===== K列: 結果（プルダウン） =====
  const resultRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['未定', '結果待ち', '合格', '不合格', '保留', '辞退'], true)
    .setAllowInvalid(true)
    .setHelpText('結果を選択してください')
    .build();
  sheet.getRange('K2:K' + lastRow).setDataValidation(resultRule);
  
  // ===== M列: 登録日（日付） =====
  sheet.getRange('M2:M' + lastRow).setDataValidation(dateRule);
  sheet.getRange('M2:M' + lastRow).setNumberFormat('yyyy/mm/dd');
  
  // ===== N列: 更新日（日付） =====
  sheet.getRange('N2:N' + lastRow).setDataValidation(dateRule);
  sheet.getRange('N2:N' + lastRow).setNumberFormat('yyyy/mm/dd');
  
  // ===== ヘッダー行のスタイル =====
  const headerRange = sheet.getRange('A1:O1');
  headerRange.setBackground('#1a1a1a');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');
  
  // ===== 列幅の調整 =====
  sheet.setColumnWidth(1, 40);   // A: ID
  sheet.setColumnWidth(2, 100);  // B: タレント名
  sheet.setColumnWidth(3, 120);  // C: 案件種別
  sheet.setColumnWidth(4, 250);  // D: オーディション名
  sheet.setColumnWidth(5, 100);  // E: ジャンル
  sheet.setColumnWidth(6, 100);  // F: 締切日
  sheet.setColumnWidth(7, 100);  // G: オーディション日
  sheet.setColumnWidth(8, 120);  // H: ステータス
  sheet.setColumnWidth(9, 100);  // I: 対応者
  sheet.setColumnWidth(10, 200); // J: アクション
  sheet.setColumnWidth(11, 80);  // K: 結果
  sheet.setColumnWidth(12, 200); // L: 備考
  sheet.setColumnWidth(13, 100); // M: 登録日
  sheet.setColumnWidth(14, 100); // N: 更新日
  sheet.setColumnWidth(15, 200); // O: 資料リンク
  
  // ===== 1行目を固定 =====
  sheet.setFrozenRows(1);
  
  // ===== 交互の背景色 =====
  const dataRange = sheet.getRange('A2:O' + lastRow);
  const banding = dataRange.getBandings();
  if (banding.length === 0) {
    dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  }
  
  SpreadsheetApp.getUi().alert('✅ 設定完了！\n\nプルダウン: タレント名、案件種別、ジャンル、ステータス、対応者、結果\nカレンダー: 締切日、オーディション日、登録日、更新日\nヘッダー: 黒背景に白文字\n列幅: 自動調整済み');
}
