// ===== GATE Audition Dashboard =====
const SHEET_ID = '1NBZce4Xqx7FgbXujQlaO15xd-nAZvUmAqBVGRBgIaGU';
const MANAGED_TALENTS = ['谷口彩菜','寺崎ひな','小久保宏紀','島田和奏','中塚智','太田陽菜','相馬寿樹'];
const TALENT_COLORS = {
  '谷口彩菜':'#E60012','寺崎ひな':'#3B82F6','小久保宏紀':'#8B5CF6',
  '島田和奏':'#F59E0B','中塚智':'#10B981','太田陽菜':'#EC4899','相馬寿樹':'#06B6D4'
};
const TALENT_ICONS = {
  '谷口彩菜':'🌸','寺崎ひな':'⭐','小久保宏紀':'🎭',
  '島田和奏':'🌟','中塚智':'🎬','太田陽菜':'🌻','相馬寿樹':'🕺'
};
const STATUS_ORDER = ['情報収集','応募準備','書類結果待ち','2次以降AD','結果待ち','受注','完了'];
const STATUS_MAP = {info:'情報収集',prep:'応募準備',sent:'書類結果待ち',done:'2次以降AD',wait:'結果待ち',order:'受注',complete:'完了'};
const GENRE_ICONS = {'映画':'🎬','ドラマ':'📺','舞台':'🎭','CM':'📢','MV':'🎵','Web':'🌐','広告':'📸','ショートドラマ':'📱','バラエティ':'🎪'};
const TYPE_ICONS = {'オーディション':'🎤','オファー':'📩','レギュラー':'📺','イベント':'🎪','撮影':'📸','その他':'📋','営業':'💼'};
const TYPE_COLORS = {'オーディション':'#e2000f','オファー':'#10B981','レギュラー':'#3B82F6','イベント':'#F59E0B','撮影':'#8B5CF6','その他':'#6B7280','営業':'#10B981'};

// ===== タレント宣材・提案用素材マスター =====
const TALENT_ASSETS = {
  '谷口彩菜': {
    name: '谷口彩菜',
    furigana: 'たにぐち あやな',
    age: 27,
    birthday: '1999/03/02',
    bornIn: '京都府',
    height: '162cm',
    skills: '激辛（蒙古タンメン中本 北極の10倍）',
    hobbies: 'お菓子作り、コスプレ、すみっコぐらしのグッズ集め、競技ポーカー',
    officialUrl: 'https://gateagency.jp/talent/ayanataniguchi/',
    profilePdf: 'https://drive.google.com/file/d/13-tbisLdqe1jVH_w9GS-FfcXbQlcRTv8/view?usp=drive_link',
    photosFolder: 'https://drive.google.com/drive/folders/1lUxAmoQNmoDv8vRCJdnbE52u-Xd-NhvJ?usp=sharing',
    reels: [
      { title: '「東京彼女」26年3月号', url: 'https://youtu.be/57XiYmhbS0E?si=se0oaeCICQ1-rwO4' },
      { title: '「パトロンデート」/ミリオン', url: 'https://youtube.com/shorts/vTVJeDFeMCc?si=uFAfmz8Ir9OJOWju' },
      { title: '「心恋」/テラードラマ', url: 'https://youtube.com/shorts/XP5YK-IL84o?si=UdXOdq1qH4XoVf-k' },
      { title: '「オープンマリッジ」ごっこ倶楽部', url: 'https://youtube.com/shorts/r3j9uaJs3zM?si=vGYLP7sEepfV5hvM' }
    ],
    mainReel: 'https://youtu.be/57XiYmhbS0E?si=se0oaeCICQ1-rwO4',
    competitor: 'なし（現在契約中の競合なし）'
  },
  '島田和奏': {
    name: '島田和奏',
    furigana: 'しまだ わかな',
    age: 27,
    birthday: '1999/07/06',
    bornIn: '秋田県',
    height: '161cm',
    skills: '剣道(初段), 民謡, 肩が柔らかい',
    license: '美容師免許, メイク検定3級, 色彩検定3級, 剣道初段',
    hobbies: '演歌を聴く, 大衆演劇を見に行く',
    officialUrl: 'https://gateagency.jp/talent/wakanashimada/',
    profilePdf: 'https://drive.google.com/file/d/1aUPqTVDQzmYVScW4KYcHFK3lQXKycg0h/view?usp=drive_link',
    photosFolder: 'https://drive.google.com/drive/folders/1lUxAmoQNmoDv8vRCJdnbE52u-Xd-NhvJ?usp=sharing',
    reels: [
      { title: '出演映像リール', url: 'https://youtu.be/X_RS0SwuSDs?si=cSJjFVXLkHc2g6Jn' }
    ],
    mainReel: 'https://youtu.be/X_RS0SwuSDs?si=cSJjFVXLkHc2g6Jn',
    competitor: 'なし'
  },
  '中塚智': {
    name: '中塚智',
    furigana: 'なかつか さとし',
    age: 27,
    birthday: '1998/11/13',
    bornIn: '茨城県',
    height: '176cm',
    skills: '野球, 日本舞踊, 茶道, サウナ',
    officialUrl: 'https://gateagency.jp/talent/satoshinakatsuka/',
    profilePdf: 'https://drive.google.com/file/d/1RnwtvaRHYb4Q-AE5vTp4A0iFawVUdEGB/view?usp=drive_link',
    photosFolder: 'https://drive.google.com/drive/folders/1lUxAmoQNmoDv8vRCJdnbE52u-Xd-NhvJ?usp=sharing',
    reels: [
      { title: '出演映像リール', url: 'https://youtu.be/SJg9HwIykT8?si=kLwfn4yYiYcj9JA5' }
    ],
    mainReel: 'https://youtu.be/SJg9HwIykT8?si=kLwfn4yYiYcj9JA5',
    competitor: 'なし'
  },
  '太田陽菜': {
    name: '太田陽菜',
    furigana: 'おおた ひな',
    age: 20,
    birthday: '2006/03/07',
    bornIn: '愛知県岡崎市（滋賀県大津市育ち）',
    height: '156cm',
    skills: '歌, ジャズダンス, タップダンス, バレエ',
    hobbies: '舞台観劇, 甘いものを食べること',
    education: '大阪芸術大学 舞台芸術学科（授業料免除特待生）',
    officialUrl: 'https://gateagency.jp/talent/hinaota/',
    profilePdf: 'https://drive.google.com/file/d/1B46rb-RTCAqCkKyba9sdcyFVj2_NZCbp/view?usp=drive_link',
    photosFolder: 'https://drive.google.com/drive/folders/1lUxAmoQNmoDv8vRCJdnbE52u-Xd-NhvJ?usp=sharing',
    reels: [],
    mainReel: '',
    competitor: 'なし'
  },
  '小久保宏紀': {
    name: '小久保宏紀',
    furigana: 'こくぼ ひろき',
    age: 21,
    birthday: '2004/04/05',
    bornIn: '静岡県',
    height: '165.5cm',
    license: '第二種電気工事士, 日本語検定準3級',
    officialUrl: 'https://gateagency.jp/talent/hirokikokubo/',
    profilePdf: 'https://drive.google.com/file/d/1MAo6mbQXh38lqiMAxQ8oJAm4bxhjMdDC/view?usp=drive_link',
    photosFolder: 'https://drive.google.com/drive/folders/1lUxAmoQNmoDv8vRCJdnbE52u-Xd-NhvJ?usp=sharing',
    reels: [
      { title: '出演映像リール', url: 'https://youtu.be/LxDR7j2y1JY?si=OEOneMaLgm-GEqq-' }
    ],
    mainReel: 'https://youtu.be/LxDR7j2y1JY?si=OEOneMaLgm-GEqq-',
    competitor: 'なし'
  },
  '相馬寿樹': {
    name: '相馬寿樹',
    furigana: 'そうま としき',
    age: 24,
    birthday: '2002/01/15',
    height: '178cm',
    role: '映画監督 / 映像ディレクター',
    officialUrl: 'https://gateagency.jp/talent/toshikisoma/',
    profilePdf: 'https://drive.google.com/file/d/1MAo6mbQXh38lqiMAxQ8oJAm4bxhjMdDC/view?usp=drive_link',
    photosFolder: 'https://drive.google.com/drive/folders/1lUxAmoQNmoDv8vRCJdnbE52u-Xd-NhvJ?usp=sharing',
    reels: [
      { title: '出演映像リール', url: 'https://youtu.be/WmuDVNX2Q5I' }
    ],
    mainReel: 'https://youtu.be/WmuDVNX2Q5I',
    competitor: 'なし'
  }
};

// ===== Security helpers =====
function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let allData = [];
let allNewsData = [];
let allSalesAttackData = [];
let calendarEvents = [];
let salesSearch = '';
let salesFilter = 'all';
let currentTalent = 'all';
let currentSection = 'dashboard';
let calYear, calMonth;

// ===== Data Fetch =====
async function fetchWithTimeout(url, options = {}, timeout = 5000, responseType = 'json') {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = responseType === 'text' ? await response.text() : await response.json();
    clearTimeout(id);
    return data;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function fetchSheetData(sheet) {
  // 匿名アクセス時のシート切り替えバグ（gviz/tqでsheetパラメータが非ログイン時に効かない問題）を回避するため、gidを使用
  let gid = '0';
  if (sheet === '営業アタック') {
    gid = '693310836';
  }
  // Google Visualization APIの型の制約（日付列にあるテキストが削除される問題）を回避するため、CSVで取得
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}&_=${Date.now()}`;
  const text = await fetchWithTimeout(url, {}, 5000, 'text');
  return parseCSV(text);
}

// 汎用CSVパーサー（改行やカンマを含むセルにも対応）
function parseCSV(text) {
  const result = [];
  let cur = '';
  let inQuote = false;
  let row = [];
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuote && text[i+1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (char === ',' && !inQuote) {
      row.push(cur);
      cur = '';
    } else if ((char === '\n' || (char === '\r' && text[i+1] === '\n')) && !inQuote) {
      if (char === '\r') i++;
      row.push(cur);
      result.push(row);
      row = [];
      cur = '';
    } else {
      if (char !== '\r') cur += char;
    }
  }
  if (cur !== '' || row.length > 0) {
    row.push(cur);
    result.push(row);
  }
  
  if (result.length < 2) return [];
  
  const headerMap = {
    'タレント': 'タレント名',
    'オーディション': 'ID',
    '対応者/結果待ち': '対応者',
    '書類結果待ち': '対応者'
  };
  const headers = result[0].map(h => {
    const trimmed = h.trim();
    return headerMap[trimmed] || trimmed;
  });
  const data = [];
  for (let i = 1; i < result.length; i++) {
    // 全てのカラムが空または空白文字のみの行をスキップ
    if (result[i].every(val => !val || val.trim() === '')) continue;
    const obj = {};
    headers.forEach((h, index) => {
      obj[h] = result[i][index] || '';
    });
    data.push(obj);
  }
  return data;
}

const FALLBACK_DATA = [
  {ID:'1',タレント名:'中塚智',オーディション名:'映画『夜明けの街』 主演キャスト',ジャンル:'映画',締切日:'2026/05/20',オーディション日:'2026/05/28',ステータス:'書類結果待ち',対応者:'マネージャー',アクション:'写真追加して再送',結果:'未定',備考:'監督指名あり',登録日:'2026/05/10',更新日:'2026/05/12',資料リンク:''},
  {ID:'2',タレント名:'中塚智',オーディション名:'NHKドラマ ゲスト出演',ジャンル:'ドラマ',締切日:'2026/05/15',オーディション日:'2026/05/22',ステータス:'オーディション済',対応者:'本人',アクション:'',結果:'結果待ち',備考:'2次審査通過',登録日:'2026/05/05',更新日:'2026/05/12',資料リンク:''},
  {ID:'3',タレント名:'中塚智',オーディション名:'サントリー CM',ジャンル:'CM',締切日:'2026/05/25',オーディション日:'',ステータス:'応募準備',対応者:'マネージャー',アクション:'プロフィール更新必要',結果:'未定',備考:'ギャラ:80万',登録日:'2026/05/11',更新日:'2026/05/12',資料リンク:''},
  {ID:'4',タレント名:'谷口彩菜',オーディション名:'舞台『蒼の彼方』',ジャンル:'舞台',締切日:'2026/05/18',オーディション日:'2026/05/30',ステータス:'書類結果待ち',対応者:'本人',アクション:'',結果:'未定',備考:'ダンス審査あり',登録日:'2026/05/08',更新日:'2026/05/12',資料リンク:''},
  {ID:'5',タレント名:'谷口彩菜',オーディション名:'YouTubeドラマ レギュラー',ジャンル:'Web',締切日:'2026/05/30',オーディション日:'',ステータス:'情報収集',対応者:'マネージャー',アクション:'詳細確認中',結果:'未定',備考:'週3回撮影',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'6',タレント名:'寺崎ひな',オーディション名:'ABEMA恋愛リアリティ',ジャンル:'バラエティ',締切日:'2026/05/22',オーディション日:'2026/06/01',ステータス:'応募準備',対応者:'本人',アクション:'自己PR動画撮影',結果:'未定',備考:'',登録日:'2026/05/10',更新日:'2026/05/12',資料リンク:''},
  {ID:'7',タレント名:'寺崎ひな',オーディション名:'ショートドラマ 主演',ジャンル:'ショートドラマ',締切日:'2026/05/16',オーディション日:'2026/05/20',ステータス:'オーディション済',対応者:'マネージャー',アクション:'スケジュール調整',結果:'結果待ち',備考:'先方から好感触',登録日:'2026/05/06',更新日:'2026/05/12',資料リンク:''},
  {ID:'8',タレント名:'小久保宏紀',オーディション名:'MV出演 アーティスト未定',ジャンル:'MV',締切日:'2026/06/05',オーディション日:'',ステータス:'情報収集',対応者:'マネージャー',アクション:'ギャラ確認',結果:'未定',備考:'',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'9',タレント名:'小久保宏紀',オーディション名:'化粧品ブランド モデル',ジャンル:'広告',締切日:'2026/05/19',オーディション日:'2026/05/26',ステータス:'書類結果待ち',対応者:'本人',アクション:'',結果:'未定',備考:'コンポジット写真必須',登録日:'2026/05/09',更新日:'2026/05/11',資料リンク:''},
  {ID:'10',タレント名:'島田和奏',オーディション名:'インディーズ映画 助演',ジャンル:'映画',締切日:'2026/06/10',オーディション日:'',ステータス:'情報収集',対応者:'マネージャー',アクション:'監督にコンタクト',結果:'未定',備考:'低予算だが良作の可能性',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'11',タレント名:'島田和奏',オーディション名:'アパレルブランド シーズンモデル',ジャンル:'CM',締切日:'2026/05/14',オーディション日:'2026/05/17',ステータス:'完了',対応者:'本人',アクション:'',結果:'合格',備考:'初のCM案件！',登録日:'2026/04/28',更新日:'2026/05/10',資料リンク:''},
  {ID:'12',タレント名:'太田陽菜',オーディション名:'舞台『月光』 ヒロイン',ジャンル:'舞台',締切日:'2026/04/20',オーディション日:'2026/05/05',ステータス:'完了',対応者:'本人',アクション:'',結果:'不合格',備考:'次回作で再挑戦',登録日:'2026/04/15',更新日:'2026/05/08',資料リンク:''},
  {ID:'13',タレント名:'太田陽菜',オーディション名:'ドラマ『翔ぶ季節』 レギュラー',ジャンル:'ドラマ',締切日:'2026/05/28',オーディション日:'2026/06/05',ステータス:'応募準備',対応者:'マネージャー',アクション:'オーディション用写真手配',結果:'未定',備考:'人気原作',登録日:'2026/05/11',更新日:'2026/05/12',資料リンク:''},
  {ID:'14',タレント名:'谷口彩菜',オーディション名:'アパレルECモデル',ジャンル:'CM',締切日:'2026/06/01',オーディション日:'',ステータス:'情報収集',対応者:'本人',アクション:'',結果:'未定',備考:'',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'35',タレント名:'寺崎ひな',オーディション名:'うどんチェーン店関係M亀　広告 キャスト選考',ジャンル:'広告',締切日:'2026/05/22',オーディション日:'',ステータス:'完了',対応者:'マネージャー',アクション:'',結果:'不合格',備考:'演出コンテ：https://app.jector.jp/dl/de1Wo73naFGvM3ajrYiaVssw PASS:0522',登録日:'2026/05/20',更新日:'2026/05/27',資料リンク:''},
];

async function loadData() {
  try {
    allData = await fetchSheetData('シート1');
    try {
      allSalesAttackData = await fetchSheetData('営業アタック');
    } catch (salesErr) {
      console.warn('営業アタックデータの読み込みに失敗しました:', salesErr.message);
      allSalesAttackData = [];
    }
    try {
      if (hasGasUrl()) {
        const json = await fetchWithTimeout(withToken(GAS_WEBAPP_URL + '?action=news'), {}, 5000);
        if (json.success && json.data) {
          allNewsData = json.data;
        } else {
          throw new Error((json && json.error) || 'APIエラー');
        }
      } else {
        allNewsData = [];
      }
    } catch (newsErr) {
      console.warn('ニュースデータの読み込みに失敗しました:', newsErr.message);
      allNewsData = [];
    }
    renderAll();
  } catch (e) {
    console.warn('スプレッドシート読み込み失敗。フォールバックデータを使用:', e.message);
    allData = FALLBACK_DATA;
    allSalesAttackData = [];
    try {
      renderAll();
    } catch (renderErr) {
      console.error('フォールバックデータでの描画に失敗しました:', renderErr.message);
    }
  } finally {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }
  // 売上データを非同期で取得（ダッシュボード表示後）
  loadSalesData();
  // カレンダーデータを非同期で取得
  loadCalendarData();
}

async function loadCalendarData() {
  if (!hasGasUrl()) return;
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();
    const url = withToken(`${GAS_WEBAPP_URL}?action=calendar&start=${start}&end=${end}`);
    const json = await fetchWithTimeout(url, { redirect: 'follow', mode: 'cors' }, 5000);
    if (json.success && json.events) {
      calendarEvents = json.events;
      console.log(`カレンダー: ${calendarEvents.length}件取得`);
      if (currentSection === 'calendar') renderCalendar();
      renderRecent(); // カレンダーデータ取得後にRECENTも再描画
    }
  } catch (e) {
    console.warn('カレンダーデータ取得失敗:', e.message);
  }
}

function getFiltered() {
  if (currentTalent === 'all') return allData;
  return allData.filter(d => d['タレント名'] === currentTalent);
}

function parseDate(s) {
  if (!s) return null;
  // Handle serial dates from Google Sheets (e.g. 46157.0)
  if (!isNaN(s) && !isNaN(parseFloat(s))) {
    const serial = parseFloat(s);
    // Excel/Sheets serial dates start from Dec 30, 1899
    return new Date((serial - 25569) * 86400000);
  }
  // Handle "Date(2026,4,20)" format from Google Sheets
  const dm = s.match(/Date\((\d+),(\d+),(\d+)\)/);
  if (dm) return new Date(+dm[1], +dm[2], +dm[3]);
  const d = new Date(s);
  return isNaN(d) ? null : d;
}

function fmtDate(s) {
  const d = parseDate(s);
  if (!d) return '-';
  return `${d.getMonth()+1}/${d.getDate()}`;
}

function fmtDateFull(s) {
  const d = parseDate(s);
  if (!d) return '-';
  return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
}

function daysUntil(s) {
  const d = parseDate(s);
  if (!d) return Infinity;
  return Math.ceil((d - new Date()) / 86400000);
}

function talentColor(name) { return TALENT_COLORS[name] || '#888'; }
function talentIcon(name) { return TALENT_ICONS[name] || '👤'; }

// ===== Render All =====
function renderAll() {
  renderTalentFilter();
  renderTalentKitBar();
  renderStats();
  renderActionPanel();
  renderDeadlines();
  renderRecent();
  renderTalentSummary();
  renderKanban();
  renderList();
  renderCalendar();
  renderStatsDetail();
  renderWorks();
  renderNews();
  renderSalesAttackAll();
  renderSurveyList();
}

// ===== Sales Data =====
const MONTH_LABELS = ['7月','8月','9月','10月','11月','12月','1月','2月','3月','4月','5月','6月'];

async function loadSalesData() {
  if (!hasGasUrl()) {
    document.getElementById('salesLoading').textContent = '⚠️ GAS WebApp URLが未設定です';
    return;
  }
  try {
    const json = await fetchWithTimeout(withToken(GAS_WEBAPP_URL + '?action=sales'), {}, 5000);
    if (json.success && json.data) {
      renderSalesCard(json.data);
    } else {
      throw new Error(json.error || 'データ取得失敗');
    }
  } catch (e) {
    console.warn('売上データ読み込み失敗:', e.message);
    document.getElementById('salesLoading').textContent = '⚠️ 売上データを読み込めませんでした';
  }
}

function renderSalesCard(salesData) {
  const grid = document.getElementById('salesGrid');
  const loading = document.getElementById('salesLoading');
  loading.style.display = 'none';
  grid.style.display = '';

  const allMonthly = Object.values(salesData).flatMap(d => d.monthly);
  const maxVal = Math.max(...allMonthly, 1);

  let html = '';
  for (const name of MANAGED_TALENTS) {
    const data = salesData[name];
    if (!data) continue;
    const color = talentColor(name);
    const icon = talentIcon(name);
    const totalStr = '¥' + Math.round(data.total).toLocaleString();
    
    // 直近の非ゼロ月を見てトレンド判定
    const nonZero = data.monthly.filter(v => v > 0);
    let trendClass = 'flat', trendIcon = '→';
    if (nonZero.length >= 2) {
      const last = nonZero[nonZero.length - 1];
      const prev = nonZero[nonZero.length - 2];
      if (last > prev) { trendClass = 'up'; trendIcon = '↑'; }
      else if (last < prev) { trendClass = 'down'; trendIcon = '↓'; }
    }

    let barsHtml = '';
    for (let i = 0; i < 12; i++) {
      const h = maxVal > 0 ? Math.round((data.monthly[i] / maxVal) * 44) : 0;
      barsHtml += `<div class="sales-bar-col"><div class="sales-bar" style="height:${Math.max(h, 2)}px;background:${data.monthly[i] > 0 ? color : '#e8e8e8'}"></div><span class="sales-bar-label">${MONTH_LABELS[i].replace('月','')}</span></div>`;
    }

    html += `<div class="sales-talent-card" style="--card-color:${color}">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${color}"></div>
      <div class="sales-talent-top">
        <span class="sales-talent-name">${icon} ${name}</span>
        <span class="sales-total">${totalStr}</span>
      </div>
      <div class="sales-monthly">${barsHtml}</div>
      <div class="sales-trend ${trendClass}">${trendIcon} トレンド</div>
    </div>`;
  }
  grid.innerHTML = html;
}

// ===== Talent Filter =====
function renderTalentFilter() {
  const el = document.getElementById('talentFilter');
  const talents = Object.keys(TALENT_COLORS);
  el.innerHTML = `<button class="talent-chip ${currentTalent==='all'?'active':''}" onclick="setTalent('all')">全員</button>` +
    talents.map(t => `<button class="talent-chip ${currentTalent===t?'active':''}" onclick="setTalent('${t}')"><span class="chip-dot" style="background:${talentColor(t)}"></span>${t}</button>`).join('');
}

function setTalent(t) {
  currentTalent = t;
  renderAll();
}

// ===== Talent Assets & Press Kit Bar =====
function renderTalentKitBar() {
  const bar = document.getElementById('talentKitBar');
  if (!bar) return;

  if (currentTalent === 'all' || !TALENT_ASSETS[currentTalent]) {
    bar.classList.add('hidden');
    bar.innerHTML = '';
    return;
  }

  const t = TALENT_ASSETS[currentTalent];
  const color = talentColor(t.name);
  const icon = talentIcon(t.name);

  bar.classList.remove('hidden');
  bar.innerHTML = `
    <div class="talent-kit-info">
      <div class="talent-kit-avatar" style="background: ${color}">${icon}</div>
      <div class="talent-kit-title-wrap">
        <div class="talent-kit-title">
          <span>${escapeHtml(t.name)}</span>
          <span class="talent-kit-tag">${t.age}歳 / ${t.height}</span>
        </div>
        <div class="talent-kit-meta">
          <span>競合状況: ${escapeHtml(t.competitor || 'なし')}</span>
        </div>
      </div>
    </div>
    <div class="talent-kit-actions">
      <button class="btn-kit-copy" onclick="copyTalentPack('${escapeHtml(t.name)}')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span>📋 提案素材を一括コピー</span>
      </button>
      <a href="${t.profilePdf}" target="_blank" rel="noopener noreferrer" class="btn-kit-link" title="プロフィールPDFを開く">
        <span>📄 プロフィールPDF</span>
      </a>
      <a href="${t.photosFolder}" target="_blank" rel="noopener noreferrer" class="btn-kit-link" title="近影写真フォルダを開く">
        <span>📷 近影写真</span>
      </a>
      <a href="${t.mainReel}" target="_blank" rel="noopener noreferrer" class="btn-kit-link" title="出演映像・演技リールを開く">
        <span>🎬 映像リール</span>
      </a>
    </div>
  `;
}

function copyTalentPack(talentName) {
  const t = TALENT_ASSETS[talentName];
  if (!t) return;

  let reelsText = '';
  if (t.reels && t.reels.length > 0) {
    reelsText = t.reels.map(r => `・${r.title}: ${r.url}`).join('\n');
  }

  const text = `【${t.name}（${t.furigana} / ${t.age}歳 / ${t.height}）】
■ 公式プロフィール:
${t.officialUrl || ''}

■ プロフィール資料（PDF）:
${t.profilePdf || '準備中'}

■ 近影写真フォルダ（Google Drive）:
${t.photosFolder || '準備中'}

■ 出演映像・演技リール:
${reelsText || '準備中'}

■ 競合・契約状況:
${t.competitor || 'なし'}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`📋 ${t.name} の提案用素材セットをコピーしました！`);
    }).catch(() => {
      fallbackCopy(text, t.name);
    });
  } else {
    fallbackCopy(text, t.name);
  }
}

function fallbackCopy(text, name) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(`📋 ${name} の提案用素材セットをコピーしました！`);
  } catch (e) {
    showToast('⚠️ コピーに失敗しました');
  }
  document.body.removeChild(ta);
}

// ===== Stats =====
function renderStats() {
  const data = getFiltered();
  const active = data.filter(d => d['ステータス'] !== '完了');
  const deadlineSoon = data.filter(d => { const du = daysUntil(d['締切日']); return du >= 0 && du <= 7; });
  const passed = data.filter(d => d['結果'] === '合格');
  const managerAction = data.filter(d => ['応募準備','書類結果待ち','2次以降AD','結果待ち'].includes(d['ステータス']) && !(d['結果'] || '').startsWith('不合格'));
  document.getElementById('statsGrid').innerHTML = [
    statCard('📋', active.length, '進行中', ''),
    statCard('⏰', deadlineSoon.length, '今週の締切', ''),
    statCard('⚡', managerAction.length, '対応待ち', 'urgent')
  ].join('');
}

function statCard(icon, val, label, cls) {
  return `<div class="stat-card ${cls}"><span class="stat-icon">${icon}</span><div class="stat-body"><span class="stat-value">${val}</span><span class="stat-label">${label}</span></div></div>`;
}

// ===== Action Panel =====
function renderActionPanel() {
  const data = getFiltered().filter(d => ['応募準備','書類結果待ち','2次以降AD','結果待ち'].includes(d['ステータス']) && !(d['結果'] || '').startsWith('不合格'));
  const panel = document.getElementById('actionPanel');
  document.getElementById('actionCount').textContent = data.length;
  const list = document.getElementById('actionList');
  if (!data.length) {
    panel.classList.add('empty');
    list.innerHTML = '';
    document.querySelector('.action-empty-msg')?.remove();
    panel.insertAdjacentHTML('beforeend', '<p class="action-empty-msg">✨ 対応待ちはありません</p>');
    return;
  }
  panel.classList.remove('empty');
  document.querySelector('.action-empty-msg')?.remove();
  list.innerHTML = data.map(d => {
    let dateInfo = '';
    const resDate = d['結果発表'] || d['結果発表日'];
    if (['書類結果待ち', '結果待ち'].includes(d['ステータス']) && resDate) {
      const parsed = parseDate(resDate);
      dateInfo = '結果 ' + (parsed ? fmtDate(resDate) : resDate);
    } else if (d['締切日']) {
      dateInfo = '〆 ' + fmtDate(d['締切日']);
    }
    return `<div class="action-item">
    <span class="action-talent-badge" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span>
    <div class="action-info"><div class="action-title">${escapeHtml(d['オーディション名'])}</div><div class="action-desc">${escapeHtml(d['アクション'])}</div></div>
    <span class="action-due">${escapeHtml(dateInfo)}</span>
  </div>`;
  }).join('');
}

// ===== Deadlines =====
function renderDeadlines() {
  const data = getFiltered().filter(d => d['締切日'] && daysUntil(d['締切日']) >= 0).sort((a,b) => daysUntil(a['締切日']) - daysUntil(b['締切日'])).slice(0, 6);
  const el = document.getElementById('dashDeadlines');
  if (!data.length) { el.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>今後の締切はありません</p></div>'; return; }
  el.innerHTML = data.map(d => {
    const dd = parseDate(d['締切日']);
    const du = daysUntil(d['締切日']);
    const urgent = du <= 3 ? 'deadline-urgent' : '';
    return `<div class="deadline-item"><div class="deadline-date"><span class="day ${urgent}">${dd?dd.getDate():'-'}</span><span class="month">${dd?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dd.getMonth()]:''}</span></div><div class="deadline-info"><div class="deadline-title">${escapeHtml(d['オーディション名'])}</div><div class="deadline-meta"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span> ${du<=0?'⚠️ 今日！':du+'日後'}</div></div></div>`;
  }).join('');
}

// ===== Recent (直近スケジュール) =====
function renderRecent() {
  const el = document.getElementById('dashRecent');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const events = [];

  // スプシデータからオーディション日・公開日・結果発表日を収集
  const sheetData = getFiltered();
  sheetData.forEach(d => {
    if (d['ステータス'] === '完了') return;
    const name = d['オーディション名'] || '';
    const talent = d['タレント名'] || '';

    // オーディション日（複数日対応: カンマ区切り）
    const audDates = (d['オーディション日'] || '').split(',').map(s => s.trim()).filter(Boolean);
    audDates.forEach(ds => {
      const dt = parseDate(ds);
      if (dt && dt >= today) {
        events.push({ date: dt, icon: '🎤', label: 'AD', name, talent, type: 'audition' });
      }
    });

    // 公開日（OA/配信）
    const rlDate = parseDate(d['公開日']);
    if (rlDate && rlDate >= today) {
      events.push({ date: rlDate, icon: '📺', label: 'OA', name, talent, type: 'release' });
    }

    // 結果発表日
    const rdDate = parseDate(d['結果発表日']);
    if (rdDate && rdDate >= today) {
      events.push({ date: rdDate, icon: '📋', label: '結果', name, talent, type: 'result' });
    }
  });

  // Googleカレンダーイベントを収集（終日イベントのみ）
  const filteredCalEvents = calendarEvents.filter(ev => {
    if (currentTalent !== 'all' && ev.talent !== currentTalent) return false;
    if (ev.allDay === false) return false; // 時間指定イベントは除外
    const evDate = new Date(ev.start);
    evDate.setHours(0, 0, 0, 0);
    return evDate >= today;
  });
  filteredCalEvents.forEach(ev => {
    const dt = new Date(ev.start);
    events.push({ date: dt, icon: '📅', label: 'Gカレ', name: ev.title, talent: ev.talent || '', type: 'gcal' });
  });

  // 日付昇順ソート → 上位5件
  events.sort((a, b) => a.date - b.date);
  const top5 = events.slice(0, 5);

  if (!top5.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>直近の予定はありません</p></div>';
    return;
  }

  el.innerHTML = top5.map(ev => {
    const isToday = ev.date.toDateString() === new Date().toDateString();
    const daysLeft = Math.ceil((ev.date - new Date()) / 86400000);
    const daysStr = isToday ? '<span style="color:var(--accent);font-weight:700">今日！</span>' : `${daysLeft}日後`;
    const typeColor = ev.type === 'audition' ? '#e2000f' : ev.type === 'release' ? '#10B981' : ev.type === 'result' ? '#F59E0B' : '#8B5CF6';
    const dd = ev.date;
    return `<div class="deadline-item">
      <div class="deadline-date">
        <span class="day" style="color:${typeColor}">${dd.getDate()}</span>
        <span class="month">${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dd.getMonth()]}</span>
      </div>
      <div class="deadline-info">
        <div class="deadline-title"><span style="margin-right:4px">${ev.icon}</span>${escapeHtml(ev.name)}</div>
        <div class="deadline-meta">
          <span class="talent-badge-sm" style="background:${talentColor(ev.talent)}">${escapeHtml(ev.talent || ev.icon)}</span>
          <span style="font-size:.65rem;background:${typeColor}22;color:${typeColor};padding:1px 5px;border-radius:4px;font-weight:600;margin-left:4px">${ev.label}</span>
          <span style="font-size:.65rem;color:var(--text-muted);margin-left:6px">${daysStr}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ===== Talent Summary =====
function renderTalentSummary() {
  const el = document.getElementById('talentSummary');
  const talents = Object.keys(TALENT_COLORS);
  el.innerHTML = talents.map(t => {
    const td = allData.filter(d => d['タレント名'] === t);
    const active = td.filter(d => d['ステータス'] !== '完了').length;
    const pass = td.filter(d => d['結果'] === '合格').length;
    const total = td.length;
    return `<div class="talent-summary-card" style="cursor:pointer" onclick="setTalent('${escapeHtml(t)}')"><div style="position:absolute;top:0;left:0;right:0;height:3px;background:${talentColor(t)}"></div><div class="talent-summary-top"><span class="talent-icon">${talentIcon(t)}</span><span class="talent-summary-name">${escapeHtml(t)}</span></div><div class="talent-stats-row"><div class="talent-stat-item"><span class="talent-stat-num">${total}</span><span class="talent-stat-lbl">総数</span></div><div class="talent-stat-item"><span class="talent-stat-num">${active}</span><span class="talent-stat-lbl">進行中</span></div><div class="talent-stat-item"><span class="talent-stat-num">${pass}</span><span class="talent-stat-lbl">合格</span></div></div></div>`;
  }).join('');
}

// ===== Kanban =====
function renderKanban() {
  const data = getFiltered();
  const buckets = {info:[],prep:[],sent:[],done:[],wait:[],order:[],complete:[]};
  data.forEach(d => {
    const s = d['ステータス'];
    const r = d['結果'];
    if ((r || '').startsWith('不合格')) { buckets.complete.push(d); return; }
    if (s === '受注') { buckets.order.push(d); return; }
    if (r === '合格') { buckets.order.push(d); return; }
    if (s === '情報収集') buckets.info.push(d);
    else if (s === '応募準備') buckets.prep.push(d);
    else if (s === '書類結果待ち') buckets.sent.push(d);
    else if (s === '2次以降AD') buckets.done.push(d);
    else if (s === '結果待ち') buckets.wait.push(d);
    else if (s === '完了') buckets.complete.push(d);
    else buckets.info.push(d);
  });
  Object.keys(buckets).forEach(k => {
    const container = document.getElementById('cards-'+k);
    const countEl = document.getElementById('count-'+k);
    if (!container) return;
    container.innerHTML = buckets[k].map(d => kanbanCard(d)).join('') || '<div style="text-align:center;color:var(--text-muted);font-size:.75rem;padding:20px">なし</div>';
    if (countEl) countEl.textContent = buckets[k].length;
  });
}

function kanbanCard(d) {
  const resultCls = d['結果']==='合格'?'result-pass':(d['結果']||'').startsWith('不合格')?'result-fail':d['結果']==='結果待ち'?'result-waiting':'';
  const fileLink = d['資料リンク'] ? `<a href="${escapeHtml(d['資料リンク'])}" target="_blank" style="font-size:.6rem;color:var(--accent);text-decoration:none">📎 資料</a>` : '';
  const typeVal = d['案件種別'] || 'オーディション';
  const typeColor = TYPE_COLORS[typeVal] || '#6B7280';
  const typeIcon = TYPE_ICONS[typeVal] || '📋';
  const typeBadge = `<span style="display:inline-block;font-size:.6rem;font-weight:700;color:#fff;background:${typeColor};padding:1px 6px;border-radius:3px;margin-bottom:4px">${typeIcon} ${escapeHtml(typeVal)}</span>`;
  return `<div class="kanban-card" style="position:relative; ${typeVal !== 'オーディション' ? 'border-left:3px solid '+typeColor : ''}">
    <button class="card-edit-btn" data-edit-id="${escapeHtml(d['ID'])}" title="編集" style="position:absolute;top:8px;right:8px;background:none;border:none;cursor:pointer;font-size:.8rem;padding:2px;line-height:1;">✏️</button>
    ${typeBadge}
    <div class="kanban-card-talent"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span></div>
    <div class="kanban-card-title">${escapeHtml(d['オーディション名'])}</div>
    <div class="kanban-card-meta">${d['締切日']?'〆 '+fmtDate(d['締切日']):''} ${d['対応者']==='マネージャー'?'<span style="color:var(--accent)">●MGR</span>':''}</div>
    <span class="kanban-card-genre">${GENRE_ICONS[d['ジャンル']]||'📋'} ${escapeHtml(d['ジャンル'])}</span>
    ${resultCls?` <span class="kanban-card-result ${resultCls}">${escapeHtml(d['結果'])}</span>`:''}
    ${d['アクション']?`<div style="font-size:.65rem;color:var(--text-muted);margin-top:4px">→ ${escapeHtml(d['アクション'])}</div>`:''}
    ${fileLink?`<div style="margin-top:4px">${fileLink}</div>`:''}
  </div>`;
}

// ===== List =====
let listFilter = 'all';
let listSearch = '';
let listSort = {col:'deadline',asc:true};

function renderList() {
  let data = getFiltered();
  if (listFilter === 'active') data = data.filter(d => d['ステータス']!=='完了' && d['結果']!=='合格' && !(d['結果']||'').startsWith('不合格'));
  else if (listFilter === '合格') data = data.filter(d => d['結果']==='合格');
  else if (listFilter === '不合格') data = data.filter(d => (d['結果']||'').startsWith('不合格'));
  if (listSearch) { const q = listSearch.toLowerCase(); data = data.filter(d => d['オーディション名'].toLowerCase().includes(q)); }
  if (listSort.col === 'deadline') data.sort((a,b) => (listSort.asc?1:-1)*(daysUntil(a['締切日'])-daysUntil(b['締切日'])));
  else if (listSort.col === 'talent') data.sort((a,b) => (listSort.asc?1:-1)*a['タレント名'].localeCompare(b['タレント名']));
  else if (listSort.col === 'name') data.sort((a,b) => (listSort.asc?1:-1)*a['オーディション名'].localeCompare(b['オーディション名']));

  const el = document.getElementById('listBody');
  el.innerHTML = data.map(d => {
    const sCls = d['ステータス']==='情報収集'?'status-info':d['ステータス']==='応募準備'?'status-prep':d['ステータス']==='書類結果待ち'?'status-sent':d['ステータス']==='2次以降AD'?'status-auditioned':d['ステータス']==='受注'?'status-order':'status-completed';
    const rCls = d['結果']==='合格'?'result-pass':(d['結果']||'').startsWith('不合格')?'result-fail':d['結果']==='結果待ち'?'result-waiting':'';
    const ownerCls = d['対応者']==='マネージャー'?'owner-manager':'';
    const fileLink = d['資料リンク'] ? `<a href="${escapeHtml(d['資料リンク'])}" target="_blank" style="font-size:.7rem;color:var(--accent)">📎</a>` : '';
    return `<tr><td data-label="タレント"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span></td><td data-label="案件名">${escapeHtml(d['オーディション名'])} ${fileLink}</td><td data-label="ジャンル">${GENRE_ICONS[d['ジャンル']]||''} ${escapeHtml(d['ジャンル'])}</td><td data-label="締切">${fmtDate(d['締切日'])}</td><td data-label="ステータス"><span class="status-badge ${sCls}">${escapeHtml(d['ステータス'])}</span></td><td data-label="対応者" class="${ownerCls}">${escapeHtml(d['対応者'])}</td><td data-label="結果">${rCls?`<span class="kanban-card-result ${rCls}">${escapeHtml(d['結果'])}</span>`:escapeHtml(d['結果'])||'-'}</td><td data-label="アクション" style="font-size:.75rem;color:var(--text-muted)">${escapeHtml(d['アクション'])||'-'}</td><td data-label="操作"><button class="card-edit-btn" data-edit-id="${escapeHtml(d['ID'])}" title="編集" style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;">✏️</button></td></tr>`;
  }).join('') || '<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📭</div><p>該当なし</p></div></td></tr>';
}

// ===== Calendar =====
function renderCalendar() {
  const now = new Date();
  if (calYear === undefined) { calYear = now.getFullYear(); calMonth = now.getMonth(); }
  const title = document.getElementById('calMonthTitle');
  title.textContent = `${calYear}年 ${calMonth+1}月`;

  const grid = document.getElementById('calGrid');
  const days = ['日','月','火','水','木','金','土'];
  let html = days.map(d => `<div class="cal-header-cell">${d}</div>`).join('');

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const today = now.getDate();
  const data = getFiltered();

  // Googleカレンダーイベントをフィルタ（終日イベントのみ表示）
  const filteredCalEvents = calendarEvents.filter(ev => {
    if (currentTalent !== 'all' && ev.talent !== currentTalent) return false;
    if (ev.allDay === false) return false; // 時間指定イベントは除外
    return true;
  });

  for (let i = 0; i < firstDay; i++) html += '<div class="cal-cell other-month"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today && calMonth === now.getMonth() && calYear === now.getFullYear();
    // スプレッドシートの案件イベント
    const sheetEvents = data.filter(item => {
      const dl = parseDate(item['締切日']);
      const ad = parseDate(item['オーディション日']);
      const rd = parseDate(item['結果発表日']);
      const rl = parseDate(item['公開日']);
      return (dl && dl.getDate()===d && dl.getMonth()===calMonth && dl.getFullYear()===calYear) ||
             (ad && ad.getDate()===d && ad.getMonth()===calMonth && ad.getFullYear()===calYear) ||
             (rd && rd.getDate()===d && rd.getMonth()===calMonth && rd.getFullYear()===calYear) ||
             (rl && rl.getDate()===d && rl.getMonth()===calMonth && rl.getFullYear()===calYear);
    });
    // Googleカレンダーのイベント
    const gcalEvents = filteredCalEvents.filter(ev => {
      const evDate = new Date(ev.start);
      return evDate.getDate()===d && evDate.getMonth()===calMonth && evDate.getFullYear()===calYear;
    });

    const totalEvents = sheetEvents.length + gcalEvents.length;
    html += `<div class="cal-cell ${isToday?'today':''}"><div class="cal-day">${d}</div>`;
    // スプレッドシートイベント表示
    sheetEvents.forEach(ev => {
      const isDl = parseDate(ev['締切日'])?.getDate()===d;
      const isRd = parseDate(ev['結果発表日'])?.getDate()===d;
      const isRl = parseDate(ev['公開日'])?.getDate()===d;
      const icon = isRl ? '📺' : isRd ? '📋' : isDl ? '〆' : '🎤';
      const name = ev['オーディション名'] || '';
      const shortName = name.length > 10 ? name.substring(0,10)+'…' : name;
      const label = isRl ? 'OA ' : isRd ? '結果' : '';
      const extraClass = isRd ? ' cal-result' : isRl ? ' cal-release' : '';
      html += `<div class="cal-event cal-sheet${extraClass}" style="background:${talentColor(ev['タレント名'])}${isRd||isRl?'cc':''}" title="${ev['タレント名']}: ${name}${isRd?' [結果発表]':''}${isRl?' [OA/配信]':''}">${icon} ${label}${shortName}</div>`;
    });
    // Googleカレンダーイベント表示
    gcalEvents.slice(0, 3).forEach(ev => {
      const timeStr = ev.allDay ? '' : new Date(ev.start).getHours() + ':'+ String(new Date(ev.start).getMinutes()).padStart(2,'0') + ' ';
      const shortTitle = ev.title.length > 8 ? ev.title.substring(0,8)+'…' : ev.title;
      html += `<div class="cal-event cal-gcal" style="background:${talentColor(ev.talent)}88;border-left:2px solid ${talentColor(ev.talent)}" title="📅 ${ev.talent}: ${ev.title}${ev.location ? '\n📍'+ev.location : ''}">${timeStr}${shortTitle}</div>`;
    });
    if (gcalEvents.length > 3) {
      html += `<div class="cal-event cal-more">+${gcalEvents.length - 3}件</div>`;
    }
    html += '</div>';
  }
  grid.innerHTML = html;

  // Legend
  document.getElementById('calLegend').innerHTML = Object.keys(TALENT_COLORS).map(t =>
    `<div class="cal-legend-item"><span class="cal-legend-dot" style="background:${talentColor(t)}"></span>${t}</div>`
  ).join('') + '<div class="cal-legend-item"><span style="font-size:.7rem">〆=締切 🎤=AD 📋=結果 📺=OA/配信 📅=Gカレンダー</span></div>';

  // カレンダー月変更時にデータ再取得
  loadCalendarDataForMonth();
}

async function loadCalendarDataForMonth() {
  if (!hasGasUrl()) return;
  try {
    const start = new Date(calYear, calMonth, 1).toISOString();
    const end = new Date(calYear, calMonth + 1, 0, 23, 59, 59).toISOString();
    // 既にデータがあるか確認
    const hasData = calendarEvents.some(ev => {
      const d = new Date(ev.start);
      return d.getMonth() === calMonth && d.getFullYear() === calYear;
    });
    if (hasData) return;
    const json = await fetchWithTimeout(withToken(`${GAS_WEBAPP_URL}?action=calendar&start=${start}&end=${end}`), {}, 5000);
    if (json.success && json.events) {
      calendarEvents = [...calendarEvents, ...json.events];
      renderCalendar();
    }
  } catch (e) { /* silent */ }
}

// ===== Stats Detail =====
function renderStatsDetail() {
  // Talent stats
  const tel = document.getElementById('statsTalent');
  const talents = Object.keys(TALENT_COLORS);
  const maxTotal = Math.max(...talents.map(t => allData.filter(d => d['タレント名']===t).length), 1);
  tel.innerHTML = talents.map(t => {
    const td = allData.filter(d => d['タレント名']===t);
    const pass = td.filter(d => d['結果']==='合格').length;
    const done = td.filter(d => d['結果']==='合格'||(d['結果']||'').startsWith('不合格')).length;
    const rate = done ? Math.round(pass/done*100) : '-';
    return `<div class="stat-bar-wrap"><div class="stat-bar-label"><span>${talentIcon(t)} ${t}</span><span>${td.length}件 (合格率: ${rate}${rate!=='-'?'%':''})</span></div><div class="stat-bar"><div class="stat-bar-fill" style="width:${td.length/maxTotal*100}%;background:${talentColor(t)}"></div></div></div>`;
  }).join('');

  // Genre stats
  const gel = document.getElementById('statsGenre');
  const genres = {};
  allData.forEach(d => { const g = d['ジャンル']; if (g) genres[g] = (genres[g]||0)+1; });
  gel.innerHTML = '<div class="genre-grid">' + Object.entries(genres).sort((a,b)=>b[1]-a[1]).map(([g,c]) =>
    `<div class="genre-card"><div class="genre-icon">${GENRE_ICONS[g]||'📋'}</div><div class="genre-name">${g}</div><div class="genre-count">${c}</div></div>`
  ).join('') + '</div>';

  // Monthly (simple)
  const mel = document.getElementById('statsMonthly');
  const months = {};
  allData.forEach(d => {
    const dd = parseDate(d['登録日']);
    if (dd) { const k = `${dd.getFullYear()}/${dd.getMonth()+1}`; months[k]=(months[k]||0)+1; }
  });
  const mEntries = Object.entries(months).sort((a,b)=>a[0].localeCompare(b[0]));
  const mMax = Math.max(...mEntries.map(e=>e[1]),1);
  mel.innerHTML = mEntries.length ? '<div style="display:flex;align-items:flex-end;gap:12px;height:160px;padding:16px 0">' + mEntries.map(([m,c]) =>
    `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px"><div style="background:var(--accent);width:100%;border-radius:4px 4px 0 0;height:${c/mMax*120}px;min-height:8px;transition:height .6s"></div><span style="font-size:.65rem;font-weight:700">${c}</span><span style="font-size:.6rem;color:var(--text-muted)">${m}</span></div>`
  ).join('') + '</div>' : '<div class="empty-state"><p>月次データなし</p></div>';
}

// ===== Navigation =====
function showSection(section) {
  currentSection = section;
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-'+section)?.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`)?.classList.add('active');
  const titles = {dashboard:'ダッシュボード',kanban:'カンバン',works:'仕事一覧',list:'リスト（AD）',calendar:'カレンダー',stats:'統計',sales_attack:'営業アタック',survey:'ルーツシート'};
  document.getElementById('pageTitle').textContent = titles[section] || section;
  if (section === 'sales_attack') {
    renderSalesAttackAll();
  }
  if (section === 'survey') {
    loadSurveyData();
  }
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');

  // URLのハッシュを同期する
  if (location.hash !== '#' + section) {
    location.hash = section;
  }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  // Date
  const now = new Date();
  const days = ['日','月','火','水','木','金','土'];
  document.getElementById('currentDate').textContent = `${now.getMonth()+1}/${now.getDate()} (${days[now.getDay()]})`;

  // Nav
  document.querySelectorAll('.nav-item').forEach(n => {
    n.addEventListener('click', e => {
      e.preventDefault();
      location.hash = n.dataset.section;
    });
  });

  // ハッシュルーティング監視
  window.addEventListener('hashchange', () => {
    const section = location.hash.replace('#', '') || 'dashboard';
    const validSections = ['dashboard', 'kanban', 'works', 'list', 'calendar', 'stats', 'sales_attack', 'survey'];
    if (validSections.includes(section)) {
      showSection(section);
    }
  });

  // 初回ロード時のルーティング
  const initSection = location.hash.replace('#', '') || 'dashboard';
  const validSections = ['dashboard', 'kanban', 'works', 'list', 'calendar', 'stats', 'sales_attack', 'survey'];
  if (validSections.includes(initSection)) {
    showSection(initSection);
  }

  // Mobile menu
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('show');
  });
  document.getElementById('sidebarOverlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  });

  // List filter
  document.querySelectorAll('#statusFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#statusFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      listFilter = btn.dataset.filter;
      renderList();
    });
  });

  // List search
  document.getElementById('listSearch')?.addEventListener('input', e => { listSearch = e.target.value; renderList(); });

  // List sort
  document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      if (listSort.col === th.dataset.sort) listSort.asc = !listSort.asc;
      else { listSort.col = th.dataset.sort; listSort.asc = true; }
      renderList();
    });
  });

  // Calendar nav
  document.getElementById('calPrev')?.addEventListener('click', () => { calMonth--; if(calMonth<0){calMonth=11;calYear--;} renderCalendar(); });
  document.getElementById('calNext')?.addEventListener('click', () => { calMonth++; if(calMonth>11){calMonth=0;calYear++;} renderCalendar(); });

  // File drop zone
  initFileDropZone();

  // Works filter
  document.querySelectorAll('#worksTypeFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#worksTypeFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      worksFilter = btn.dataset.wfilter;
      renderWorks();
    });
  });
  document.getElementById('worksSearch')?.addEventListener('input', e => { worksSearch = e.target.value; renderWorks(); });

  // Sales Search
  document.getElementById('salesSearch')?.addEventListener('input', e => {
    salesSearch = e.target.value;
    renderSalesAttackAll();
  });

  // Sales Type Filter
  document.querySelectorAll('#salesTypeFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#salesTypeFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      salesFilter = btn.dataset.sfilter;
      renderSalesAttackAll();
    });
  });

  // Survey Search
  document.getElementById('surveySearch')?.addEventListener('input', e => {
    surveySearchQuery = e.target.value;
    renderSurveyList();
  });

  // Load data
  initStatsTabs();
  loadData();
});

// ===== GAS WebApp URL =====
// デプロイ後にここにURLを設定してください
const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwpOLKe0k8PoJEd6Hy1xTIQVLUB1CEVQGh7Ed_Fcixkby78qstwZP2DT7_Golf-6Ae8ig/exec';
const API_TOKEN = 'gate_dashboard_api_token_secret_2026';

function hasGasUrl() {
  return GAS_WEBAPP_URL && !GAS_WEBAPP_URL.includes('YOUR_GAS_WEBAPP_URL_ID_HERE');
}

function withToken(url) {
  return url + (url.includes('?') ? '&' : '?') + 'token=' + encodeURIComponent(API_TOKEN);
}

// ===== Modal =====
let selectedFile = null;
let selectedDriveFile = null; // Driveから選んだファイル
let driveFilesCache = [];

let editingId = null;

function openAddModal() {
  editingId = null;
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = '＋ 新規案件登録';
  document.getElementById('addForm').reset();
  clearFile();
  
  // オーディション日入力エリアのリセット
  const list = document.getElementById('auddateList');
  if (list) {
    list.innerHTML = '<div class="auddate-row"><input type="date" class="auddate-input"><button type="button" class="auddate-remove" onclick="removeAudDate(this)" title="削除">✕</button></div>';
  }
  
  selectedDriveFile = null;
  switchFileTab('upload');
  document.getElementById('addModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function openEditModal(id) {
  editingId = id;
  const item = allData.find(d => String(d.ID) === String(id));
  if (!item) {
    showToast('⚠️ 編集対象のデータが見つかりません');
    return;
  }
  
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = '✏️ 案件情報の編集';
  document.getElementById('addForm').reset();
  clearFile();
  selectedDriveFile = null;
  switchFileTab('upload');
  
  // 値をフォームに設定
  document.getElementById('f-type').value = item['案件種別'] || 'オーディション';
  document.getElementById('f-talent').value = item['タレント名'] || '';
  document.getElementById('f-name').value = item['オーディション名'] || '';
  document.getElementById('f-genre').value = item['ジャンル'] || '';
  
  const formatInputDate = (dateStr) => {
    const d = parseDate(dateStr);
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  
  document.getElementById('f-deadline').value = formatInputDate(item['締切日']);
  
  // オーディション日 (複数日程)
  const auddateList = document.getElementById('auddateList');
  if (auddateList) {
    auddateList.innerHTML = '';
    const audDateStr = item['オーディション日'] || '';
    const audDates = audDateStr.split(',').map(s => s.trim()).filter(v => v);
    if (audDates.length === 0) {
      addAudDate('');
    } else {
      audDates.forEach(dStr => {
        addAudDate(formatInputDate(dStr));
      });
    }
  }
  
  document.getElementById('f-result-date').value = formatInputDate(item['結果発表']);
  document.getElementById('f-release-date').value = formatInputDate(item['公開日']);
  document.getElementById('f-status').value = item['ステータス'] || '情報収集';
  document.getElementById('f-owner').value = item['対応者'] || 'マネージャー';
  document.getElementById('f-action').value = item['アクション'] || '';
  document.getElementById('f-notes').value = item['備考'] || '';
  
  document.getElementById('addModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('addForm').reset();
  clearFile();
  selectedDriveFile = null;
  driveFilesCache = [];
  switchFileTab('upload');
  editingId = null;
}

// ===== Drive File Picker =====
function switchFileTab(tab) {
  const tabUpload = document.getElementById('tabUpload');
  const tabDrive  = document.getElementById('tabDrive');
  const panelUpload = document.getElementById('panelUpload');
  const panelDrive  = document.getElementById('panelDrive');
  if (!tabUpload) return;
  tabUpload.classList.toggle('active', tab === 'upload');
  tabDrive.classList.toggle('active', tab === 'drive');
  panelUpload.style.display = tab === 'upload' ? '' : 'none';
  panelDrive.style.display  = tab === 'drive'  ? '' : 'none';
  if (tab === 'drive' && driveFilesCache.length === 0) loadDriveFiles();
}

async function loadDriveFiles() {
  const el = document.getElementById('driveFileList');
  if (!el) return;
  el.innerHTML = '<div class="drive-loading">📂 読み込み中...</div>';
  if (!hasGasUrl()) {
    el.innerHTML = '<div class="drive-loading">⚠️ GAS WebApp URLが未設定です</div>';
    return;
  }
  try {
    const json = await fetchWithTimeout(withToken(GAS_WEBAPP_URL + '?action=folder_files'), {}, 5000);
    if (json.success && json.files) {
      driveFilesCache = json.files;
      renderDriveFiles(json.files);
    } else {
      throw new Error(json.error || '取得失敗');
    }
  } catch(err) {
    el.innerHTML = `<div class="drive-loading">⚠️ 読み込みエラー: ${err.message}</div>`;
  }
}

function renderDriveFiles(files) {
  const el = document.getElementById('driveFileList');
  if (!files.length) {
    el.innerHTML = '<div class="drive-loading">📭 フォルダにファイルがありません</div>';
    return;
  }
  el.innerHTML = files.map(f => {
    const icon = f.mimeType?.includes('pdf') ? '📄'
      : f.mimeType?.includes('image') ? '🖼️'
      : f.mimeType?.includes('spreadsheet') ? '📊'
      : f.mimeType?.includes('document') ? '📝' : '📎';
    const date = new Date(f.modifiedDate).toLocaleDateString('ja-JP', {month:'numeric', day:'numeric'});
    const sel  = selectedDriveFile?.id === f.id;
    const safeName = f.name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `<div class="drive-file-item${sel ? ' selected' : ''}" onclick="selectDriveFile('${escapeHtml(f.id)}','${escapeHtml(safeName)}','${escapeHtml(f.url)}')">
      <span class="drive-file-icon">${icon}</span>
      <div class="drive-file-info">
        <div class="drive-file-name">${escapeHtml(f.name)}</div>
        <div class="drive-file-meta">${escapeHtml(date)} 更新</div>
      </div>
      ${sel ? '<span class="drive-file-check">✓ 選択中</span>' : ''}
    </div>`;
  }).join('');
}

function selectDriveFile(id, name, url) {
  selectedDriveFile = { id, name, url };
  renderDriveFiles(driveFilesCache);
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAddModal();
    closeSalesAddModal();
  }
});

// ===== File Drop Zone =====
function initFileDropZone() {
  const zone = document.getElementById('fileDropZone');
  const input = document.getElementById('f-file');
  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => {
    if (input.files.length) handleFileSelect(input.files[0]);
  });
}

function handleFileSelect(file) {
  if (file.size > 10 * 1024 * 1024) {
    showToast('⚠️ ファイルサイズは10MB以下にしてください');
    return;
  }
  selectedFile = file;
  const zone = document.getElementById('fileDropZone');
  const content = document.getElementById('fileDropContent');
  zone.classList.add('has-file');
  const sizeStr = file.size < 1024 ? file.size + 'B' : file.size < 1024*1024 ? Math.round(file.size/1024) + 'KB' : (file.size/1024/1024).toFixed(1) + 'MB';
  content.innerHTML = `<div class="file-selected"><span style="font-size:1.5rem">✅</span><div><div class="file-selected-name">${file.name}</div><div class="file-selected-size">${sizeStr}</div></div><button type="button" class="file-remove" onclick="event.stopPropagation();clearFile()">✕</button></div>`;
}

function clearFile() {
  selectedFile = null;
  const zone = document.getElementById('fileDropZone');
  const content = document.getElementById('fileDropContent');
  const input = document.getElementById('f-file');
  if (zone) zone.classList.remove('has-file');
  if (content) content.innerHTML = '<span class="file-drop-icon">📁</span><p>ファイルをドラッグ＆ドロップ<br>またはクリックして選択</p><span class="file-drop-hint">PDF, Word, Excel, 画像 対応</span>';
  if (input) input.value = '';
}

// ===== Form Submit =====
async function handleAddSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const text = document.getElementById('submitText');
  const spinner = document.getElementById('submitSpinner');
  btn.disabled = true;
  text.textContent = '送信中...';
  spinner.classList.remove('hidden');

  const deadlineRaw = document.getElementById('f-deadline').value;
  const deadline = deadlineRaw ? deadlineRaw.replace(/-/g, '/') : '';
  const audDates = [...document.querySelectorAll('.auddate-input')]
    .map(input => input.value)
    .filter(v => v)
    .map(v => v.replace(/-/g, '/'));
  const audDate = audDates.join(', ');

  const formData = {
    token: API_TOKEN,
    type: document.getElementById('f-type').value,
    talentName: document.getElementById('f-talent').value,
    auditionName: document.getElementById('f-name').value,
    genre: document.getElementById('f-genre').value,
    deadline: deadline,
    auditionDate: audDate,
    resultDate: (document.getElementById('f-result-date').value || '').replace(/-/g, '/'),
    releaseDate: (document.getElementById('f-release-date').value || '').replace(/-/g, '/'),
    status: document.getElementById('f-status').value,
    owner: document.getElementById('f-owner').value,
    action: document.getElementById('f-action').value,
    result: document.getElementById('f-status').value === '受注' ? '合格' : '未定',
    notes: document.getElementById('f-notes').value,
  };

  if (editingId) {
    formData.action = 'update';
    formData.id = editingId;
  }

  // Driveから選択したファイルを優先
  if (selectedDriveFile) {
    formData.fileUrl  = selectedDriveFile.url;
    formData.fileName = selectedDriveFile.name;
  } else if (selectedFile) {
    // ローカルファイルをBase64に変換
    try {
      formData.fileBase64  = await fileToBase64(selectedFile);
      formData.fileName    = selectedFile.name;
      formData.fileMimeType = selectedFile.type;
    } catch (err) {
      console.warn('ファイル読み込みエラー:', err);
    }
  }

  try {
    if (hasGasUrl()) {
      // GAS WebAppに送信
      const res = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        showToast(editingId ? '✅ スプレッドシートを更新しました！' : '✅ スプレッドシートに追加しました！');
        if (result.fileUrl) formData.fileUrl = result.fileUrl;
        if (result.id && !editingId) formData.id = result.id;
      } else {
        throw new Error(result.error || '送信失敗');
      }
    } else {
      // GAS未設定: ローカルデータに直接追加
      showToast(editingId ? '📝 ローカルデータを更新しました' : '📝 ローカルデータに追加しました（GAS WebApp URLを設定するとスプシ連携可能）');
    }

    // ローカルデータにも即時反映
    const today = new Date();
    const todayStr = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
    if (editingId) {
      const idx = allData.findIndex(d => String(d.ID) === String(editingId));
      if (idx !== -1) {
        const existing = allData[idx];
        allData[idx] = {
          ...existing,
          案件種別: formData.type || 'オーディション',
          タレント名: formData.talentName,
          オーディション名: formData.auditionName,
          ジャンル: formData.genre,
          締切日: formData.deadline,
          オーディション日: formData.auditionDate,
          結果発表: formData.resultDate,
          公開日: formData.releaseDate,
          ステータス: formData.status,
          対応者: formData.owner,
          アクション: formData.action,
          結果: formData.result,
          備考: formData.notes,
          更新日: todayStr,
          資料リンク: formData.fileUrl || existing['資料リンク'] || '',
        };
      }
    } else {
      allData.push({
        ID: String(formData.id || allData.length + 1),
        案件種別: formData.type || 'オーディション',
        タレント名: formData.talentName,
        オーディション名: formData.auditionName,
        ジャンル: formData.genre,
        締切日: formData.deadline,
        オーディション日: formData.auditionDate,
        結果発表: formData.resultDate,
        公開日: formData.releaseDate,
        ステータス: formData.status,
        対応者: formData.owner,
        アクション: formData.action,
        結果: formData.result,
        備考: formData.notes,
        登録日: todayStr,
        更新日: todayStr,
        資料リンク: formData.fileUrl || '',
      });
    }
    renderAll();
    closeAddModal();

  } catch (err) {
    console.error(err);
    showToast('❌ エラー: ' + err.message);
  } finally {
    btn.disabled = false;
    text.textContent = '追加する';
    spinner.classList.add('hidden');
  }
  return false;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ===== Toast =====
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ===== Multiple Audition Dates =====
function addAudDate(val = '') {
  const list = document.getElementById('auddateList');
  const row = document.createElement('div');
  row.className = 'auddate-row';
  row.innerHTML = `<input type="date" class="auddate-input" value="${val}"><button type="button" class="auddate-remove" onclick="removeAudDate(this)" title="削除">✕</button>`;
  list.appendChild(row);
}

function removeAudDate(btn) {
  const row = btn.closest('.auddate-row');
  const list = document.getElementById('auddateList');
  if (list.querySelectorAll('.auddate-row').length > 1) {
    row.remove();
  }
}

// ===== Works View =====
let worksFilter = 'all';
let worksSearch = '';

function renderWorks() {
  let data = getFiltered();

  // Type filter
  if (worksFilter !== 'all') {
    data = data.filter(d => (d['案件種別'] || 'オーディション') === worksFilter);
  }

  // Search
  if (worksSearch) {
    const q = worksSearch.toLowerCase();
    data = data.filter(d => d['オーディション名'].toLowerCase().includes(q) || (d['備考']||'').toLowerCase().includes(q));
  }

  // Sort: upcoming first
  data.sort((a, b) => {
    const da = daysUntil(a['締切日'] || a['オーディション日']);
    const db = daysUntil(b['締切日'] || b['オーディション日']);
    return da - db;
  });

  // Summary cards
  const summary = document.getElementById('worksSummary');
  const types = {};
  getFiltered().forEach(d => {
    const t = d['案件種別'] || 'オーディション';
    types[t] = (types[t] || 0) + 1;
  });
  summary.innerHTML = Object.entries(types).map(([t, c]) =>
    `<div class="works-type-badge" style="--type-color:${TYPE_COLORS[t] || '#888'}">${TYPE_ICONS[t] || '📋'} ${escapeHtml(t)} <strong>${c}</strong></div>`
  ).join('');

  // Table
  const el = document.getElementById('worksBody');
  el.innerHTML = data.map(d => {
    const type = d['案件種別'] || 'オーディション';
    const typeColor = TYPE_COLORS[type] || '#888';
    const sCls = d['ステータス']==='情報収集'?'status-info':d['ステータス']==='応募準備'?'status-prep':d['ステータス']==='書類結果待ち'?'status-sent':d['ステータス']==='2次以降AD'?'status-auditioned':d['ステータス']==='受注'?'status-order':'status-completed';
    const dateStr = d['オーディション日'] ? fmtDate(d['オーディション日']) : (d['締切日'] ? '〆'+fmtDate(d['締切日']) : '-');
    return `<tr>
      <td data-label="種別"><span class="type-badge" style="background:${typeColor}">${TYPE_ICONS[type]||''} ${escapeHtml(type)}</span></td>
      <td data-label="タレント"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span></td>
      <td data-label="案件名">${escapeHtml(d['オーディション名'])}</td>
      <td data-label="ジャンル">${GENRE_ICONS[d['ジャンル']]||''} ${escapeHtml(d['ジャンル'])}</td>
      <td data-label="日程">${escapeHtml(dateStr)}</td>
      <td data-label="ステータス"><span class="status-badge ${sCls}">${escapeHtml(d['ステータス'])}</span></td>
      <td data-label="対応者">${escapeHtml(d['対応者'])}</td>
      <td data-label="備考" style="font-size:.75rem;color:var(--text-muted)">${escapeHtml(d['備考'])||'-'}</td>
      <td data-label="操作"><button class="card-edit-btn" data-edit-id="${escapeHtml(d['ID'])}" title="編集" style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;">✏️</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📭</div><p>該当する案件はありません</p></div></td></tr>';
}

// ===== Stats Tabs Initialization =====
function initStatsTabs() {
  document.querySelectorAll('.stats-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stats-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.dataset.stab;
      document.querySelectorAll('.stats-tab-content').forEach(c => c.style.display = 'none');
      const targetContent = document.getElementById('stab-content-' + tabId);
      if (targetContent) {
        targetContent.style.display = '';
      }
      if (tabId === 'news') {
        renderNews();
      }
    });
  });
}

// ===== Render News =====
function renderNews() {
  const el = document.getElementById('statsNewsList');
  if (!el) return;
  
  let data = allNewsData || [];
  if (currentTalent !== 'all') {
    data = data.filter(n => n['タレント名'] === currentTalent);
  }
  
  if (!data.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>該当するニュースはありません</p></div>';
    return;
  }
  
  // 日付の降順（新しい順）でソート
  data.sort((a, b) => {
    const da = new Date(a['日付'] || 0);
    const db = new Date(b['日付'] || 0);
    return db - da;
  });
  
  el.innerHTML = data.map(n => {
    const tColor = talentColor(n['タレント名']);
    const titleClean = escapeHtml(n['タイトル'] || '');
    const linkUrl = n['リンク'] || '#';
    const media = n['メディア名'] || 'Google News';
    const dateStr = n['日付'] || '';
    return `<a href="${escapeHtml(linkUrl)}" target="_blank" class="news-card">
      <div class="news-card-meta">
        <div class="news-card-left">
          <span class="news-talent-tag" style="background:${tColor}">${escapeHtml(n['タレント名'])}</span>
          <span class="news-media-tag">${escapeHtml(media)}</span>
        </div>
        <span class="news-date">${escapeHtml(dateStr)}</span>
      </div>
      <div class="news-title">${titleClean}</div>
    </a>`;
  }).join('');
}

// ===== Sales Attack Render Functions =====
function getFilteredSalesAttack() {
  let data = allSalesAttackData || [];
  // タレントフィルター (提案タレントに指定のタレントが含まれるか)
  if (currentTalent !== 'all') {
    data = data.filter(d => (d['提案タレント'] || '').includes(currentTalent));
  }
  // 種別フィルター (制作会社, 代理店, キャスティング会社, クライアント直)
  if (salesFilter !== 'all') {
    data = data.filter(d => d['アプローチ先種別'] === salesFilter);
  }
  // 検索クエリ
  if (salesSearch) {
    const q = salesSearch.toLowerCase();
    data = data.filter(d => 
      (d['社名'] || '').toLowerCase().includes(q) ||
      (d['担当者名'] || '').toLowerCase().includes(q) ||
      (d['提案タレント'] || '').toLowerCase().includes(q) ||
      (d['備考/メモ'] || '').toLowerCase().includes(q)
    );
  }
  return data;
}

function renderSalesAttackAll() {
  renderSalesAttackToDo();
  renderSalesAttackKanban();
  renderSalesAttackList();
}

function renderSalesAttackToDo() {
  const el = document.getElementById('salesTodoList');
  const countEl = document.getElementById('salesActionCount');
  if (!el) return;
  
  const data = getFilteredSalesAttack().filter(d => d['次回アクション予定日']);
  
  // 日付昇順でソート
  data.sort((a, b) => {
    const da = parseDate(a['次回アクション予定日']) || new Date(8640000000000000);
    const db = parseDate(b['次回アクション予定日']) || new Date(8640000000000000);
    return da - db;
  });
  
  const activeToDo = data.slice(0, 6);
  if (countEl) countEl.textContent = data.length;
  
  if (!activeToDo.length) {
    el.innerHTML = '<div class="empty-state" style="padding:20px;grid-column:1/-1;"><p>📅 次回アクション予定のToDoはありません</p></div>';
    return;
  }
  
  el.innerHTML = activeToDo.map(d => {
    const rating = d['確度/感触'] || 'C';
    const ratingClass = `rating-${rating.toLowerCase()}`;
    const daysLeft = daysUntil(d['次回アクション予定日']);
    const urgent = daysLeft <= 3 ? 'style="color:var(--accent);font-weight:700;"' : '';
    const dateLabel = daysLeft === 0 ? '今日' : daysLeft < 0 ? '期限超過' : `${daysLeft}日後`;
    
    const talentBadge = d['提案タレント'] ? d['提案タレント'].split(',').map(t => `<span class="talent-badge-sm" style="background:${talentColor(t.trim())};margin-right:2px;">${escapeHtml(t.trim())}</span>`).join('') : '';
    
    return `<div class="sales-todo-card">
      <div class="sales-todo-header">
        <span class="sales-todo-company">${escapeHtml(d['社名'])}</span>
        <span class="sales-todo-date" ${urgent}>${fmtDate(d['次回アクション予定日'])} (${dateLabel})</span>
      </div>
      <div class="sales-todo-action">👉 ${escapeHtml(d['次回アクション内容'] || 'アクション未定')}</div>
      <div class="sales-todo-meta">
        <span class="sales-rating-badge ${ratingClass}">確度: ${escapeHtml(rating)}</span>
        ${talentBadge}
        <span style="margin-left:auto;">担当: ${escapeHtml(d['担当者名'] || '-')}</span>
      </div>
    </div>`;
  }).join('');
}

function renderSalesAttackKanban() {
  const data = [...getFilteredSalesAttack()];
  
  // 最終アプローチ日の降順でソート（日付が空の場合は末尾へ）
  data.sort((a, b) => {
    const da = parseDate(a['最終アプローチ日']);
    const db = parseDate(b['最終アプローチ日']);
    if (da && db) return db - da;
    if (da) return -1;
    if (db) return 1;
    return 0;
  });

  const buckets = {
    '未アプローチ': [],
    'コンタクト中': [],
    '面談済': [],
    '案件検討中': [],
    'WS講師依頼済': [],
    '受注・決定': [],
    '休眠': []
  };
  
  data.forEach(d => {
    const status = d['アタックステータス'] || '未アプローチ';
    if (buckets[status]) {
      buckets[status].push(d);
    } else {
      buckets['未アプローチ'].push(d);
    }
  });
  
  const keyMap = {
    '未アプローチ': 'unapproached',
    'コンタクト中': 'contact',
    '面談済': 'interviewed',
    '案件検討中': 'reviewing',
    'WS講師依頼済': 'ws-requested',
    '受注・決定': 'ordered',
    '休眠': 'dormant'
  };
  
  Object.entries(buckets).forEach(([status, list]) => {
    const key = keyMap[status];
    const container = document.getElementById(`scards-${key}`);
    const countEl = document.getElementById(`scount-${key}`);
    if (!container) return;
    
    container.innerHTML = list.map(d => {
      const rating = d['確度/感触'] || 'C';
      const ratingClass = `rating-${rating.toLowerCase()}`;
      const method = d['アプローチ方法'] ? ` <span style="font-size:.65rem;color:var(--text-muted)">(${escapeHtml(d['アプローチ方法'])})</span>` : '';
      const talentBadge = d['提案タレント'] ? d['提案タレント'].split(',').map(t => `<span class="talent-badge-sm" style="background:${talentColor(t.trim())};margin-top:4px;display:inline-block;margin-right:2px;">${escapeHtml(t.trim())}</span>`).join('') : '';
      
      // 備考に含まれる画像リンクの抽出
      let imageLink = '';
      const rawNotes = d['備考/メモ'] || '';
      const imgMatch = rawNotes.match(/(https:\/\/drive\.google\.com\/[^\s]+)/);
      if (imgMatch) {
        const safeUrl = encodeURI(imgMatch[0]);
        imageLink = `<div style="margin-top:6px;"><a href="${safeUrl}" target="_blank" style="font-size:.65rem;color:var(--accent);text-decoration:none;">🖼️ 名刺画像</a></div>`;
      }
      
      return `<div class="sales-kanban-card">
        <span class="sales-kanban-card-badge">${escapeHtml(d['アプローチ先種別'])}</span>
        <div class="sales-kanban-card-title">${escapeHtml(d['社名'])}</div>
        <div class="sales-kanban-card-meta">
          <span class="sales-rating-badge ${ratingClass}">確度: ${escapeHtml(rating)}</span>
          ${method}
          <div>担当: ${escapeHtml(d['担当者名'] || '-')}</div>
          ${d['最終アプローチ日'] ? `<div>最終: ${fmtDate(d['最終アプローチ日'])}</div>` : ''}
        </div>
        <div style="margin-top:4px;">${talentBadge}</div>
        ${d['次回アクション内容'] ? `<div class="sales-kanban-card-desc">📌 ToDo: ${escapeHtml(d['次回アクション内容'])}</div>` : ''}
        ${imageLink}
      </div>`;
    }).join('') || '<div style="text-align:center;color:var(--text-muted);font-size:.75rem;padding:20px">なし</div>';
    
    if (countEl) countEl.textContent = list.length;
  });
}

function renderSalesAttackList() {
  const el = document.getElementById('salesBody');
  if (!el) return;
  const data = [...getFilteredSalesAttack()];
  
  // 最終アプローチ日の降順でソート（日付が空の場合は末尾へ）
  data.sort((a, b) => {
    const da = parseDate(a['最終アプローチ日']);
    const db = parseDate(b['最終アプローチ日']);
    if (da && db) return db - da;
    if (da) return -1;
    if (db) return 1;
    return 0;
  });
  
  el.innerHTML = data.map(d => {
    const rating = d['確度/感触'] || '-';
    const ratingClass = rating !== '-' ? `rating-${rating.toLowerCase()}` : '';
    const dateStr = d['最終アプローチ日'] ? fmtDate(d['最終アプローチ日']) : '-';
    const nextDateStr = d['次回アクション予定日'] ? fmtDate(d['次回アクション予定日']) : '-';
    const nextAction = d['次回アクション内容'] ? `<div>${nextDateStr}: ${escapeHtml(d['次回アクション内容'])}</div>` : '-';
    
    // 備考の画像リンク対応
    let notesText = escapeHtml(d['備考/メモ'] || '-');
    const rawNotes = d['備考/メモ'] || '';
    const imgMatch = rawNotes.match(/(https:\/\/drive\.google\.com\/[^\s]+)/);
    if (imgMatch) {
      const safeUrl = encodeURI(imgMatch[0]);
      notesText = notesText.replace(escapeHtml(imgMatch[0]), `<a href="${safeUrl}" target="_blank" rel="noopener">リンク</a>`);
    }
    
    return `<tr>
      <td data-label="社名" style="font-weight:700;">${escapeHtml(d['社名'])}</td>
      <td data-label="種別"><span class="type-badge" style="background:#6B7280">${escapeHtml(d['アプローチ先種別'])}</span></td>
      <td data-label="担当者">${escapeHtml(d['担当者名'] || '-')}</td>
      <td data-label="連絡先" style="font-size:.75rem;">${escapeHtml(d['連絡先'] || '-')}</td>
      <td data-label="最終アプローチ">${dateStr}</td>
      <td data-label="方法">${escapeHtml(d['アプローチ方法'] || '-')}</td>
      <td data-label="提案タレント">${d['提案タレント'] ? d['提案タレント'].split(',').map(t => `<span class="talent-badge-sm" style="background:${talentColor(t.trim())};margin-right:2px;">${escapeHtml(t.trim())}</span>`).join('') : '-'}</td>
      <td data-label="確度">${rating !== '-' ? `<span class="sales-rating-badge ${ratingClass}">${escapeHtml(rating)}</span>` : '-'}</td>
      <td data-label="ステータス"><span class="status-badge status-prep">${escapeHtml(d['アタックステータス'])}</span></td>
      <td data-label="次回ToDo" style="font-size:.75rem;">${nextAction}</td>
      <td data-label="備考" style="font-size:.75rem;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(d['備考/メモ'])}">${notesText}</td>
      <td data-label="アクション">
        <button class="btn btn-secondary btn-sm" onclick="openBriefingModal('${escapeHtml(d['ID'] || d['id'] || d['Row'])}')">
          ブリーフィング
        </button>
      </td>
    </tr>`;
  }).join('') || '<tr><td colspan="12"><div class="empty-state"><div class="empty-icon">📭</div><p>営業アタックデータはありません</p></div></td></tr>';
}

// ===== Sales Attack Modal Functions =====
function openSalesAddModal() {
  document.getElementById('salesAddModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSalesAddModal() {
  document.getElementById('salesAddModal').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('salesAddForm').reset();
}

async function handleSalesAddSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('salesSubmitBtn');
  const text = document.getElementById('salesSubmitText');
  const spinner = document.getElementById('salesSubmitSpinner');
  btn.disabled = true;
  text.textContent = '送信中...';
  spinner.classList.remove('hidden');
  
  const lastApproachDateRaw = document.getElementById('sf-lastApproachDate').value;
  const lastApproachDate = lastApproachDateRaw ? lastApproachDateRaw.replace(/-/g, '/') : '';
  
  const nextApproachDateRaw = document.getElementById('sf-nextApproachDate').value;
  const nextApproachDate = nextApproachDateRaw ? nextApproachDateRaw.replace(/-/g, '/') : '';
  
  const formData = {
    sheetType: 'sales_attack',
    companyName: document.getElementById('sf-companyName').value,
    companyType: document.getElementById('sf-companyType').value,
    contactName: document.getElementById('sf-contactName').value,
    contactInfo: document.getElementById('sf-contactInfo').value,
    lastApproachDate: lastApproachDate,
    approachMethod: document.getElementById('sf-approachMethod').value,
    nextApproachDate: nextApproachDate,
    nextApproachAction: document.getElementById('sf-nextApproachAction').value,
    status: document.getElementById('sf-status').value,
    rating: document.getElementById('sf-rating').value,
    talentName: document.getElementById('sf-talentName').value,
    notes: document.getElementById('sf-notes').value,
    token: API_TOKEN
  };
  
  try {
    if (hasGasUrl()) {
      const res = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        showToast('✅ 営業アタックを追加しました！');
      } else {
        throw new Error(result.error || '送信失敗');
      }
    } else {
      showToast('📝 ローカルデータに追加しました');
    }
    
    // ローカルデータ反映
    const today = new Date();
    const todayStr = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
    allSalesAttackData.push({
      ID: String(allSalesAttackData.length + 1),
      社名: formData.companyName,
      アプローチ先種別: formData.companyType,
      担当者名: formData.contactName,
      連絡先: formData.contactInfo,
      最終アプローチ日: formData.lastApproachDate,
      アプローチ方法: formData.approachMethod,
      次回アクション予定日: formData.nextApproachDate,
      次回アクション内容: formData.nextApproachAction,
      アタックステータス: formData.status,
      提案タレント: formData.talentName,
      '確度/感触': formData.rating,
      '備考/メモ': formData.notes,
      登録日: todayStr,
      更新日: todayStr
    });
    
    renderSalesAttackAll();
    closeSalesAddModal();
  } catch (err) {
    console.error(err);
    showToast('❌ エラー: ' + err.message);
  } finally {
    btn.disabled = false;
    text.textContent = '追加する';
    spinner.classList.add('hidden');
  }
  return false;
}

// ===== Survey (タレントアンケート) =====
// タレント名の正規化マップ（苗字のみをフルネームに統一）
function normalizeTalentFullName(name) {
  if (!name) return '';
  const s = String(name).trim().replace(/\s+/g, '');
  const map = {
    '島田': '島田和奏',
    '島田和奏': '島田和奏',
    '小久保': '小久保宏紀',
    '小久保宏紀': '小久保宏紀',
    '谷口': '谷口彩菜',
    '谷口彩菜': '谷口彩菜',
    '太田': '太田陽菜',
    '太田陽菜': '太田陽菜',
    '寺崎': '寺崎ひな',
    '寺崎ひな': '寺崎ひな',
    '中塚': '中塚智',
    '中塚智': '中塚智',
    '相馬': '相馬寿樹',
    '相馬寿樹': '相馬寿樹'
  };
  return map[s] || s;
}

async function loadSurveyData() {
  const container = document.getElementById('surveyList');
  if (!container) return;
  container.innerHTML = '<div class="news-loading">📊 アンケート回答を読み込み中...</div>';
  
  if (!hasGasUrl()) {
    container.innerHTML = '<div class="news-loading">⚠️ GAS WebApp URL が設定されていません。</div>';
    return;
  }
  
  try {
    const res = await fetch(withToken(`${GAS_WEBAPP_URL}?action=survey`));
    const json = await res.json();
    if (json.success && json.data) {
      // タレント名を正規化し、同一タレントは最新の1件（フルネーム）にマージ
      const map = new Map();
      json.data.forEach(item => {
        const canonicalName = normalizeTalentFullName(item.talentName);
        item.talentName = canonicalName;
        // 既存のものがある場合は、IDが大きい（最新）または更新日が新しい方を優先
        if (!map.has(canonicalName) || Number(item.id) > Number(map.get(canonicalName).id)) {
          map.set(canonicalName, item);
        }
      });
      surveyDataCache = Array.from(map.values());
      renderSurveyList();
    } else {
      throw new Error(json.error || 'データ取得失敗');
    }
  } catch (err) {
    console.error("Failed to load survey data:", err);
    container.innerHTML = `<div class="news-loading">⚠️ 読み込みエラー: ${err.message}</div>`;
  }
}

function renderSurveyList() {
  const container = document.getElementById('surveyList');
  if (!container || currentSection !== 'survey') return;
  
  let data = surveyDataCache;
  if (surveySearchQuery) {
    const q = surveySearchQuery.toLowerCase();
    data = data.filter(d => d.talentName.toLowerCase().includes(q));
  }
  
  if (currentTalent !== 'all') {
    data = data.filter(d => d.talentName === currentTalent || d.talentName.includes(currentTalent) || currentTalent.includes(d.talentName));
  }
  
  if (!data.length) {
    container.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:.9rem;padding:40px;grid-column:1/-1">📭 回答データはありません</div>';
    return;
  }
  
  container.innerHTML = data.map(d => {
    let raw = {};
    try {
      if (d.rawData) raw = JSON.parse(d.rawData);
    } catch (e) {}
    const hometown = raw.faqHometown || '';
    const skills = raw.faqSkills || '';

    return `<div class="survey-card" onclick="openSurveyDetail('${escapeHtml(d.id)}')" style="cursor:pointer; background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; transition: all var(--transition); box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
      <div class="survey-card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border); padding-bottom:8px;">
        <span class="talent-badge-sm" style="background:${talentColor(d.talentName)}">${escapeHtml(d.talentName)}</span>
        <span class="survey-card-date" style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(d.updateDate)} 更新</span>
      </div>
      <div class="survey-card-body" style="font-size:0.8rem; display:flex; flex-direction:column; gap:6px; color:var(--text-secondary);">
        <div class="survey-card-item">
          <strong>🎬 映画:</strong> <span>${escapeHtml(d.bibleMovie) || '-'}</span>
        </div>
        <div class="survey-card-item">
          <strong>📺 ドラマ:</strong> <span>${escapeHtml(d.bibleDrama) || '-'}</span>
        </div>
        <div class="survey-card-item">
          <strong>🌟 最近の作品:</strong> <span>${escapeHtml(d.recentTitle) || '-'}</span>
        </div>
        <div class="survey-card-item">
          <strong>👥 目標俳優:</strong> <span>${escapeHtml(d.targetActor) || '-'}</span>
        </div>
        <div class="survey-card-item">
          <strong>🏅 特技:</strong> <span>${escapeHtml(skills) || '-'}</span>
        </div>
        <div class="survey-card-item">
          <strong>📍 出身:</strong> <span>${escapeHtml(hometown) || '-'}</span>
        </div>
      </div>
      <div class="survey-card-footer" style="margin-top:14px;">
        <button class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center; font-size:0.75rem; padding:4px 8px;">
          <span>詳細・印刷プレビュー</span>
        </button>
      </div>
    </div>`;
  }).join('');
}

function openSurveyDetail(id) {
  const item = surveyDataCache.find(d => String(d.id) === String(id));
  if (!item) return;
  
  let raw = {};
  try {
    raw = JSON.parse(item.rawData);
  } catch (e) {
    console.error("Failed to parse raw survey data:", e);
  }
  
  activeSurveyData = { ...item, raw };
  
  const content = document.getElementById('surveyDetailContent');
  if (!content) return;
  
  content.innerHTML = renderSurveyDetailHTML(item.talentName, item.updateDate, raw);
  
  document.getElementById('surveyDetailModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSurveyDetailModal() {
  document.getElementById('surveyDetailModal').classList.remove('show');
  document.body.style.overflow = '';
  activeSurveyData = null;
}

function printSurveyDetail() {
  if (!activeSurveyData) return;
  window.print();
}

function renderSurveyDetailHTML(talentName, updateDate, raw) {
  const movieAspectMap = { words: 'セリフ・言葉の紡ぎ方', visual: '映像美・色彩・アングル', sound: '音楽・音響効果', acting: '役者の佇まい・肉体表現', story: '緻密なストーリー構成', atmosphere: '全体の空気感・余白 of 美' };
  const dramaAspectMap = { words: 'テンポ感のある会話・セリフ', characters: 'キャラクターの愛らしさ・人間味', social: '社会的なテーマや切り込み方', ensemble: 'アンサンブル（役者陣の掛け合い）', music: '劇伴（音楽）や主題歌の連動' };
  const recentAspectMap = { acting: '同世代や特定の役者の演技への衝撃', directing: '演出手法やカメラワークの面白さ', script: '脚本の巧みさやメッセージ性', empathy: '役柄への深い共感や自己投影', jealousy: '「自分もこの場に立ちたかった」という嫉忑' };
  const actorAspectMap = { presence: '圧倒的な佇まい・そこにいるだけで存在感', eyes: '目の動きや「沈黙・余白」を使った内面表現', versatile: '作品によって別人になるカメレオン演技', natural: '作り物感のない、生々しくリアルな生活感', comedy: '間の取り方やユーモアのある芝居', voice: '声のトーンや発話のテンポ' };
  const roleMap = { villain: '静かな狂気を秘めた悪役・トリックスター', lonely: '影のある孤独な主人公・アウトサイダー', moodmaker: 'コメディや会話を牽引するムードメーカー', daily: '日常を描く作品の等身大な人物', elite: '知的で冷徹なエリート・専門職', passionate: '真っ直ぐで不器用な, 熱量のある熱血漢' };
  
  const movieAspects = (raw.bibleMovieAspects || []).map(k => escapeHtml(movieAspectMap[k] || k)).join(', ');
  const dramaAspects = (raw.bibleDramaAspects || []).map(k => escapeHtml(dramaAspectMap[k] || k)).join(', ');
  const recentAspects = (raw.recentAspects || []).map(k => escapeHtml(recentAspectMap[k] || k)).join(', ');
  const actorAspects = (raw.actorAspects || []).map(k => escapeHtml(actorAspectMap[k] || k)).join(', ');
  const desiredRoles = (raw.desiredRoles || []).map(k => escapeHtml(roleMap[k] || k)).join(', ');
  
  const recentMediaMap = { movie: '映画', drama: 'ドラマ', stage: '舞台', anime: 'アニメ', other: 'その他' };
  const recentMedia = escapeHtml(recentMediaMap[raw.recentMedia] || raw.recentMedia || '-');

  return `
    <div style="padding: 0 20px;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--accent); padding-bottom: 12px; margin-bottom: 25px;">
        <div>
          <h2 style="font-family: var(--font); font-size: 1.4rem; font-weight: 900; color: var(--accent); line-height: 1.1; margin:0 0 4px 0; letter-spacing: 2px;">ACTOR'S ROOT</h2>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; letter-spacing: 1px;">俳優ルーツ・ヒアリングシート</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Actor Name</span>
          <h3 style="font-size: 1.3rem; margin: 2px 0 0 0; color: var(--text); font-weight: 800;">${escapeHtml(talentName)}</h3>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${escapeHtml(updateDate)} 送信</span>
        </div>
      </div>
      
      <!-- Section 1 -->
      <div class="preview-section" style="margin-bottom:28px; border-left:3px solid var(--accent); padding-left:15px">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">01. 私のバイブル（人生の土台となった作品）</h4>
        
        <div style="margin-bottom: 18px;">
          <h5 style="font-weight: 800; font-size: 0.88rem; color: var(--accent); margin-bottom:6px">🎬 映画部門: ${escapeHtml(raw.bibleMovie) || '-'}</h5>
          <div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>惹かれる要素:</strong> ${movieAspects || '-'}</div>
          ${raw.bibleMovieAspectsOther ? `<div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>その他要素:</strong> ${escapeHtml(raw.bibleMovieAspectsOther)}</div>` : ''}
          <div style="font-size:0.85rem; white-space: pre-wrap; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(raw.bibleMovieComment) || '（未記入）'}</div>
        </div>
        
        <div>
          <h5 style="font-weight: 800; font-size: 0.88rem; color: var(--accent); margin-bottom:6px">📺 ドラマ部門: ${escapeHtml(raw.bibleDrama) || '-'}</h5>
          <div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>惹かれる要素:</strong> ${dramaAspects || '-'}</div>
          ${raw.bibleDramaAspectsOther ? `<div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>その他要素:</strong> ${escapeHtml(raw.bibleDramaAspectsOther)}</div>` : ''}
          <div style="font-size:0.85rem; white-space: pre-wrap; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(raw.bibleDramaComment) || '（未記入）'}</div>
        </div>
      </div>
      
      <!-- Section 2 -->
      <div class="preview-section" style="margin-bottom:28px; border-left:3px solid var(--accent); padding-left:15px">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">02. 最近観て、心が動いた作品</h4>
        <h5 style="font-weight: 800; font-size: 0.88rem; color: var(--accent); margin-bottom:6px">作品名: ${escapeHtml(raw.recentTitle) || '-'} （ジャンル: ${recentMedia}）</h5>
        <div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>動かされた点:</strong> ${recentAspects || '-'}</div>
        <div style="font-size:0.85rem; white-space: pre-wrap; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(raw.recentComment) || '（未記入）'}</div>
      </div>
      
      <!-- Section 3 -->
      <div class="preview-section" style="margin-bottom:28px; border-left:3px solid var(--accent); padding-left:15px">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">03. 目標とする・影響を受けた俳優</h4>
        <h5 style="font-weight: 800; font-size: 0.88rem; color: var(--accent); margin-bottom:6px">俳優名: ${escapeHtml(raw.targetActor) || '-'}</h5>
        <div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>惹かれる要素:</strong> ${actorAspects || '-'}</div>
        <div style="font-size:0.85rem; white-space: pre-wrap; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(raw.actorComment) || '（未記入）'}</div>
      </div>
      
      <!-- Section 4 -->
      <div class="preview-section" style="margin-bottom:28px; border-left:3px solid var(--accent); padding-left:15px">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">04. 今、最も演じてみたい役柄・世界観</h4>
        <div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>キャラクターの方向性:</strong> ${desiredRoles || '-'}</div>
        ${raw.desiredRolesOther ? `<div style="font-size:0.75rem; color: var(--text-secondary); margin-bottom:6px"><strong>その他役柄:</strong> ${escapeHtml(raw.desiredRolesOther)}</div>` : ''}
        <div style="font-size:0.85rem; white-space: pre-wrap; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(raw.desiredComment) || '（未記入）'}</div>
      </div>
      
      <!-- Section 5 -->
      <div class="preview-section" style="margin-bottom:28px; border-left:3px solid var(--accent); padding-left:15px">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">05. 私を構成する3つの「偏愛」</h4>
        <div class="love-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 14px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px; text-transform: uppercase; letter-spacing: 0.5px;">偏愛 1</div>
            <div style="font-weight:800; font-size:0.9rem; margin-bottom:8px; color:var(--text);">${escapeHtml(raw.love1) || '-'}</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); white-space:pre-wrap; line-height:1.4">${escapeHtml(raw.love1Desc) || ''}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 14px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px; text-transform: uppercase; letter-spacing: 0.5px;">偏愛 2</div>
            <div style="font-weight:800; font-size:0.9rem; margin-bottom:8px; color:var(--text);">${escapeHtml(raw.love2) || '-'}</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); white-space:pre-wrap; line-height:1.4">${escapeHtml(raw.love2Desc) || ''}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 14px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px; text-transform: uppercase; letter-spacing: 0.5px;">偏愛 3</div>
            <div style="font-weight:800; font-size:0.9rem; margin-bottom:8px; color:var(--text);">${escapeHtml(raw.love3) || '-'}</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); white-space:pre-wrap; line-height:1.4">${escapeHtml(raw.love3Desc) || ''}</div>
          </div>
        </div>
      </div>

      <!-- Section 6 -->
      <div class="preview-section" style="border-left:3px solid var(--accent); padding-left:15px; page-break-inside: avoid;">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">06. 面談・同行でよく聞かれる質問（FAQ）</h4>
        <div class="faq-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-location-dot"></i> 出身地・地元トーク</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqHometown) || '（未記入）'}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-medal"></i> 特技・スポーツ・資格</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqSkills) || '（未記入）'}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-fire"></i> 最近ハマっていること</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqRecentHobby) || '（未記入）'}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-utensils"></i> 好きな食べ物・お店</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqFood) || '（未記入）'}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-sun"></i> 休日の過ごし方</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqHoliday) || '（未記入）'}</div>
          </div>
          <div style="background: var(--bg-alt); border: 1.5px solid var(--border); padding: 12px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-handshake"></i> 共演してみたい人・出たい作品</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqDreamWork) || '（未記入）'}</div>
          </div>
        </div>
        <div style="margin-top: 15px; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 14px; border-radius: 6px;">
          <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px;"><i class="fa-solid fa-comment-dots"></i> 自己紹介の鉄板ネタ（30秒版）</div>
          <div style="font-size:0.85rem; color:var(--text); white-space: pre-wrap; line-height: 1.5;">${escapeHtml(raw.faqIntro) || '（未記入）'}</div>
        </div>
        <div class="no-print-ng" style="margin-top: 15px; background: rgba(226,0,15,0.03); border: 1.5px dashed var(--accent); padding: 14px; border-radius: 6px;">
          <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px;"><i class="fa-solid fa-ban"></i> NG話題・触れてほしくないこと（社内共有のみ・印刷時非表示）</div>
          <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(raw.faqNgTopics) || '（特になし）'}</div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// 営業同行用ブリーフィング機能
// ============================================================
let activeBriefingData = null;

function openBriefingModal(salesId) {
  const salesItem = allSalesAttackData.find(d => String(d.ID || d.id || d.Row) === String(salesId));
  if (!salesItem) {
    alert("営業データが見つかりません。");
    return;
  }

  // 提案タレントをパースする（カンマまたはスペース区切り）
  const talentsStr = salesItem['提案タレント'] || '';
  const talentNames = talentsStr.split(/[,，\s]+/).map(t => t.trim()).filter(t => t);

  // マージ用のタレント回答データ（FAQ）を集約
  const matchedSurveys = [];
  talentNames.forEach(tName => {
    const survey = surveyDataCache.find(s => s.talentName === tName);
    if (survey) {
      try {
        const raw = JSON.parse(survey.rawData);
        matchedSurveys.push({
          talentName: tName,
          updateDate: survey.updateDate,
          faq: raw
        });
      } catch (e) {
        console.error("Failed to parse rawData for " + tName, e);
      }
    }
  });

  activeBriefingData = {
    sales: salesItem,
    surveys: matchedSurveys
  };

  renderBriefingHTML();
  document.getElementById('briefingModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeBriefingModal() {
  document.getElementById('briefingModal').classList.remove('show');
  document.body.style.overflow = '';
  activeBriefingData = null;
}

function printBriefing() {
  if (!activeBriefingData) return;
  window.print();
}

function renderBriefingHTML() {
  const { sales, surveys } = activeBriefingData;
  const contentEl = document.getElementById('briefingContent');
  if (!contentEl) return;

  // 営業情報のHTML組み立て
  let salesInfoHTML = `
    <div class="preview-section" style="margin-bottom:28px; border-left:3px solid var(--accent); padding-left:15px">
      <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 12px; letter-spacing: 0.5px;">📋 案件同行情報</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; font-size: 0.85rem; color: var(--text-secondary);">
        <div><strong>企業名/制作会社:</strong> ${escapeHtml(sales['社名'] || '-')} (${escapeHtml(sales['アプローチ先種別'] || '-')})</div>
        <div><strong>アタック担当マネージャー:</strong> ${escapeHtml(sales['担当者名'] || '-')}</div>
        <div><strong>次回ToDo:</strong> ${escapeHtml(sales['次回アクション予定日'] ? fmtDate(sales['次回アクション予定日']) + ': ' : '')}${escapeHtml(sales['次回アクション内容'] || '-')}</div>
        <div><strong>提案タレント:</strong> ${sales['提案タレント'] ? sales['提案タレント'].split(',').map(t => `<span class="talent-badge-sm" style="background:${talentColor(t.trim())};margin-right:2px;">${escapeHtml(t.trim())}</span>`).join('') : '-'}</div>
        <div><strong>アプローチ方法/媒体:</strong> ${escapeHtml(sales['アプローチ方法'] || '-')}</div>
        <div><strong>進捗状況/ステータス:</strong> <span class="status-badge status-prep">${escapeHtml(sales['アタックステータス'] || '-')}</span></div>
      </div>
      <div style="margin-top: 15px; background: var(--bg-alt); border: 1.5px solid var(--border); padding: 14px; border-radius: 6px; font-size: 0.85rem;">
        <div style="font-weight: 800; color: var(--accent); margin-bottom: 6px;">📌 案件メモ・進捗詳細</div>
        <div style="white-space: pre-wrap; line-height: 1.5; color: var(--text-secondary);">${escapeHtml(sales['備考/メモ'] || '（未記入）')}</div>
      </div>
    </div>
  `;

  // タレントプロファイル（FAQ）のHTML組み立て
  let talentSurveysHTML = '';
  if (surveys.length === 0) {
    talentSurveysHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 0.9rem; border: 1.5px dashed var(--border); border-radius: 6px;">
        ⚠️ 提案タレントのルーツヒアリングシート回答が登録されていません。
      </div>
    `;
  } else {
    talentSurveysHTML = surveys.map(({ talentName, updateDate, faq }) => {
      return `
        <div style="margin-bottom: 35px; border: 1.5px solid var(--border); border-radius: 8px; padding: 20px; background: var(--card-bg); page-break-inside: avoid;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid ${talentColor(talentName)}; padding-bottom:10px; margin-bottom:15px;">
            <h3 style="font-size:1.1rem; font-weight:800; color: var(--text); display:flex; align-items:center; gap:8px;">
              <span class="talent-badge" style="background:${talentColor(talentName)}; color:white; padding:4px 10px; border-radius:4px; font-size:0.9rem;">${escapeHtml(talentName)}</span>
              <span>の想定質問・FAQプロファイル</span>
            </h3>
            <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(updateDate)} 更新</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-bottom: 15px;">
            <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
              <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-location-dot"></i> 出身地・地元トーク</div>
              <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqHometown) || '（未記入）'}</div>
            </div>
            <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
              <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-medal"></i> 特技・スポーツ・資格</div>
              <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqSkills) || '（未記入）'}</div>
            </div>
            <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
              <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-fire"></i> 最近ハマっていること</div>
              <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqRecentHobby) || '（未記入）'}</div>
            </div>
            <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
              <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-utensils"></i> 好きな食べ物・お店</div>
              <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqFood) || '（未記入）'}</div>
            </div>
            <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
              <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-sun"></i> 休日の過ごし方</div>
              <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqHoliday) || '（未記入）'}</div>
            </div>
            <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
              <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:4px;"><i class="fa-solid fa-handshake"></i> 共演してみたい人・出たい作品</div>
              <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqDreamWork) || '（未記入）'}</div>
            </div>
          </div>
          <div style="background: var(--bg-alt); border: 1px solid var(--border); padding: 14px; border-radius: 6px; margin-bottom: 15px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px;"><i class="fa-solid fa-comment-dots"></i> 自己紹介の鉄板ネタ（30秒版）</div>
            <div style="font-size:0.85rem; color:var(--text); white-space: pre-wrap; line-height: 1.5;">${escapeHtml(faq.faqIntro) || '（未記入）'}</div>
          </div>
          <div class="no-print-ng" style="background: rgba(226,0,15,0.02); border: 1.5px dashed var(--accent); padding: 14px; border-radius: 6px;">
            <div style="font-weight:800; font-size:0.75rem; color:var(--accent); margin-bottom:6px;"><i class="fa-solid fa-ban"></i> NG話題・触れてほしくないこと（社内共有のみ・印刷時非表示）</div>
            <div style="font-size:0.85rem; color:var(--text);">${escapeHtml(faq.faqNgTopics) || '（特になし）'}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  contentEl.innerHTML = `
    <div style="padding: 0 20px;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 5px 0; color:var(--text);">営業同行ブリーフィング資料</h2>
        <span style="font-size: 0.75rem; color: var(--text-muted);">案件情報 ✕ タレント想定問答 FAQ</span>
      </div>
      ${salesInfoHTML}
      <div style="margin-top: 20px;">
        <h4 style="font-size: 1.05rem; color: var(--text); font-weight: 800; margin-bottom: 15px; border-bottom: 2px solid var(--accent); padding-bottom: 6px;">
          👥 同行キャストプロフィール
        </h4>
        ${talentSurveysHTML}
      </div>
    </div>
  `;
}

