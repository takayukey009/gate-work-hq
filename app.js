// ===== GATE Audition Dashboard =====
const SHEET_ID = '1NBZce4Xqx7FgbXujQlaO15xd-nAZvUmAqBVGRBgIaGU';
const MANAGED_TALENTS = ['谷口彩菜','寺崎ひな','島田和奏','中塚智','太田陽菜','相馬寿樹','実倉萌笑'];
const RETIRED_TALENTS = ['小久保宏紀', '吉富千桜'];
const TALENT_COLORS = {
  '谷口彩菜':'#E60012','寺崎ひな':'#3B82F6',
  '島田和奏':'#F59E0B','中塚智':'#10B981','太田陽菜':'#EC4899','相馬寿樹':'#06B6D4','実倉萌笑':'#14B8A6'
};
const TALENT_ICONS = {
  '谷口彩菜':'🌸','寺崎ひな':'⭐',
  '島田和奏':'🌟','中塚智':'🎬','太田陽菜':'🌻','相馬寿樹':'🕺','実倉萌笑':'🌷'
};
const TALENT_CALENDAR_IDS = {
  '谷口彩菜': 'ayana.taniguchi@gate-agency.com',
  '島田和奏': 'wakana.shimada@gate-agency.com',
  '中塚智': 'satoshi.nakatsuka@gate-agency.com',
  '太田陽菜': 'hina.ota@gate-agency.com',
  '寺崎ひな': 'hina.terasaki@gate-agency.com',
  '相馬寿樹': 'toshiki.soma@gate-agency.com',
  '実倉萌笑': 'moe.mikura@gate-agency.com'
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
  },
  '実倉萌笑': {
    name: '実倉萌笑',
    furigana: 'みくら もえ',
    age: 26,
    photosFolder: 'https://drive.google.com/drive/folders/1BZbhN4LKQlf0hvJrcNamAPmjwf49I2nD',
    reels: [],
    mainReel: '',
    competitor: 'なし',
    _note: '2026年追加'
  },
  '_soma_legacy': {
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
let kanbanSearch = '';
let kanbanGenre = 'all';
let kanbanStagnantOnly = false;
let stagnantFilter = 'all';
let stagnantCollapsed = false;
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
  const text = await fetchWithTimeout(url, {}, 15000, 'text');
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

const FALLBACK_DATA = [];

function filterActiveTalentsData(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.filter(d => {
    const t = (d['タレント名'] || '').trim();
    return !RETIRED_TALENTS.includes(t) && t !== '小久保';
  });
}

async function loadData() {
  try {
    const rawData = await fetchSheetData('シート1');
    allData = filterActiveTalentsData(rawData);
  } catch (e) {
    console.warn('スプレッドシート読み込み失敗:', e.message);
    allData = FALLBACK_DATA;
  }

  try {
    allSalesAttackData = await fetchSheetData('営業アタック');
  } catch (salesErr) {
    console.warn('営業アタックデータの読み込みに失敗しました:', salesErr.message);
    allSalesAttackData = [];
  }

  try {
    if (hasGasUrl()) {
      const json = await fetchWithTimeout(withToken(GAS_WEBAPP_URL + '?action=news'), {}, 8000);
      if (json.success && json.data) {
        allNewsData = json.data;
      } else {
        allNewsData = [];
      }
    } else {
      allNewsData = [];
    }
  } catch (newsErr) {
    console.warn('ニュースデータの読み込みに失敗しました:', newsErr.message);
    allNewsData = [];
  }

  try {
    renderAll();
  } catch (renderErr) {
    console.error('描画中にエラーが発生しました:', renderErr);
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
    const json = await fetchWithTimeout(url, { redirect: 'follow', mode: 'cors' }, 25000);
    if (json.success && json.events) {
      calendarEvents = json.events;
      console.log(`カレンダー: ${calendarEvents.length}件取得`);
      if (currentSection === 'calendar') renderCalendar();
      renderRecent(); // カレンダーデータ取得後にRECENTも再描画
      renderWeeklyReport();
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
  if (s instanceof Date) {
    return isNaN(s.getTime()) ? null : s;
  }
  // Handle serial dates from Google Sheets (e.g. 46157.0)
  if (typeof s === 'number' || (!isNaN(s) && !isNaN(parseFloat(s)) && String(s).trim().match(/^\d+(\.\d+)?$/))) {
    const serial = parseFloat(s);
    if (serial > 20000 && serial < 100000) {
      return new Date((serial - 25569) * 86400000);
    }
  }
  const str = String(s).trim();
  if (!str) return null;
  // Handle "Date(2026,4,20)" format from Google Sheets
  const dm = str.match(/Date\((\d+),(\d+),(\d+)\)/);
  if (dm) return new Date(+dm[1], +dm[2], +dm[3]);
  // Handle date range like "2026/11/10〜11/12" or "2026/11/10(火)"
  const firstPart = str.split(/[〜~]/)[0].replace(/\([日月火水木金土]\)/g, '').trim();
  const d = new Date(firstPart);
  return isNaN(d.getTime()) ? null : d;
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

// ===== 停滞案件・放置案件の自動検知ロジック =====
function getStagnantInfo(d) {
  const status = (d['ステータス'] || '').trim();
  const result = (d['結果'] || '').trim();

  // 完了・合格・不合格・見送り・辞退済みの案件は対象外
  if (status === '完了' || status === '受注' || result === '合格' || result.startsWith('不合格') || result.startsWith('辞退') || result.startsWith('見送り')) {
    return null;
  }

  const now = new Date();
  const deadlineStr = d['締切日'];
  const duDeadline = deadlineStr ? daysUntil(deadlineStr) : Infinity;

  // 1. 🚨 締切超過（critical）: 「応募準備」または「情報収集」で締切日を過ぎている
  if (['応募準備', '情報収集'].includes(status) && duDeadline < 0) {
    const daysOver = Math.abs(duDeadline);
    return {
      type: 'deadline',
      severity: 'critical',
      badgeText: `🚨 締切超過 (+${daysOver}日)`,
      badgeClass: 'badge-stagnant-critical',
      cardClass: 'stagnant-critical',
      title: '締切日を過ぎています',
      message: `締切日（${fmtDate(deadlineStr)}）を ${daysOver}日 超過しています。応募済みなら「書類結果待ち」、見送りや終了なら「完了」へ更新してください。`,
      daysOver: daysOver
    };
  }

  // 2. ⏳ 結果待ち停滞（warning）: 「書類結果待ち」または「結果待ち」
  if (['書類結果待ち', '結果待ち'].includes(status)) {
    const resDateStr = d['結果発表日'] || d['結果発表'] || d['オーディション日'];
    const duRes = resDateStr ? daysUntil(resDateStr) : Infinity;

    if (resDateStr && duRes < 0) {
      const daysOver = Math.abs(duRes);
      return {
        type: 'result',
        severity: 'warning',
        badgeText: `⏳ 結果待ち停滞 (+${daysOver}日)`,
        badgeClass: 'badge-stagnant-warning',
        cardClass: 'stagnant-warning',
        title: '結果発表予定日を経過',
        message: `発表予定日（${fmtDate(resDateStr)}）から ${daysOver}日 経過。選考結果を確認し、次審査または不合格（完了）へ更新してください。`,
        daysOver: daysOver
      };
    }

    let baseDate = null;
    if (deadlineStr && duDeadline <= -14) {
      baseDate = parseDate(deadlineStr);
    } else if (d['登録日']) {
      baseDate = parseDate(d['登録日']);
    } else if (d['更新日']) {
      baseDate = parseDate(d['更新日']);
    }

    if (baseDate) {
      const elapsedDays = Math.floor((now - baseDate) / 86400000);
      if (elapsedDays >= 14) {
        return {
          type: 'result',
          severity: 'warning',
          badgeText: `⏳ 結果待ち長期 (${elapsedDays}日経過)`,
          badgeClass: 'badge-stagnant-warning',
          cardClass: 'stagnant-warning',
          title: '結果待ちのまま14日以上経過',
          message: `${fmtDate(baseDate)} から ${elapsedDays}日 が経過しています。結果の確認・更新を推奨します。`,
          daysOver: elapsedDays
        };
      }
    } else if (deadlineStr && duDeadline < 0) {
      const daysOver = Math.abs(duDeadline);
      if (daysOver >= 7) {
        return {
          type: 'result',
          severity: 'warning',
          badgeText: `⏳ 結果待ち (${daysOver}日)`,
          badgeClass: 'badge-stagnant-warning',
          cardClass: 'stagnant-warning',
          title: '締切から7日以上結果未定',
          message: `締切から ${daysOver}日 が経過しています。進捗状況を確認してください。`,
          daysOver: daysOver
        };
      }
    }
  }

  // 3. 💤 情報収集停滞（stale）: 「情報収集」のまま14日以上進展なし
  if (status === '情報収集') {
    const regDateStr = d['登録日'] || d['更新日'];
    const regDate = regDateStr ? parseDate(regDateStr) : null;
    if (regDate) {
      const elapsedDays = Math.floor((now - regDate) / 86400000);
      if (elapsedDays >= 14) {
        return {
          type: 'info',
          severity: 'stale',
          badgeText: `💤 情報収集停滞 (${elapsedDays}日)`,
          badgeClass: 'badge-stagnant-stale',
          cardClass: 'stagnant-stale',
          title: '情報収集のまま14日以上進展なし',
          message: `登録日（${fmtDate(regDateStr)}）から ${elapsedDays}日 が経過しています。応募準備へ移行するか見送り（完了）へ整理してください。`,
          daysOver: elapsedDays
        };
      }
    }
  }

  return null;
}

// ===== Render All =====
function renderAll() {
  renderTalentFilter();
  renderTalentKitBar();
  renderStats();
  renderStagnantAlertPanel();
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
  renderWeeklyReport();
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

// ===== 停滞・要確認アラートパネル制御 =====
function renderStagnantAlertPanel() {
  const panel = document.getElementById('stagnantAlertPanel');
  if (!panel) return;

  const data = getFiltered();
  const allStagnant = [];
  data.forEach(d => {
    const stag = getStagnantInfo(d);
    if (stag) {
      allStagnant.push({ item: d, stag: stag });
    }
  });

  const countEl = document.getElementById('stagnantCount');
  const summaryEl = document.getElementById('stagnantSummary');
  const listEl = document.getElementById('stagnantList');

  if (allStagnant.length === 0) {
    panel.classList.add('hidden');
    if (countEl) countEl.textContent = '0';
    if (listEl) listEl.innerHTML = '';
    return;
  }

  panel.classList.remove('hidden');
  if (countEl) countEl.textContent = allStagnant.length;

  // 内訳の集計
  const deadlineCount = allStagnant.filter(x => x.stag.type === 'deadline').length;
  const resultCount = allStagnant.filter(x => x.stag.type === 'result').length;
  const infoCount = allStagnant.filter(x => x.stag.type === 'info').length;

  if (summaryEl) {
    const parts = [];
    if (deadlineCount > 0) parts.push(`🚨 締切超過: ${deadlineCount}件`);
    if (resultCount > 0) parts.push(`⏳ 結果待ち: ${resultCount}件`);
    if (infoCount > 0) parts.push(`💤 情報収集: ${infoCount}件`);
    summaryEl.textContent = `(${parts.join(' / ')})`;
  }

  // フィルター pills の active 状態を反映
  const pills = document.querySelectorAll('.stagnant-pill');
  pills.forEach(pill => {
    if (pill.dataset.stagnantFilter === stagnantFilter) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
    if (!pill.dataset.bound) {
      pill.dataset.bound = 'true';
      pill.addEventListener('click', () => {
        stagnantFilter = pill.dataset.stagnantFilter;
        renderStagnantAlertPanel();
      });
    }
  });

  // リスト開閉ボタンの初期化・状態反映
  const toggleBtn = document.getElementById('btnToggleStagnant');
  if (toggleBtn) {
    toggleBtn.textContent = stagnantCollapsed ? '▲' : '▼';
    if (!toggleBtn.dataset.bound) {
      toggleBtn.dataset.bound = 'true';
      toggleBtn.addEventListener('click', () => {
        stagnantCollapsed = !stagnantCollapsed;
        toggleBtn.textContent = stagnantCollapsed ? '▲' : '▼';
        if (listEl) {
          if (stagnantCollapsed) listEl.classList.add('collapsed');
          else listEl.classList.remove('collapsed');
        }
      });
    }
  }
  if (listEl) {
    if (stagnantCollapsed) listEl.classList.add('collapsed');
    else listEl.classList.remove('collapsed');
  }

  // フィルターによる絞り込み
  let displayList = allStagnant;
  if (stagnantFilter !== 'all') {
    displayList = allStagnant.filter(x => x.stag.type === stagnantFilter);
  }

  // 重要度順（critical -> warning -> stale）、超過日数降順でソート
  displayList.sort((a, b) => {
    const score = { critical: 3, warning: 2, stale: 1 };
    const diff = (score[b.stag.severity] || 0) - (score[a.stag.severity] || 0);
    if (diff !== 0) return diff;
    return (b.stag.daysOver || 0) - (a.stag.daysOver || 0);
  });

  if (listEl) {
    if (displayList.length === 0) {
      listEl.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:16px; color:var(--text-secondary); font-size:0.8rem;">この条件に該当する停滞案件はありません</div>';
    } else {
      listEl.innerHTML = displayList.map(({ item: d, stag }) => {
        const id = escapeHtml(d['ID']);
        const talent = escapeHtml(d['タレント名']);
        const title = escapeHtml(d['オーディション名']);
        const status = escapeHtml(d['ステータス']);

        return `<div class="stagnant-item severity-${stag.severity}">
          <div class="stagnant-item-top">
            <div class="stagnant-tag-group">
              <span class="action-talent-badge" style="background:${talentColor(d['タレント名'])}">${talent}</span>
              <span class="badge-stagnant ${stag.badgeClass}">${stag.badgeText}</span>
            </div>
            <span style="font-size:0.7rem; color:var(--text-muted);">現: <strong>${status}</strong></span>
          </div>
          <div class="stagnant-item-title">${title}</div>
          <div class="stagnant-item-msg">${escapeHtml(stag.message)}</div>
          <div class="stagnant-item-actions">
            <button class="btn-stagnant-act btn-stagnant-fail" onclick="quickUpdateStatus('${id}', '完了', '不合格')" title="不合格・見送りとして完了ステータスへ移動">❌ 不合格終了</button>
            <button class="btn-stagnant-act btn-stagnant-next" onclick="quickUpdateStatus('${id}', '2次以降AD', '未定')" title="2次選考進出へステータス更新">✅ 2次選考進出</button>
            <button class="btn-stagnant-act btn-stagnant-edit" onclick="openEditModal('${id}')" title="詳細編集モーダルを開く">✏️ 編集</button>
          </div>
        </div>`;
      }).join('');
    }
  }
}

// ===== Stats =====
function renderStats() {
  const data = getFiltered();
  const active = data.filter(d => d['ステータス'] !== '完了');
  const deadlineSoon = data.filter(d => { const du = daysUntil(d['締切日']); return du >= 0 && du <= 7; });
  const passed = data.filter(d => d['結果'] === '合格');
  const managerAction = data.filter(d => ['応募準備','書類結果待ち','2次以降AD','結果待ち'].includes(d['ステータス']) && !(d['結果'] || '').startsWith('不合格'));
  const stagnantCount = data.filter(d => getStagnantInfo(d) !== null).length;
  document.getElementById('statsGrid').innerHTML = [
    statCard('📋', active.length, '進行中', ''),
    statCard('⏰', deadlineSoon.length, '今週の締切', ''),
    statCard('⚡', managerAction.length, '対応待ち', 'urgent'),
    statCard('⚠️', stagnantCount, '停滞・要確認', stagnantCount > 0 ? 'urgent' : '')
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
  let data = getFiltered();
  
  // 停滞中のみフィルター
  if (kanbanStagnantOnly) {
    data = data.filter(d => getStagnantInfo(d) !== null);
  }

  // ジャンルフィルター
  if (kanbanGenre !== 'all') {
    data = data.filter(d => (d['ジャンル'] || '').includes(kanbanGenre));
  }

  // 検索フィルター
  if (kanbanSearch) {
    const q = kanbanSearch.toLowerCase();
    data = data.filter(d => 
      (d['オーディション名'] || '').toLowerCase().includes(q) ||
      (d['タレント名'] || '').toLowerCase().includes(q) ||
      (d['備考'] || '').toLowerCase().includes(q) ||
      (d['アクション'] || '').toLowerCase().includes(q)
    );
  }

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
  
  const statusMap = {
    info: '情報収集',
    prep: '応募準備',
    sent: '書類結果待ち',
    done: '2次以降AD',
    wait: '結果待ち',
    order: '受注',
    complete: '完了'
  };

  Object.keys(buckets).forEach(k => {
    const container = document.getElementById('cards-'+k);
    const countEl = document.getElementById('count-'+k);
    const column = container?.closest('.kanban-column');
    if (!container) return;
    
    container.innerHTML = buckets[k].map(d => kanbanCard(d)).join('') || '<div style="text-align:center;color:var(--text-muted);font-size:.75rem;padding:30px 10px;border:1.5px dashed var(--border);border-radius:var(--radius);margin-top:4px">ここにドロップ</div>';
    if (countEl) countEl.textContent = buckets[k].length;

    // カラムへのドラッグ＆ドロップイベント設定
    if (column && !column.dataset.dndInit) {
      column.dataset.dndInit = 'true';
      column.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        column.classList.add('drag-over');
      });
      column.addEventListener('dragleave', e => {
        if (!column.contains(e.relatedTarget)) {
          column.classList.remove('drag-over');
        }
      });
      column.addEventListener('drop', async e => {
        e.preventDefault();
        column.classList.remove('drag-over');
        const cardId = e.dataTransfer.getData('text/plain');
        if (!cardId) return;
        const targetStatus = statusMap[k] || column.dataset.status;
        await handleKanbanDrop(cardId, targetStatus);
      });
    }
  });

  // カードへのドラッグイベント設定
  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.kanban-column').forEach(c => c.classList.remove('drag-over'));
    });
  });
}

// カンバンカードのドラッグ＆ドロップ時のステータス更新処理
async function handleKanbanDrop(id, newStatus) {
  const item = allData.find(d => String(d.ID) === String(id));
  if (!item) return;
  if (item['ステータス'] === newStatus) return;

  const oldStatus = item['ステータス'];
  item['ステータス'] = newStatus;
  
  // 受注にドロップした場合は結果を「合格」に
  if (newStatus === '受注') {
    item['結果'] = '合格';
  }

  renderKanban();
  renderStats();
  renderActionPanel();
  showToast(`⚡ 「${item['オーディション名']}」を【${newStatus}】へ移動しました`);

  // GAS WebApp API へ安全に上書き保存 (Upsert)
  if (hasGasUrl()) {
    try {
      const payload = {
        token: API_TOKEN,
        action: 'update',
        id: String(item.ID),
        talentName: item['タレント名'],
        type: item['案件種別'] || 'オーディション',
        auditionName: item['オーディション名'],
        genre: item['ジャンル'],
        deadline: item['締切日'],
        auditionDate: item['オーディション日'],
        status: newStatus,
        owner: item['対応者'] || 'マネージャー',
        action: item['アクション'] || '',
        result: item['結果'] || '未定',
        notes: item['備考'] || '',
        fileUrl: item['資料リンク'] || ''
      };
      const res = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!json.success) {
        console.warn('Kanban update warning:', json.error);
      }
    } catch (err) {
      console.warn('Kanban API update error:', err);
    }
  }
}

function kanbanCard(d) {
  const resultCls = d['結果']==='合格'?'result-pass':(d['結果']||'').startsWith('不合格')?'result-fail':d['結果']==='結果待ち'?'result-waiting':'';
  const fileLink = d['資料リンク'] ? `<a href="${escapeHtml(d['資料リンク'])}" target="_blank" class="card-action-btn" title="資料を開く">📎 資料</a>` : '';
  const typeVal = d['案件種別'] || 'オーディション';
  const typeColor = TYPE_COLORS[typeVal] || '#6B7280';
  const typeIcon = TYPE_ICONS[typeVal] || '📋';
  const typeBadge = `<span style="display:inline-block;font-size:.62rem;font-weight:800;color:#fff;background:${typeColor};padding:2px 7px;border-radius:4px">${typeIcon} ${escapeHtml(typeVal)}</span>`;

  // 停滞情報チェック
  const stag = getStagnantInfo(d);
  const stagnantCardCls = stag ? stag.cardClass : '';
  const stagnantBadge = stag ? `<span class="badge-stagnant ${stag.badgeClass}" style="margin-left:auto;">${stag.badgeText}</span>` : '';

  // 締切カウントダウンバッジ
  let deadlineBadge = '';
  if (d['締切日']) {
    const du = daysUntil(d['締切日']);
    if (du === 0) {
      deadlineBadge = `<span class="badge-deadline-urgent">🔥 本日締切!</span>`;
    } else if (du === 1) {
      deadlineBadge = `<span class="badge-deadline-urgent">⏰ 明日締切</span>`;
    } else if (du > 1 && du <= 3) {
      deadlineBadge = `<span class="badge-deadline-soon">⏳ あと${du}日</span>`;
    } else if (du > 3) {
      deadlineBadge = `<span style="font-size:.7rem;color:var(--text-muted)">〆 ${fmtDate(d['締切日'])}</span>`;
    }
  }

  // クイック終了ボタン（停滞中の場合、カード上からも即終了可能に）
  const quickFailBtn = stag ? `<button class="card-action-btn btn-quick-fail" onclick="quickUpdateStatus('${escapeHtml(d['ID'])}', '完了', '不合格'); event.stopPropagation();" title="不合格終了として完了へ">❌ 終了</button>` : '';

  return `<div class="kanban-card ${stagnantCardCls}" draggable="true" data-id="${escapeHtml(d['ID'])}" style="${typeVal !== 'オーディション' && !stag ? 'border-left:4px solid '+typeColor : ''}">
    <div class="kanban-card-top">
      ${typeBadge}
      <span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span>
      ${stagnantBadge}
    </div>
    <div class="kanban-card-title">${escapeHtml(d['オーディション名'])}</div>
    <div class="kanban-card-meta">
      ${deadlineBadge}
      <span class="kanban-card-genre">${GENRE_ICONS[d['ジャンル']]||'📋'} ${escapeHtml(d['ジャンル'])}</span>
      ${d['対応者']==='マネージャー'?'<span style="color:var(--accent);font-weight:700">●MGR</span>':''}
      ${resultCls?`<span class="kanban-card-result ${resultCls}">${escapeHtml(d['結果'])}</span>`:''}
    </div>
    ${stag ? `<div class="stagnant-item-msg" style="margin-top:6px;">${escapeHtml(stag.message)}</div>` : ''}
    ${d['アクション']?`<div style="font-size:.72rem;color:var(--text-secondary);background:var(--bg-alt);padding:4px 8px;border-radius:4px;margin-top:6px">👉 ${escapeHtml(d['アクション'])}</div>`:''}
    <div class="kanban-card-actions">
      ${quickFailBtn}
      ${fileLink}
      <button class="card-action-btn card-edit-btn" data-edit-id="${escapeHtml(d['ID'])}" title="編集">✏️ 編集</button>
    </div>
  </div>`;
}

function toggleKanbanStagnantFilter() {
  kanbanStagnantOnly = !kanbanStagnantOnly;
  const btn = document.getElementById('btnKanbanStagnantOnly');
  if (btn) {
    if (kanbanStagnantOnly) btn.classList.add('active');
    else btn.classList.remove('active');
  }
  renderKanban();
}

// ===== Quick Status Update =====
async function quickUpdateStatus(id, newStatus, newResult) {
  const item = allData.find(d => String(d.ID) === String(id));
  if (!item) return;

  if (newStatus) item['ステータス'] = newStatus;
  if (newResult !== undefined) item['結果'] = newResult;

  renderAll();
  const resMsg = newResult ? `（結果: ${newResult}）` : '';
  showToast(`⚡ 「${item['オーディション名']}」を【${item['ステータス']}】${resMsg}に更新しました`);

  if (hasGasUrl()) {
    try {
      const payload = {
        token: API_TOKEN,
        action: 'update',
        id: String(item.ID),
        talentName: item['タレント名'],
        type: item['案件種別'] || 'オーディション',
        auditionName: item['オーディション名'],
        genre: item['ジャンル'],
        deadline: item['締切日'],
        auditionDate: item['オーディション日'],
        status: item['ステータス'],
        owner: item['対応者'] || 'マネージャー',
        action: item['アクション'] || '',
        result: item['結果'] || '未定',
        notes: item['備考'] || '',
        fileUrl: item['資料リンク'] || ''
      };
      await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Quick status update error:', err);
    }
  }
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
    const rCls = d['結果']==='合格'?'result-pass':(d['結果']||'').startsWith('不合格')?'result-fail':d['結果']==='結果待ち'?'result-waiting':'';
    const ownerCls = d['対応者']==='マネージャー'?'owner-manager':'';
    const fileLink = d['資料リンク'] ? `<a href="${escapeHtml(d['資料リンク'])}" target="_blank" style="font-size:.7rem;color:var(--accent)">📎</a>` : '';
    
    // インラインステータスセレクト
    const statusOpts = STATUS_ORDER.map(st => `<option value="${escapeHtml(st)}"${d['ステータス']===st?' selected':''}>${escapeHtml(st)}</option>`).join('');
    const statusSelect = `<select class="inline-status-select" onchange="quickUpdateStatus('${escapeHtml(d['ID'])}', this.value)">${statusOpts}</select>`;

    return `<tr>
      <td data-label="タレント"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span></td>
      <td data-label="案件名">${escapeHtml(d['オーディション名'])} ${fileLink}</td>
      <td data-label="ジャンル">${GENRE_ICONS[d['ジャンル']]||''} ${escapeHtml(d['ジャンル'])}</td>
      <td data-label="締切">${fmtDate(d['締切日'])}</td>
      <td data-label="ステータス">${statusSelect}</td>
      <td data-label="対応者" class="${ownerCls}">${escapeHtml(d['対応者'])}</td>
      <td data-label="結果">${rCls?`<span class="kanban-card-result ${rCls}">${escapeHtml(d['結果'])}</span>`:escapeHtml(d['結果'])||'-'}</td>
      <td data-label="アクション" style="font-size:.75rem;color:var(--text-muted)">${escapeHtml(d['アクション'])||'-'}</td>
      <td data-label="操作">
        <div class="quick-action-btns">
          <button class="btn-quick-pass" onclick="quickUpdateStatus('${escapeHtml(d['ID'])}', '受注', '合格')" title="合格・受注">受</button>
          <button class="btn-quick-fail" onclick="quickUpdateStatus('${escapeHtml(d['ID'])}', '完了', '不合格')" title="不合格・終了">落</button>
          <button class="card-edit-btn" data-edit-id="${escapeHtml(d['ID'])}" title="編集" style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;">✏️</button>
        </div>
      </td>
    </tr>`;
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
    const json = await fetchWithTimeout(withToken(`${GAS_WEBAPP_URL}?action=calendar&start=${start}&end=${end}`), {}, 25000);
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
  const titles = {dashboard:'ダッシュボード',weekly_report:'週次報告（ハイライト）',kanban:'カンバン',works:'仕事一覧',list:'リスト（AD）',calendar:'カレンダー',stats:'統計',sales_attack:'営業アタック',survey:'ルーツシート',mission:'ミッション管理'};
  document.getElementById('pageTitle').textContent = titles[section] || section;
  if (section === 'weekly_report') {
    renderWeeklyReport();
  }
  if (section === 'sales_attack') {
    renderSalesAttackAll();
  }
  if (section === 'survey') {
    loadSurveyData();
  }
  if (section === 'mission') {
    loadMissionData();
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
    const validSections = ['dashboard', 'weekly_report', 'kanban', 'works', 'list', 'calendar', 'stats', 'sales_attack', 'survey', 'mission'];
    if (validSections.includes(section)) {
      showSection(section);
    }
  });

  // 初回ロード時のルーティング
  const initSection = location.hash.replace('#', '') || 'dashboard';
  const validSections = ['dashboard', 'weekly_report', 'kanban', 'works', 'list', 'calendar', 'stats', 'sales_attack', 'survey', 'mission'];
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

  // Kanban search & genre filter
  document.getElementById('kanbanSearch')?.addEventListener('input', e => {
    kanbanSearch = e.target.value;
    renderKanban();
  });
  document.querySelectorAll('#kanbanGenreFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#kanbanGenreFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      kanbanGenre = btn.dataset.kgraph;
      renderKanban();
    });
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
  renderWeeklyReport();
  });

  // Mission Nav & Controls
  document.getElementById('missionPrev')?.addEventListener('click', () => {
    missionWeekOffset--;
    loadMissionData();
  });
  document.getElementById('missionNext')?.addEventListener('click', () => {
    missionWeekOffset++;
    loadMissionData();
  });
  document.getElementById('missionMeetingMode')?.addEventListener('change', () => {
    renderMissionView();
  });
  document.getElementById('missionPeople')?.addEventListener('click', e => {
    const dotBtn = e.target.closest('.mission-dots button');
    if (dotBtn) {
      const p = +dotBtn.dataset.p;
      const m = +dotBtn.dataset.m;
      const i = +dotBtn.dataset.i;
      handleMissionDotClick(p, m, i);
      return;
    }
    const targetSaveBtn = e.target.closest('.mission-unset-box button');
    if (targetSaveBtn) {
      const mId = targetSaveBtn.dataset.mid;
      const input = targetSaveBtn.parentElement.querySelector('input');
      if (mId && input) {
        handleMissionTargetSubmit(mId, input.value);
      }
    }
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

// ===== Smart Paste & Parse =====
function toggleSmartPaste() {
  const body = document.getElementById('smartPasteBody');
  const btn = document.getElementById('toggleSmartBtn');
  if (!body) return;
  const isHidden = body.classList.toggle('hidden');
  if (btn) btn.textContent = isHidden ? '＋ 開く' : '✕ 閉じる';
}

function clearSmartPaste() {
  const input = document.getElementById('smartPasteInput');
  if (input) input.value = '';
}

function parseAuditionText(raw) {
  if (!raw || typeof raw !== 'string') return {};
  const text = raw.trim();
  const res = {};

  // 1. タレント名推定
  const talentMap = {
    '谷口': '谷口彩菜', '彩菜': '谷口彩菜',
    '島田': '島田和奏', '和奏': '島田和奏',
    '中塚': '中塚智', '智': '中塚智',
    '太田': '太田陽菜', '陽菜': '太田陽菜',
    '寺崎': '寺崎ひな', 'ひな': '寺崎ひな',
    '相馬': '相馬寿樹', '寿樹': '相馬寿樹',
    '実倉': '実倉萌笑', '萌笑': '実倉萌笑',
    '吉富': '吉富千桜', '千桜': '吉富千桜'
  };
  for (const [key, name] of Object.entries(talentMap)) {
    if (text.includes(key)) {
      res.talentName = name;
      break;
    }
  }

  // 2. 案件種別推定
  if (/オファー|指名|直接打診/i.test(text)) res.type = 'オファー';
  else if (/レギュラー/i.test(text)) res.type = 'レギュラー';
  else if (/イベント|舞台|登壇/i.test(text)) res.type = 'イベント';
  else if (/撮影のみ|スチール撮影/i.test(text)) res.type = '撮影';
  else res.type = 'オーディション';

  // 3. ジャンル推定
  if (/映画/i.test(text)) res.genre = '映画';
  else if (/ショートドラマ|縦型/i.test(text)) res.genre = 'ショートドラマ';
  else if (/ドラマ|連続ドラマ|連ドラ/i.test(text)) res.genre = 'ドラマ';
  else if (/舞台|ミュージカル/i.test(text)) res.genre = '舞台';
  else if (/CM|TVCM|コマーシャル/i.test(text)) res.genre = 'CM';
  else if (/WEB広告|バナー|LP|広告/i.test(text)) res.genre = '広告';
  else if (/MV|ミュージックビデオ/i.test(text)) res.genre = 'MV';
  else if (/バラエティ/i.test(text)) res.genre = 'バラエティ';
  else if (/Web|配信/i.test(text)) res.genre = 'Web';

  // 4. 案件名推定
  const titleMatch = text.match(/(?:件名|表題|作品名|企画名|案件名|タイトル)[：:\s]+([^\n\r]{4,50})/i);
  const contentMatch = text.match(/(?:内容|概要)[：:\s\n\r]+([^\n\r]{4,60})/i);
  const recruitMatch = text.match(/([^\n\r]{4,40}(?:キャスト募集|出演者募集|モデル募集|オーディション))/i);
  const bracketMatch = text.match(/[【『「]([^】』」\n]{4,50})[】』」]/);

  if (titleMatch && titleMatch[1]) {
    res.auditionName = titleMatch[1].trim();
  } else if (bracketMatch && bracketMatch[1]) {
    res.auditionName = bracketMatch[1].trim();
  } else if (recruitMatch && recruitMatch[1]) {
    res.auditionName = recruitMatch[1].trim().replace(/^[▼■●◆・\s]+/, '');
  } else if (contentMatch && contentMatch[1]) {
    let clean = contentMatch[1].trim().replace(/にて.*$/, '').replace(/^[▼■●◆・\s]+/, '');
    res.auditionName = clean;
  }

  // 5. 締切日推定
  const deadlineMatch = text.match(/(?:締切|締め切り|〆切|〆|エントリー期限|回答期限|返答期限|提出期限|提出期日|期限)[：:\s]*([0-9]{4}[\/\-\.年])?([0-9]{1,2})[\/\-\.月]([0-9]{1,2})日?/i)
    || text.match(/([0-9]{1,2})[\/\-\.月]([0-9]{1,2})日?\s*(?:\([日月火水木金土]\))?\s*(?:1[0-9]|2[0-3]|[0-9]):[0-5][0-9]\s*(?:締切|〆切|〆|期限)/i);
  if (deadlineMatch) {
    const year = deadlineMatch[1] ? deadlineMatch[1].replace(/[年\/\-\.]/g, '') : new Date().getFullYear();
    const month = String(deadlineMatch[2]).padStart(2, '0');
    const day = String(deadlineMatch[3]).padStart(2, '0');
    res.deadline = `${year}-${month}-${day}`;
  }

  // 6. オーディション日推定
  const audDates = [];
  const y = new Date().getFullYear();

  // レンジ表記: 10/19〜10/23
  const audRangeMatch = text.match(/(?:オーディション日|オーディション|AD日|選考日)[^0-9\n]*([0-9]{1,2})[\/\.月]([0-9]{1,2})(?:日)?\s*[~〜\-]\s*([0-9]{1,2})[\/\.月]?([0-9]{1,2})日?/i);
  if (audRangeMatch) {
    const m1 = parseInt(audRangeMatch[1], 10);
    const d1 = parseInt(audRangeMatch[2], 10);
    const m2 = audRangeMatch[3] && !audRangeMatch[4] ? m1 : parseInt(audRangeMatch[3] || m1, 10);
    const d2 = parseInt(audRangeMatch[4] || audRangeMatch[3], 10);
    for (let d = d1; d <= d2 && d <= d1 + 7; d++) {
      audDates.push(`${y}-${String(m1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    }
  } else {
    // 縦並びまたはセクション内の日付
    const audSecMatch = text.match(/(?:オーディション日|オーディション|AD日|選考日|面談日)[\s\S]{1,200}?(?=(?:▼|【|■|撮影|本番|〆切|締切|期限|回答|返答|$))/i);
    const targetText = audSecMatch ? audSecMatch[0] : text;
    const dateRegex = /(?:1[0-2]|0?[1-9])[\/\.月](?:[12][0-9]|3[01]|0?[1-9])日?/g;
    let m;
    while ((m = dateRegex.exec(targetText)) !== null) {
      const parts = m[0].match(/([0-9]{1,2})[\/\.月]([0-9]{1,2})/);
      if (parts) {
        const formatted = `${y}-${String(parts[1]).padStart(2, '0')}-${String(parts[2]).padStart(2, '0')}`;
        if (!audDates.includes(formatted)) {
          audDates.push(formatted);
        }
      }
    }
  }

  if (audDates.length > 0) {
    res.audDates = audDates;
  }

  res.action = '書類提出（プロフィール・写真送付）';
  res.notes = text.length > 350 ? text.substring(0, 350) + '...' : text;
  return res;
}

function applySmartParse() {
  const input = document.getElementById('smartPasteInput');
  if (!input || !input.value.trim()) {
    showToast('⚠️ 解析するテキストを入力してください');
    return;
  }
  const parsed = parseAuditionText(input.value);

  if (parsed.type) document.getElementById('f-type').value = parsed.type;
  if (parsed.talentName) document.getElementById('f-talent').value = parsed.talentName;
  if (parsed.genre) document.getElementById('f-genre').value = parsed.genre;
  if (parsed.auditionName) document.getElementById('f-name').value = parsed.auditionName;
  if (parsed.deadline) document.getElementById('f-deadline').value = parsed.deadline;
  if (parsed.action) document.getElementById('f-action').value = parsed.action;
  if (parsed.notes) document.getElementById('f-notes').value = parsed.notes;

  if (parsed.audDates && parsed.audDates.length > 0) {
    const auddateList = document.getElementById('auddateList');
    if (auddateList) {
      auddateList.innerHTML = '';
      parsed.audDates.forEach(d => addAudDate(d));
    }
  }

  showToast('🪄 案件情報を自動解析してフォームに反映しました！');
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
    closeSalesEditModal();
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
    
    // カレンダー自動連携
    const shouldSyncCal = document.getElementById('f-sync-cal')?.checked;
    if (shouldSyncCal && hasGasUrl()) {
      syncAuditionToCalendar(formData);
    }
    
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

async function syncAuditionToCalendar(data) {
  if (!hasGasUrl()) return;
  const calId = TALENT_CALENDAR_IDS[data.talentName];
  if (!calId) return;

  try {
    // 1. 締切日イベント
    if (data.deadline) {
      const parts = data.deadline.split(/[\/\-]/);
      if (parts.length === 3) {
        const dStr = `${parts[0]}-${String(parts[1]).padStart(2, '0')}-${String(parts[2]).padStart(2, '0')}`;
        await fetch(GAS_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: API_TOKEN,
            action: 'create_allday_event',
            calendarId: calId,
            summary: `【締切】${data.talentName}：${data.auditionName} 書類〆切`,
            date: dStr
          })
        });
      }
    }
    // 2. オーディション候補日イベント
    if (data.auditionDate) {
      const dates = data.auditionDate.split(',').map(s => s.trim()).filter(Boolean);
      for (const ds of dates) {
        const parts = ds.split(/[\/\-]/);
        if (parts.length === 3) {
          const dStr = `${parts[0]}-${String(parts[1]).padStart(2, '0')}-${String(parts[2]).padStart(2, '0')}`;
          await fetch(GAS_WEBAPP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: API_TOKEN,
              action: 'create_allday_event',
              calendarId: calId,
              summary: `【仮】${data.talentName}：${data.auditionName} オーディション候補日`,
              date: dStr
            })
          });
        }
      }
    }
    showToast(`📅 ${data.talentName}のカレンダーに予定を連携しました`);
  } catch (err) {
    console.warn('Calendar sync warning:', err);
  }
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
    const dateStr = d['オーディション日'] ? fmtDate(d['オーディション日']) : (d['締切日'] ? '〆'+fmtDate(d['締切日']) : '-');
    
    // インラインステータスセレクト
    const statusOpts = STATUS_ORDER.map(st => `<option value="${escapeHtml(st)}"${d['ステータス']===st?' selected':''}>${escapeHtml(st)}</option>`).join('');
    const statusSelect = `<select class="inline-status-select" onchange="quickUpdateStatus('${escapeHtml(d['ID'])}', this.value)">${statusOpts}</select>`;

    return `<tr>
      <td data-label="種別"><span class="type-badge" style="background:${typeColor}">${TYPE_ICONS[type]||''} ${escapeHtml(type)}</span></td>
      <td data-label="タレント"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${escapeHtml(d['タレント名'])}</span></td>
      <td data-label="案件名">${escapeHtml(d['オーディション名'])}</td>
      <td data-label="ジャンル">${GENRE_ICONS[d['ジャンル']]||''} ${escapeHtml(d['ジャンル'])}</td>
      <td data-label="日程">${escapeHtml(dateStr)}</td>
      <td data-label="ステータス">${statusSelect}</td>
      <td data-label="対応者">${escapeHtml(d['対応者'])}</td>
      <td data-label="備考" style="font-size:.75rem;color:var(--text-muted)">${escapeHtml(d['備考'])||'-'}</td>
      <td data-label="操作">
        <div class="quick-action-btns">
          <button class="btn-quick-pass" onclick="quickUpdateStatus('${escapeHtml(d['ID'])}', '受注', '合格')" title="合格・受注">受</button>
          <button class="btn-quick-fail" onclick="quickUpdateStatus('${escapeHtml(d['ID'])}', '完了', '不合格')" title="不合格・終了">落</button>
          <button class="card-edit-btn" data-edit-id="${escapeHtml(d['ID'])}" title="編集" style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;">✏️</button>
        </div>
      </td>
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
    
    let urgencyClass = 'upcoming';
    let dateLabel = `${daysLeft}日後`;
    if (daysLeft < 0) {
      urgencyClass = 'overdue';
      dateLabel = `⚠️ ${Math.abs(daysLeft)}日超過`;
    } else if (daysLeft === 0) {
      urgencyClass = 'today';
      dateLabel = '🔥 本日ToDo';
    } else if (daysLeft === 1) {
      urgencyClass = 'today';
      dateLabel = '⏰ 明日';
    }
    
    const talentBadge = d['提案タレント'] ? d['提案タレント'].split(',').map(t => `<span class="talent-badge-sm" style="background:${talentColor(t.trim())};margin-right:2px;">${escapeHtml(t.trim())}</span>`).join('') : '';
    
    return `<div class="sales-todo-card ${urgencyClass}">
      <div class="sales-todo-head">
        <span class="sales-todo-company">${escapeHtml(d['社名'])}</span>
        <span class="sales-todo-date ${urgencyClass}">${fmtDate(d['次回アクション予定日'])} (${dateLabel})</span>
      </div>
      <div class="sales-todo-body">👉 ${escapeHtml(d['次回アクション内容'] || 'アクション未定')}</div>
      <div class="sales-todo-meta">
        <span class="sales-prob-badge ${ratingClass}">確度: ${escapeHtml(rating)}</span>
        ${talentBadge}
        <span style="margin-left:auto;">担当: ${escapeHtml(d['担当者名'] || '-')}</span>
      </div>
    </div>`;
  }).join('');
}

function renderSalesAttackKanban() {
  const data = [...getFilteredSalesAttack()];
  
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
    const column = container?.closest('.kanban-column');
    if (!container) return;
    
    container.innerHTML = list.map(d => {
      const rating = d['確度/感触'] || 'C';
      const ratingClass = `rating-${rating.toLowerCase()}`;
      const method = d['アプローチ方法'] ? ` <span style="font-size:.65rem;color:var(--text-muted)">(${escapeHtml(d['アプローチ方法'])})</span>` : '';
      const talentBadge = d['提案タレント'] ? d['提案タレント'].split(',').map(t => `<span class="talent-badge-sm" style="background:${talentColor(t.trim())};margin-top:4px;display:inline-block;margin-right:2px;">${escapeHtml(t.trim())}</span>`).join('') : '';
      
      let imageLink = '';
      const rawNotes = d['備考/メモ'] || '';
      const imgMatch = rawNotes.match(/(https:\/\/drive\.google\.com\/[^\s]+)/);
      if (imgMatch) {
        const safeUrl = encodeURI(imgMatch[0]);
        imageLink = `<div style="margin-top:6px;"><a href="${safeUrl}" target="_blank" style="font-size:.65rem;color:var(--accent);text-decoration:none;">🖼️ 名刺画像</a></div>`;
      }
      
      const salesId = d['ID'] || d['id'] || d['社名'];
      
      return `<div class="sales-kanban-card" draggable="true" data-sales-id="${escapeHtml(salesId)}" data-company="${escapeHtml(d['社名'])}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="sales-prob-badge" style="background:var(--bg-alt);font-size:.62rem">${escapeHtml(d['アプローチ先種別'])}</span>
          <button onclick="event.stopPropagation();openSalesEditModal('${escapeHtml(salesId)}')" title="編集" style="background:none;border:none;cursor:pointer;font-size:.78rem;color:var(--text-muted);padding:1px 4px;border-radius:4px;">✏️</button>
        </div>
        <div class="sales-kanban-card-title" style="margin-top:4px">${escapeHtml(d['社名'])}</div>
        <div class="sales-kanban-card-sub">
          <span class="sales-prob-badge ${ratingClass}">確度: ${escapeHtml(rating)}</span>
          ${method}
          <div style="margin-top:2px">担当: ${escapeHtml(d['担当者名'] || '-')}</div>
          ${d['最終アプローチ日'] ? `<div>最終: ${fmtDate(d['最終アプローチ日'])}</div>` : ''}
        </div>
        <div>${talentBadge}</div>
        ${d['次回アクション内容'] ? `<div style="font-size:.7rem;color:var(--text-secondary);background:var(--bg-alt);padding:3px 6px;border-radius:4px;margin-top:6px">📌 ${escapeHtml(d['次回アクション内容'])}</div>` : ''}
        ${imageLink}
      </div>`;
    }).join('') || '<div style="text-align:center;color:var(--text-muted);font-size:.75rem;padding:30px 10px;border:1.5px dashed var(--border);border-radius:var(--radius);margin-top:4px">ここにドロップ</div>';
    
    if (countEl) countEl.textContent = list.length;

    // 営業カンバンカラムのD&D初期化
    if (column && !column.dataset.salesDndInit) {
      column.dataset.salesDndInit = 'true';
      column.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        column.classList.add('drag-over');
      });
      column.addEventListener('dragleave', e => {
        if (!column.contains(e.relatedTarget)) {
          column.classList.remove('drag-over');
        }
      });
      column.addEventListener('drop', async e => {
        e.preventDefault();
        column.classList.remove('drag-over');
        const companyName = e.dataTransfer.getData('text/plain');
        if (!companyName) return;
        const targetStatus = column.dataset.sstatus || status;
        await handleSalesKanbanDrop(companyName, targetStatus);
      });
    }
  });

  // 営業カードのドラッグ設定
  document.querySelectorAll('.sales-kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', card.dataset.company);
      e.dataTransfer.effectAllowed = 'move';
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('#salesKanbanBoard .kanban-column').forEach(c => c.classList.remove('drag-over'));
    });
  });
}

// 営業カンバンのステータスドロップ処理
async function handleSalesKanbanDrop(companyName, newStatus) {
  const item = allSalesAttackData.find(d => String(d['社名']) === String(companyName));
  if (!item) return;
  if (item['アタックステータス'] === newStatus) return;

  item['アタックステータス'] = newStatus;
  renderSalesAttackKanban();
  renderSalesAttackList();
  showToast(`💼 「${companyName}」を【${newStatus}】へ移動しました`);

  if (hasGasUrl()) {
    try {
      const payload = {
        token: API_TOKEN,
        sheetType: 'sales_attack_update',
        companyName: companyName,
        status: newStatus
      };
      await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Sales kanban update warning:', err);
    }
  }
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
        <div style="display:flex;gap:4px;align-items:center;">
          <button class="btn btn-secondary btn-sm" onclick="openBriefingModal('${escapeHtml(d['ID'] || d['id'] || d['Row'])}')">
            ブリーフィング
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openSalesEditModal('${escapeHtml(d['ID'] || d['id'] || d['Row'] || d['社名'])}')" title="編集">
            ✏️
          </button>
        </div>
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

// ===== Sales Attack Edit Modal =====
function openSalesEditModal(id) {
  const item = allSalesAttackData.find(d => 
    String(d['ID']) === String(id) || 
    String(d['id']) === String(id) || 
    String(d['Row']) === String(id) ||
    String(d['社名']) === String(id)
  );
  if (!item) {
    showToast('⚠️ 編集対象の営業先が見つかりません');
    return;
  }

  document.getElementById('se-id').value = item['ID'] || item['id'] || item['Row'] || '';
  document.getElementById('se-companyName').value = item['社名'] || '';
  document.getElementById('se-companyType').value = item['アプローチ先種別'] || '制作会社';
  document.getElementById('se-contactName').value = item['担当者名'] || '';
  document.getElementById('se-contactInfo').value = item['連絡先'] || '';

  const formatInputDate = (dateStr) => {
    const d = parseDate(dateStr);
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  document.getElementById('se-lastApproachDate').value = formatInputDate(item['最終アプローチ日']);
  document.getElementById('se-approachMethod').value = item['アプローチ方法'] || '';
  document.getElementById('se-status').value = item['アタックステータス'] || '未アプローチ';
  document.getElementById('se-rating').value = item['確度/感触'] || 'C';
  document.getElementById('se-talentName').value = item['提案タレント'] || '';
  document.getElementById('se-nextApproachDate').value = formatInputDate(item['次回アクション予定日']);
  document.getElementById('se-nextApproachAction').value = item['次回アクション内容'] || '';
  document.getElementById('se-notes').value = item['備考/メモ'] || '';

  document.getElementById('salesEditModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSalesEditModal() {
  document.getElementById('salesEditModal').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('salesEditForm').reset();
}

async function handleSalesEditSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('salesEditSubmitBtn');
  const text = document.getElementById('salesEditSubmitText');
  const spinner = document.getElementById('salesEditSubmitSpinner');
  btn.disabled = true;
  text.textContent = '更新中...';
  spinner.classList.remove('hidden');

  const lastApproachDateRaw = document.getElementById('se-lastApproachDate').value;
  const lastApproachDate = lastApproachDateRaw ? lastApproachDateRaw.replace(/-/g, '/') : '';
  const nextApproachDateRaw = document.getElementById('se-nextApproachDate').value;
  const nextApproachDate = nextApproachDateRaw ? nextApproachDateRaw.replace(/-/g, '/') : '';

  const id = document.getElementById('se-id').value;
  const companyName = document.getElementById('se-companyName').value;

  const formData = {
    sheetType: 'sales_attack_update',
    action: 'update_sales_attack',
    id: id,
    companyName: companyName,
    companyType: document.getElementById('se-companyType').value,
    contactName: document.getElementById('se-contactName').value,
    contactInfo: document.getElementById('se-contactInfo').value,
    lastApproachDate: lastApproachDate,
    approachMethod: document.getElementById('se-approachMethod').value,
    status: document.getElementById('se-status').value,
    rating: document.getElementById('se-rating').value,
    talentName: document.getElementById('se-talentName').value,
    nextApproachDate: nextApproachDate,
    nextApproachAction: document.getElementById('se-nextApproachAction').value,
    notes: document.getElementById('se-notes').value,
    token: API_TOKEN
  };

  try {
    if (hasGasUrl()) {
      const res = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        showToast('✅ 営業アタック情報を更新しました！');
      } else {
        throw new Error(result.error || '更新失敗');
      }
    } else {
      showToast('📝 ローカルデータを更新しました');
    }

    // ローカルキャッシュの即時更新
    const idx = allSalesAttackData.findIndex(d => 
      (id && (String(d['ID']) === String(id) || String(d['id']) === String(id) || String(d['Row']) === String(id))) ||
      String(d['社名']) === String(companyName)
    );
    if (idx !== -1) {
      allSalesAttackData[idx] = {
        ...allSalesAttackData[idx],
        社名: formData.companyName,
        アプローチ先種別: formData.companyType,
        担当者名: formData.contactName,
        連絡先: formData.contactInfo,
        最終アプローチ日: formData.lastApproachDate,
        アプローチ方法: formData.approachMethod,
        アタックステータス: formData.status,
        '確度/感触': formData.rating,
        提案タレント: formData.talentName,
        次回アクション予定日: formData.nextApproachDate,
        次回アクション内容: formData.nextApproachAction,
        '備考/メモ': formData.notes
      };
    }
    renderSalesAttackAll();
    closeSalesEditModal();

  } catch (err) {
    console.error(err);
    showToast('❌ エラー: ' + err.message);
  } finally {
    btn.disabled = false;
    text.textContent = '更新する';
    spinner.classList.add('hidden');
  }
  return false;
}

// ===== Survey (タレントアンケート) =====
let surveyDataCache = [];
let surveySearchQuery = '';
let activeSurveyData = null; // 現在モーダルで開いているデータ

// タレント名の正規化マップ（苗字のみをフルネームに統一）
function normalizeTalentFullName(name) {
  if (!name) return '';
  const s = String(name).trim().replace(/\s+/g, '');
  const map = {
    '島田': '島田和奏',
    '島田和奏': '島田和奏',
    '谷口': '谷口彩菜',
    '谷口彩菜': '谷口彩菜',
    '太田': '太田陽菜',
    '太田陽菜': '太田陽菜',
    '寺崎': '寺崎ひな',
    '寺崎ひな': '寺崎ひな',
    '中塚': '中塚智',
    '中塚智': '中塚智',
    '相馬': '相馬寿樹',
    '相馬寿樹': '相馬寿樹',
    '実倉': '実倉萌笑',
    '実倉萌笑': '実倉萌笑'
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
      // 初期サンプルデータ（ID 1〜5 のダミーテストデータ）を除外
      const sampleIds = [1, 2, 3, 4, 5];
      const validItems = json.data.filter(item => !sampleIds.includes(Number(item.id)) && item.bibleMovie !== 'サンプル');

      // タレント名を正規化し、同一タレントは最新の1件（フルネーム）にマージ
      const map = new Map();
      validItems.forEach(item => {
        const canonicalName = normalizeTalentFullName(item.talentName);
        item.talentName = canonicalName;
        // 既存のものがある場合は、IDが大きい（最新）または更新日が新しい方を優先
        if (!map.has(canonicalName) || Number(item.id) > Number(map.get(canonicalName).id)) {
          map.set(canonicalName, item);
        }
      });
      surveyDataCache = Array.from(map.values());
      renderSurveyList();
  renderWeeklyReport();
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

// ============================================================
// ミッション管理フロントエンドロジック (Mission Tab)
// ============================================================

let missionWeekOffset = 0;
let missionDataCache = null;

// フォールバック用初期ミッションデータ
const MISSION_FALLBACK = {
  week: "2026-09-01",
  employees: [
    {
      id: "EMP-003",
      name: "十河",
      dept: "第3部",
      role: "部長",
      provisional: false,
      talents: ["直轄：中島健太（画家）", "相馬寿樹（監督）"],
      missions: [
        { id: "MSN-001", category: "MANAGEMENT", title: "部長定例で全項目の進捗・数値を報告", type: "weekly", target: 1, unit: "回/週", actual: 0 },
        { id: "MSN-002", category: "MANAGEMENT", title: "内田・佐藤のカレンダーを確認し空き時間を埋める", type: "weekly", target: 5, unit: "回/週", note: "平日毎日", actual: 0 },
        { id: "MSN-003", category: "SALES", title: "制作会社への営業", type: "weekly", target: 3, unit: "回/週", note: "ショートドラマ営業は停止。ドラマ・映画のキャスティング営業へ", actual: 0 },
        { id: "MSN-004", category: "SUPPORT", title: "森ひかる スポンサー会議（福永と）", type: "weekly", target: 1, unit: "回/週", actual: 0 },
        { id: "MSN-005", category: "SUPPORT", title: "井上とのAI活用会議", type: "weekly", target: 1, unit: "回/週", note: "業務改善・AI活用の協議", actual: 0 },
        { id: "MSN-006", category: "MANAGEMENT", title: "内田・佐藤との個別MTG／3人MTG", type: "unset", ask: "週あたり何回？", actual: 0 },
        { id: "MSN-007", category: "SALES", title: "若手俳優5名の売り込み営業（内田と前線で）", type: "unset", ask: "月あたり何社？", note: "友田オレ・中塚智・島田和奏・谷口彩菜・寺崎ひな", actual: 0 },
        { id: "MSN-008", category: "SALES", title: "丸一との定例会議・グッズ制作の推進", type: "unset", ask: "定例は週何回？", actual: 0 },
        { id: "MSN-009", category: "SALES", title: "中島健太・相馬寿樹の案件で売上構築", type: "unset", ask: "年内いくら？", actual: 0 },
        { id: "MSN-010", category: "PROJECT", title: "YAGATE以外の事務所主催ライブを立ち上げ", type: "unset", ask: "初回はいつ？", actual: 0 },
        { id: "MSN-011", category: "PROJECT", title: "若手芸人中心のPodcast番組を立ち上げ", type: "unset", ask: "年内何番組？", actual: 0 },
        { id: "MSN-012", category: "PROJECT", title: "YAGATEのSNS発信強化", type: "unset", ask: "週何投稿？", actual: 0 }
      ]
    },
    {
      id: "EMP-004",
      name: "内田",
      dept: "第3部",
      role: "チーフ",
      provisional: true,
      talents: ["担当：友田オレ", "中塚智", "島田和奏", "谷口彩菜", "寺崎ひな"],
      missions: [
        { id: "MSN-013", category: "SALES", title: "担当5名の売り込み営業（十河と同行）", type: "weekly", target: 3, unit: "回/週", note: "仮", actual: 0 },
        { id: "MSN-014", category: "MANAGEMENT", title: "翌週スケジュールを十河へ共有", type: "weekly", target: 1, unit: "回/週", note: "仮", actual: 0 },
        { id: "MSN-015", category: "SALES", title: "担当タレントの営業資料（プロフィール/素材）更新", type: "unset", ask: "何名分をいつまでに？", note: "仮", actual: 0 },
        { id: "MSN-016", category: "SALES", title: "丸一とのグッズ制作やり取り", type: "unset", ask: "納期はいつ？", note: "仮", actual: 0 }
      ]
    },
    {
      id: "EMP-005",
      name: "佐藤",
      dept: "第3部",
      role: "現場M",
      provisional: true,
      talents: ["担当：リンドバーグ", "イクラボブチャンチャン", "めっちゃ最高ズ", "深海魚", "リバーサイドマエストロ", "YAGATE", "友田オレ", "シャワーカーテニスト", "チェット", "一向聴"],
      missions: [
        { id: "MSN-017", category: "PROJECT", title: "YAGATE公式SNSの発信", type: "weekly", target: 5, unit: "回/週", note: "仮", actual: 0 },
        { id: "MSN-018", category: "MANAGEMENT", title: "翌週スケジュールを十河へ共有", type: "weekly", target: 1, unit: "回/週", note: "仮", actual: 0 },
        { id: "MSN-019", category: "PROJECT", title: "新規主催ライブの出演者ブッキング", type: "unset", ask: "初回は何組？", note: "仮", actual: 0 },
        { id: "MSN-020", category: "PROJECT", title: "Podcast収録の運営", type: "unset", ask: "月何本収録？", note: "仮", actual: 0 }
      ]
    }
  ]
};

function getMissionMonday(off) {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + off * 7);
  return d;
}

function getMissionMondayStr(off) {
  const d = getMissionMonday(off);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getMissionWeekLabel(off) {
  const d = getMissionMonday(off);
  const e = new Date(d);
  e.setDate(d.getDate() + 6);
  const f = x => `${x.getMonth() + 1}/${x.getDate()}`;
  return `${d.getFullYear()} ${f(d)} – ${f(e)}` + (off === 0 ? "（今週）" : "");
}

async function loadMissionData() {
  const wkStr = getMissionMondayStr(missionWeekOffset);
  const wkLabelEl = document.getElementById('missionWk');
  if (wkLabelEl) wkLabelEl.textContent = getMissionWeekLabel(missionWeekOffset);

  if (hasGasUrl()) {
    try {
      const url = withToken(`${GAS_WEBAPP_URL}?action=mission&week=${wkStr}`);
      const json = await fetchWithTimeout(url, {}, 5000);
      if (json && json.employees && json.employees.length) {
        missionDataCache = json;
        renderMissionView();
        return;
      }
    } catch (err) {
      console.warn('ミッションデータ取得失敗。フォールバック表示を使用:', err.message);
    }
  }

  // フォールバック
  missionDataCache = JSON.parse(JSON.stringify(MISSION_FALLBACK));
  missionDataCache.week = wkStr;
  renderMissionView();
}

function renderMissionView() {
  if (!missionDataCache || !missionDataCache.employees) return;

  const wkLabelEl = document.getElementById('missionWk');
  if (wkLabelEl) wkLabelEl.textContent = getMissionWeekLabel(missionWeekOffset);

  const meeting = document.getElementById('missionMeetingMode')?.checked || false;
  const toggleEl = document.getElementById('missionMeetingToggle');
  if (toggleEl) toggleEl.classList.toggle('on', meeting);

  let unsetTotal = 0;
  const sumHtml = [];
  const bodyHtml = [];

  missionDataCache.employees.forEach((p, pi) => {
    let need = 0;
    let got = 0;

    (p.missions || []).forEach((m) => {
      if (m.type === 'weekly') {
        const tgt = Number(m.target) || 0;
        const act = Number(m.actual) || 0;
        need += tgt;
        got += Math.min(act, tgt);
      }
      if (m.type === 'unset') {
        unsetTotal++;
      }
    });

    const pct = need > 0 ? Math.round((got / need) * 100) : 0;

    sumHtml.push(`
      <div class="mission-sum-card">
        <div class="mission-sum-nm">
          <span>${escapeHtml(p.name)}</span>
          <span class="mission-sum-rl">${escapeHtml(p.role || '')}</span>
        </div>
        <div class="mission-sum-big">${pct}<small>%</small></div>
        <div class="mission-bar"><i style="width:${pct}%"></i></div>
        <div class="mission-sum-sub">週次アクション ${got} / ${need} 回</div>
      </div>
    `);

    const rowsHtml = (p.missions || []).map((m, mi) => {
      const act = Number(m.actual) || 0;
      const tgt = Number(m.target) || 0;
      const isDone = m.type === 'weekly' && act >= tgt;
      const hidden = meeting && isDone;

      let rightHtml = '';
      if (m.type === 'weekly') {
        const dots = Array.from({ length: tgt }, (_, i) => {
          const isOn = i < act;
          return `<button class="${isOn ? 'on' : ''}" data-p="${pi}" data-m="${mi}" data-i="${i}" aria-label="${escapeHtml(m.title)} ${i+1}回目"></button>`;
        }).join('');
        rightHtml = `
          <div class="mission-dots">${dots}</div>
          <span class="mission-count ${isDone ? 'done' : ''}">${act}/${tgt}</span>
        `;
      } else if (m.type === 'target') {
        const dueStr = m.due ? `（期日: ${escapeHtml(m.due)}）` : '';
        rightHtml = `
          <span style="font-size:12px; font-weight:700; color:var(--accent);">
            目標: ${escapeHtml(String(m.target))} ${escapeHtml(m.unit || '')} ${dueStr}
          </span>
        `;
      } else {
        // unset
        const askText = m.ask || '数値を入力...';
        rightHtml = `
          <div class="mission-unset-box">
            <span>未設定</span>
            <input type="text" placeholder="${escapeHtml(askText)}" aria-label="${escapeHtml(m.title)} の目標値">
            <button type="button" data-mid="${escapeHtml(m.id)}">確定</button>
          </div>
        `;
      }

      return `
        <div class="mission-row ${hidden ? 'hide' : ''}">
          <div class="mission-m-main">
            <span class="mission-m-cat">${escapeHtml(m.category || 'MANAGEMENT')}</span>
            <div class="mission-m-title">${escapeHtml(m.title)}</div>
            ${m.note ? `<div class="mission-m-note">${escapeHtml(m.note)}</div>` : ''}
          </div>
          <div class="mission-m-right">${rightHtml}</div>
        </div>
      `;
    }).join('');

    const talentsStr = Array.isArray(p.talents) ? p.talents.join(' / ') : (p.talents || '');

    bodyHtml.push(`
      <div class="mission-person">
        <div class="mission-person-head">
          <span class="nm">${escapeHtml(p.name)}</span>
          <span class="mission-chip ${pi === 0 ? 'mgr' : ''}">${escapeHtml(p.role || '')}</span>
          ${p.provisional ? '<span class="mission-provisional">仮・要確認</span>' : ''}
          <span class="talents">${escapeHtml(talentsStr)}</span>
        </div>
        ${rowsHtml}
      </div>
    `);
  });

  const sumEl = document.getElementById('missionSummary');
  if (sumEl) sumEl.innerHTML = sumHtml.join('');

  const peoEl = document.getElementById('missionPeople');
  if (peoEl) peoEl.innerHTML = bodyHtml.join('');

  const alertEl = document.getElementById('missionAlert');
  if (alertEl) {
    if (unsetTotal > 0) {
      alertEl.style.display = '';
      alertEl.innerHTML = `⚠️ 数値が入っていないミッションが <b>${unsetTotal}件</b> あります。「アバウトな指標の禁止」に沿って、定例会議でその場で回数・金額・期日を確定してください。`;
    } else {
      alertEl.style.display = '';
      alertEl.innerHTML = `✅ すべてのミッションに数値目標が設定されています。`;
    }
  }
}

async function handleMissionDotClick(pIdx, mIdx, dotIdx) {
  if (!missionDataCache || !missionDataCache.employees) return;
  const p = missionDataCache.employees[pIdx];
  if (!p || !p.missions) return;
  const m = p.missions[mIdx];
  if (!m || m.type !== 'weekly') return;

  const currentActual = Number(m.actual) || 0;
  // 同じドットを再度押したら1つ戻す、それ以外はそのドットのインデックス+1にする
  const newActual = (currentActual === dotIdx + 1) ? dotIdx : dotIdx + 1;
  m.actual = newActual;

  // 楽観的UI更新
  renderMissionView();

  // バックグラウンドでPOST
  if (hasGasUrl()) {
    try {
      const wkStr = getMissionMondayStr(missionWeekOffset);
      const postData = {
        mode: 'mission_progress',
        week: wkStr,
        missionId: m.id,
        actual: newActual,
        employeeId: p.id,
        token: API_TOKEN
      };
      await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
    } catch (err) {
      console.warn('進捗の保存に失敗しました:', err.message);
      showToast('⚠️ 進捗の同期に失敗しました（再読み込みで再試行）');
    }
  }
}

async function handleMissionTargetSubmit(missionId, inputVal) {
  const val = (inputVal || '').trim();
  if (!val) {
    showToast('⚠️ 数値や目標を入力してください');
    return;
  }

  // 週あたりの回数（例: "週3回", "3"）か、期日つき目標かを判定
  let target = null;
  let unit = '';
  let due = '';
  let newType = 'target';

  const numMatch = val.match(/\d+/);
  if (numMatch) {
    target = Number(numMatch[0]);
  }

  if (val.includes('週') || val.includes('回/週')) {
    unit = '回/週';
    newType = 'weekly';
  } else if (val.includes('円') || val.includes('万')) {
    unit = val.includes('万') ? '万円' : '円';
  } else if (val.includes('社')) {
    unit = '社/月';
  } else if (val.includes('番組')) {
    unit = '番組';
  } else if (val.includes('組')) {
    unit = '組';
  } else {
    unit = '件';
  }

  // 画面側キャッシュの即時更新
  if (missionDataCache && missionDataCache.employees) {
    missionDataCache.employees.forEach(emp => {
      (emp.missions || []).forEach(m => {
        if (m.id === missionId) {
          m.type = newType;
          m.target = target || 1;
          m.unit = unit;
          m.due = due;
          m.confirmed = true;
        }
      });
    });
    renderMissionView();
  }

  if (hasGasUrl()) {
    try {
      showToast('⏳ ミッション目標値を保存中...');
      const postData = {
        mode: 'mission_target',
        missionId: missionId,
        target: target || 1,
        unit: unit,
        due: due,
        type: newType,
        token: API_TOKEN
      };
      const res = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      const json = await res.json();
      if (json.success) {
        showToast('✅ 目標値を確定しました！');
        loadMissionData();
      } else {
        throw new Error(json.error || '保存失敗');
      }
    } catch (err) {
      console.error('目標値保存エラー:', err);
      showToast('❌ 保存エラー: ' + err.message);
    }
  } else {
    showToast('✅ ローカルで目標値を更新しました');
  }
}



// ============================================================
// 週次報告・タレント別ハイライト機能 (Weekly Report / Highlights)
// ============================================================
let weeklyPeriod = '7d';
let weeklyActiveOnly = true;
let weeklyIncludeCal = true;
let weeklyTextFormat = 'simple';

const TALENT_SHORT_NAMES = {
  '谷口彩菜': '谷口',
  '寺崎ひな': '寺崎',
  '島田和奏': '島田',
  '中塚智': '中塚',
  '太田陽菜': '太田',
  '相馬寿樹': '相馬',
  '実倉萌笑': '実倉'
};

function getShortTalentName(fullName) {
  if (!fullName) return '';
  return TALENT_SHORT_NAMES[fullName] || fullName.substring(0, 2);
}

function fmtDateWithDay(d) {
  if (!d || isNaN(d)) return '';
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getMonth() + 1}/${d.getDate()}(${days[d.getDay()]})`;
}

function getWeeklyDateWindow(period) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  let start, end, scheduleEnd, modeName;

  if (period === 'this_week') {
    const day = todayStart.getDay();
    const diffToMon = (day + 6) % 7;
    start = new Date(todayStart);
    start.setDate(todayStart.getDate() - diffToMon);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59);
    scheduleEnd = new Date(end);
    scheduleEnd.setDate(end.getDate() + 7);
    modeName = '今週（月〜日）';
  } else if (period === 'last_week') {
    const day = todayStart.getDay();
    const diffToMon = (day + 6) % 7;
    start = new Date(todayStart);
    start.setDate(todayStart.getDate() - diffToMon - 7);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59);
    scheduleEnd = new Date(todayEnd);
    scheduleEnd.setDate(todayEnd.getDate() + 7);
    modeName = '先週（月〜日）';
  } else if (period === '14d') {
    start = new Date(todayStart);
    start.setDate(todayStart.getDate() - 14);
    end = todayEnd;
    scheduleEnd = new Date(todayEnd);
    scheduleEnd.setDate(todayEnd.getDate() + 14);
    modeName = '直近14日間';
  } else if (period === '30d') {
    start = new Date(todayStart);
    start.setDate(todayStart.getDate() - 30);
    end = todayEnd;
    scheduleEnd = new Date(todayEnd);
    scheduleEnd.setDate(todayEnd.getDate() + 30);
    modeName = '直近30日間';
  } else {
    start = new Date(todayStart);
    start.setDate(todayStart.getDate() - 7);
    end = todayEnd;
    scheduleEnd = new Date(todayEnd);
    scheduleEnd.setDate(todayEnd.getDate() + 14);
    modeName = '直近7日間';
  }

  return {
    start,
    end,
    todayStart,
    scheduleEnd,
    modeName,
    rangeStr: `${fmtDateWithDay(start)} 〜 ${fmtDateWithDay(end)}`,
    schedRangeStr: `${fmtDateWithDay(todayStart)} 〜 ${fmtDateWithDay(scheduleEnd)}`
  };
}

function setWeeklyPeriod(p) {
  weeklyPeriod = p;
  document.querySelectorAll('#weeklyPeriodFilter .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.wperiod === p);
  });
  renderWeeklyReport();
}

function toggleWeeklyActiveOnly() {
  weeklyActiveOnly = !weeklyActiveOnly;
  const btn = document.getElementById('btnWeeklyActiveOnly');
  if (btn) btn.classList.toggle('active', weeklyActiveOnly);
  renderWeeklyReport();
}

function toggleWeeklyIncludeCal() {
  weeklyIncludeCal = !weeklyIncludeCal;
  const btn = document.getElementById('btnWeeklyIncludeCal');
  if (btn) btn.classList.toggle('active', weeklyIncludeCal);
  renderWeeklyReport();
}

function setWeeklyTextFormat(fmt) {
  weeklyTextFormat = fmt;
  document.getElementById('btnDigestFormatSimple')?.classList.toggle('active', fmt === 'simple');
  document.getElementById('btnDigestFormatDetail')?.classList.toggle('active', fmt === 'detail');
  renderWeeklyReport();
}

function toggleWeeklyRawText() {
  const wrap = document.getElementById('weeklyRawTextWrap');
  if (wrap) wrap.classList.toggle('hidden');
}

function copyWeeklyReportText() {
  const ta = document.getElementById('weeklyReportTextarea');
  const text = ta && ta.value ? ta.value : buildWeeklyReportPlainText(buildWeeklyReportData());
  if (!text) {
    showToast('⚠️ コピーする報告データがありません');
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 週次報告ハイライトをクリップボードにコピーしました！');
    }).catch(() => fallbackCopy(text, '週次報告ハイライト'));
  } else {
    fallbackCopy(text, '週次報告ハイライト');
  }
}

function buildWeeklyReportData() {
  const win = getWeeklyDateWindow(weeklyPeriod);
  const talents = currentTalent === 'all'
    ? [...MANAGED_TALENTS]
    : MANAGED_TALENTS.filter(t => t === currentTalent);

  const inRange = (dt, s, e) => dt && dt >= s && dt <= e;

  const talentReports = talents.map(talent => {
    const shortName = getShortTalentName(talent);
    const tData = allData.filter(d => normalizeTalentFullName(d['タレント名']) === talent || d['タレント名'] === talent);

    const periodAuditions = [];
    const activeAuditions = [];
    const sheetSchedules = [];

    tData.forEach(d => {
      const status = (d['ステータス'] || '').trim();
      const result = (d['結果'] || '').trim();
      const isFail = result.startsWith('不合格') || result.startsWith('見送り') || result.startsWith('辞退');
      const isPass = result === '合格' || status === '受注';
      const isActive = status !== '完了' && !isFail;
      const stagInfo = getStagnantInfo(d);

      const regDt = parseDate(d['登録日']);
      const updDt = parseDate(d['更新日']);
      const dlDt = parseDate(d['締切日']);
      const resDt = parseDate(d['結果発表日'] || d['結果発表']);
      const relDt = parseDate(d['公開日']);
      const audDateStrs = (d['オーディション日'] || '').split(',').map(s => s.trim()).filter(Boolean);
      const audDts = audDateStrs.map(s => parseDate(s)).filter(Boolean);

      const reasons = [];
      let latestTouch = updDt || regDt || resDt || dlDt || null;
      if (inRange(regDt, win.start, win.end)) reasons.push(`🆕 新規(${fmtDate(d['登録日'])})`);
      else if (inRange(updDt, win.start, win.end)) reasons.push(`🔄 更新(${fmtDate(d['更新日'])})`);
      if (inRange(dlDt, win.start, win.end)) reasons.push(`〆切(${fmtDate(d['締切日'])})`);
      if (audDts.some(dt => inRange(dt, win.start, win.scheduleEnd))) reasons.push('🎤 AD予定');
      if (inRange(resDt, win.start, win.scheduleEnd)) reasons.push(`📋 結果発表(${fmtDate(d['結果発表日'] || d['結果発表'])})`);
      if (inRange(relDt, win.start, win.scheduleEnd)) reasons.push(`📺 公開(${fmtDate(d['公開日'])})`);

      const entry = {
        raw: d,
        id: d['ID'],
        name: d['オーディション名'] || '（案件名なし）',
        type: d['案件種別'] || 'オーディション',
        genre: d['ジャンル'] || '',
        status,
        result,
        action: d['アクション'] || '',
        notes: d['備考'] || '',
        deadline: d['締切日'] || '',
        auditionDate: d['オーディション日'] || '',
        isPass,
        isFail,
        isActive,
        reasons,
        isPeriodUpdate: reasons.length > 0,
        sortTime: latestTouch ? latestTouch.getTime() : ( Number(d['ID']) || 0 )
      };

      const maxKnownDt = [updDt, regDt, resDt, relDt, dlDt, ...audDts].filter(Boolean).sort((a, b) => b - a)[0] || null;
      const isWithin21Days = maxKnownDt && ((win.end - maxKnownDt) <= 21 * 86400000) && ((maxKnownDt - win.scheduleEnd) <= 30 * 86400000);

      if (entry.isPeriodUpdate && !isFail) {
        if (!periodAuditions.some(x => x.name === entry.name)) {
          periodAuditions.push(entry);
        }
      } else if (isActive && !stagInfo && isWithin21Days) {
        if (!activeAuditions.some(x => x.name === entry.name)) {
          activeAuditions.push(entry);
        }
      }

      // スプシ上の日程（AD日・公開日・結果発表日・今後の締切）をスケジュールへ収集
      if (!isFail) {
        audDts.forEach(dt => {
          if (inRange(dt, win.start, win.scheduleEnd)) {
            sheetSchedules.push({
              date: dt,
              dateStr: fmtDateWithDay(dt),
              timeStr: '',
              badge: '🎤 AD予定',
              badgeColor: '#e2000f',
              title: d['オーディション名'] || '',
              sub: status,
              source: 'sheet'
            });
          }
        });
        if (inRange(relDt, win.start, win.scheduleEnd)) {
          sheetSchedules.push({
            date: relDt,
            dateStr: fmtDateWithDay(relDt),
            timeStr: '',
            badge: '📺 OA/公開',
            badgeColor: '#10B981',
            title: d['オーディション名'] || '',
            sub: d['ジャンル'] || '',
            source: 'sheet'
          });
        }
        if (inRange(resDt, win.start, win.scheduleEnd)) {
          sheetSchedules.push({
            date: resDt,
            dateStr: fmtDateWithDay(resDt),
            timeStr: '',
            badge: '📋 結果発表',
            badgeColor: '#F59E0B',
            title: d['オーディション名'] || '',
            sub: status,
            source: 'sheet'
          });
        }
        if (isActive && inRange(dlDt, win.todayStart, win.scheduleEnd)) {
          sheetSchedules.push({
            date: dlDt,
            dateStr: fmtDateWithDay(dlDt),
            timeStr: '',
            badge: '⏰ 締切',
            badgeColor: '#6366F1',
            title: d['オーディション名'] || '',
            sub: d['アクション'] || status,
            source: 'sheet'
          });
        }
      }
    });

    // Googleカレンダー予定の統合（私用・日常レッスン等のノイズは除外）
    const gcalSchedules = [];
    const noiseRegex = /(私用|歯医者|整骨院|脱毛|ホワイトニング|ご飯|ランチ|ディズニー|誕生日|おかあさん|引越し|受け取り|レッスン|タップ|シアタージャズ|話し方|見学|^映画$|^P1$|地元帰るので)/;
    if (weeklyIncludeCal && Array.isArray(calendarEvents)) {
      calendarEvents.forEach(ev => {
        const evTalent = normalizeTalentFullName(ev.talent || '');
        const title = (ev.title || '').trim();
        const titleMatchesTalent = !evTalent && title.includes(shortName);
        if (evTalent !== talent && ev.talent !== talent && !titleMatchesTalent) return;
        if (noiseRegex.test(title)) return;
        const st = new Date(ev.start);
        if (isNaN(st) || !inRange(st, win.start, win.scheduleEnd)) return;
        let timeStr = '終日';
        if (ev.allDay === false) {
          const hh = String(st.getHours()).padStart(2, '0');
          const mm = String(st.getMinutes()).padStart(2, '0');
          timeStr = `${hh}:${mm}`;
        }
        gcalSchedules.push({
          date: st,
          dateStr: fmtDateWithDay(st),
          timeStr,
          badge: '📅 Gカレ',
          badgeColor: '#8B5CF6',
          title: title || '（予定）',
          sub: ev.location ? `📍${ev.location}` : '',
          source: 'gcal'
        });
      });
    }

    // 重複除外して日付昇順ソート
    const mergedSchedules = [...gcalSchedules];
    sheetSchedules.forEach(ss => {
      const dup = gcalSchedules.some(gc =>
        gc.date.toDateString() === ss.date.toDateString() &&
        (gc.title.includes(ss.title.substring(0, 5)) || ss.title.includes(gc.title.substring(0, 5)))
      );
      if (!dup) mergedSchedules.push(ss);
    });
    mergedSchedules.sort((a, b) => a.date - b.date);

    // 営業アタックの動き
    const salesMoves = [];
    (allSalesAttackData || []).forEach(s => {
      const prop = s['提案タレント'] || '';
      if (!prop.includes(talent) && !prop.includes(shortName)) return;
      const lastDt = parseDate(s['最終アプローチ日']);
      const updDt = parseDate(s['更新日'] || s['登録日']);
      const nextDt = parseDate(s['次回アクション予定日']);
      const st = s['アタックステータス'] || '';
      const isRecentSales = inRange(lastDt, win.start, win.end) || inRange(updDt, win.start, win.end) || inRange(nextDt, win.start, win.scheduleEnd);
      const recentTouch = [lastDt, updDt, nextDt].filter(Boolean).sort((a, b) => b - a)[0] || null;
      const isRecentOngoing = ['コンタクト中', '面談済', '案件検討中', 'WS講師依頼済'].includes(st) && recentTouch && ((win.end - recentTouch) <= 21 * 86400000);
      if (isRecentSales || isRecentOngoing) {
        salesMoves.push({
          id: s['ID'] || s['社名'],
          company: s['社名'] || '',
          type: s['アプローチ先種別'] || '',
          status: st,
          rating: s['確度/感触'] || '',
          lastDate: s['最終アプローチ日'] ? fmtDate(s['最終アプローチ日']) : '',
          nextDate: s['次回アクション予定日'] ? fmtDate(s['次回アクション予定日']) : '',
          nextAction: s['次回アクション内容'] || '',
          isRecentSales
        });
      }
    });

    // ニュースの動き
    const newsMoves = (allNewsData || []).filter(n => {
      if (normalizeTalentFullName(n['タレント名']) !== talent && n['タレント名'] !== talent) return false;
      const nd = parseDate(n['日付']);
      return inRange(nd, win.start, win.end);
    });

    return {
      talent,
      shortName,
      periodAuditions,
      activeAuditions,
      schedules: mergedSchedules,
      salesMoves,
      newsMoves
    };
  });

  const anyStrictPeriodUpdate = talentReports.some(r => r.periodAuditions.length > 0 || r.schedules.length > 0 || r.salesMoves.some(s => s.isRecentSales));

  talentReports.forEach(r => {
    r.periodAuditions.sort((a, b) => b.sortTime - a.sortTime);
    r.activeAuditions.sort((a, b) => b.sortTime - a.sortTime);

    const extraActive = r.activeAuditions.filter(a => ['受注', '2次以降AD', '応募準備', '書類結果待ち', '結果待ち'].includes(a.status)).slice(0, 3);
    r.displayAuditions = [...r.periodAuditions, ...extraActive];

    r.hasMovement = r.displayAuditions.length > 0 || r.schedules.length > 0 || r.salesMoves.length > 0 || r.newsMoves.length > 0;
    r.oneLineSummary = formatTalentOneLineSummary(r);
  });

  return { win, talentReports, anyStrictPeriodUpdate };
}

function formatTalentOneLineSummary(r) {
  const parts = [];

  if (r.displayAuditions.length > 0) {
    const itemsStr = r.displayAuditions.slice(0, 4).map(a => {
      const stateStr = a.isPass ? '🎉合格/受注' : a.status;
      const reasonStr = a.reasons.length ? `・${a.reasons[0]}` : (a.action ? `・${a.action}` : '');
      return `${a.name}（${stateStr}${reasonStr}）`;
    }).join('、');
    const more = r.displayAuditions.length > 4 ? ` ほか${r.displayAuditions.length - 4}件` : '';
    parts.push(`【案件】${itemsStr}${more}`);
  }

  if (r.schedules.length > 0) {
    const schedStr = r.schedules.slice(0, 3).map(s => {
      const t = s.timeStr && s.timeStr !== '終日' ? ` ${s.timeStr}` : '';
      return `${s.dateStr}${t} ${s.title}`;
    }).join('、');
    const more = r.schedules.length > 3 ? ` ほか${r.schedules.length - 3}件` : '';
    parts.push(`【予定】${schedStr}${more}`);
  }

  if (r.salesMoves.length > 0) {
    const salesStr = r.salesMoves.slice(0, 2).map(s => {
      return `${s.company}（${s.status}${s.nextDate ? '・次回' + s.nextDate : ''}）`;
    }).join('、');
    parts.push(`【営業】${salesStr}`);
  }

  if (r.newsMoves.length > 0) {
    parts.push(`【ニュース】${r.newsMoves[0]['タイトル']}`);
  }

  return parts.length > 0 ? parts.join(' ／ ') : '期間内の特筆アップデート・予定なし';
}

function buildWeeklyReportPlainText(reportData) {
  const { win, talentReports } = reportData;
  const list = weeklyActiveOnly ? talentReports.filter(r => r.hasMovement) : talentReports;
  if (list.length === 0) {
    return `■ 週次報告ハイライト（${win.modeName}：${win.rangeStr}）\n該当期間の動き・予定はありません。`;
  }

  if (weeklyTextFormat === 'detail') {
    const blocks = list.map(r => {
      const lines = [`【${r.shortName}（${r.talent}）】`];
      r.displayAuditions.forEach(a => {
        const stateStr = a.isPass ? '🎉合格/受注' : a.status;
        const rTag = a.reasons.length ? ` [${a.reasons.join('/')}]` : '';
        const act = a.action ? `（👉 ${a.action}）` : '';
        lines.push(`・[案件] ${a.name}｜${stateStr}${rTag}${act}`);
      });
      r.schedules.forEach(s => {
        const t = s.timeStr ? ` ${s.timeStr}` : '';
        const sub = s.sub ? `（${s.sub}）` : '';
        lines.push(`・[${s.badge}] ${s.dateStr}${t} ${s.title}${sub}`);
      });
      r.salesMoves.forEach(s => {
        lines.push(`・[営業] ${s.company}｜${s.status}${s.nextAction ? '（次回: ' + s.nextAction + '）' : ''}`);
      });
      if (lines.length === 1) lines.push('・特筆アップデートなし');
      return lines.join('\n');
    });
    return `■ 週次報告ハイライト（${win.modeName}：${win.rangeStr}）\n\n` + blocks.join('\n\n');
  }

  const lines = list.map(r => `${r.shortName}　${r.oneLineSummary}`);
  return `■ 週次報告ハイライト（${win.modeName}：${win.rangeStr}）\n` + lines.join('\n');
}

function renderWeeklyReport() {
  const reportData = buildWeeklyReportData();
  const { win, talentReports } = reportData;
  const activeReports = talentReports.filter(r => r.hasMovement);
  const displayReports = weeklyActiveOnly ? activeReports : talentReports;

  // 1. メインダッシュボード上部のクイックハイライトバナー描画
  const dashBanner = document.getElementById('dashWeeklyHighlightBanner');
  if (dashBanner) {
    const previewList = activeReports.slice(0, 6);
    const previewRowsHtml = previewList.length > 0
      ? previewList.map(r => {
          const c = talentColor(r.talent);
          return `<div class="weekly-digest-row" style="padding:7px 12px;font-size:.82rem;">
            <span class="weekly-digest-name">
              <span class="talent-badge-sm" style="background:${c}">${escapeHtml(r.shortName)}</span>
            </span>
            <span class="weekly-digest-text">${escapeHtml(r.oneLineSummary)}</span>
          </div>`;
        }).join('')
      : '<div style="font-size:.82rem;color:var(--text-muted);padding:4px 0;">現在表示できる動き・予定はありません</div>';

    dashBanner.innerHTML = `
      <div class="weekly-dash-banner-top">
        <div class="weekly-dash-banner-title">
          <span>📢 週次報告ハイライト（${escapeHtml(win.modeName)}）</span>
          <span style="font-size:.72rem;font-weight:700;background:var(--accent-light);color:var(--accent);padding:2px 8px;border-radius:10px;">動き・予定あり ${activeReports.length}名</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button class="btn btn-secondary btn-sm" onclick="copyWeeklyReportText()" style="padding:5px 12px;font-size:.75rem;">📋 報告文コピー</button>
          <button class="btn btn-primary btn-sm" onclick="showSection('weekly_report')" style="padding:5px 14px;font-size:.75rem;">週次報告ページを開く →</button>
        </div>
      </div>
      <div class="weekly-dash-preview-list">${previewRowsHtml}</div>
    `;
  }

  // 2. 週次報告ページの描画
  const periodLabelEl = document.getElementById('weeklyPeriodLabel');
  if (periodLabelEl) {
    periodLabelEl.textContent = `集計期間: ${win.rangeStr} （今後のスケジュール表示: ${win.schedRangeStr}）`;
  }

  const totalAudUpdates = talentReports.reduce((sum, r) => sum + r.displayAuditions.length, 0);
  const totalSchedules = talentReports.reduce((sum, r) => sum + r.schedules.length, 0);
  const totalSalesMoves = talentReports.reduce((sum, r) => sum + r.salesMoves.length, 0);

  const kpiEl = document.getElementById('weeklyKpiStrip');
  if (kpiEl) {
    kpiEl.innerHTML = `
      <div class="weekly-kpi-box"><span class="weekly-kpi-lbl">🔥 動き・予定あり</span><span class="weekly-kpi-val" style="color:var(--accent)">${activeReports.length} <small style="font-size:.75rem">名</small></span></div>
      <div class="weekly-kpi-box"><span class="weekly-kpi-lbl">🎬 案件アップデート/進行</span><span class="weekly-kpi-val">${totalAudUpdates} <small style="font-size:.75rem">件</small></span></div>
      <div class="weekly-kpi-box"><span class="weekly-kpi-lbl">📅 カレンダー・予定</span><span class="weekly-kpi-val">${totalSchedules} <small style="font-size:.75rem">件</small></span></div>
      <div class="weekly-kpi-box"><span class="weekly-kpi-lbl">💼 営業提案・動き</span><span class="weekly-kpi-val">${totalSalesMoves} <small style="font-size:.75rem">件</small></span></div>
    `;
  }

  // 3. ワンラインダイジェスト（谷口 ～ / 中塚 ～）
  const digestListEl = document.getElementById('weeklyDigestList');
  if (digestListEl) {
    if (displayReports.length === 0) {
      digestListEl.innerHTML = '<div class="empty-state" style="padding:20px;"><p>対象期間にアップデートや予定があるタレントはいません（「動き・予定ありのみ表示」をオフにすると全員表示されます）</p></div>';
    } else {
      digestListEl.innerHTML = displayReports.map(r => {
        const c = talentColor(r.talent);
        return `<div class="weekly-digest-row">
          <span class="weekly-digest-name">
            <span class="talent-badge-sm" style="background:${c};font-size:.75rem;padding:3px 10px;">${escapeHtml(r.shortName)}</span>
          </span>
          <span class="weekly-digest-text">${escapeHtml(r.oneLineSummary)}</span>
        </div>`;
      }).join('');
    }
  }

  const taEl = document.getElementById('weeklyReportTextarea');
  if (taEl) {
    taEl.value = buildWeeklyReportPlainText(reportData);
  }

  // 4. タレント別 詳細ハイライトカード
  const cardsGridEl = document.getElementById('weeklyTalentCardsGrid');
  if (!cardsGridEl) return;

  if (displayReports.length === 0) {
    cardsGridEl.innerHTML = '';
    return;
  }

  cardsGridEl.innerHTML = displayReports.map(r => {
    const c = talentColor(r.talent);
    const icon = talentIcon(r.talent);

    // 案件セクション
    let audHtml = '';
    if (r.displayAuditions.length > 0) {
      const items = r.displayAuditions.map(a => {
        const stBadgeColor = a.isPass ? '#10B981' : a.status === '2次以降AD' ? '#e2000f' : a.status === '応募準備' ? '#F59E0B' : '#3B82F6';
        const reasonsHtml = a.reasons.map(rg => `<span style="font-size:.65rem;background:var(--accent-light);color:var(--accent);padding:1px 6px;border-radius:4px;font-weight:700;margin-left:4px;">${escapeHtml(rg)}</span>`).join('');
        const actHtml = a.action ? `<span style="color:var(--text-muted);font-size:.75rem;margin-left:6px;">👉 ${escapeHtml(a.action)}</span>` : '';
        return `<li class="weekly-bullet-item">
          ・<strong>${escapeHtml(a.name)}</strong>
          <span style="font-size:.66rem;background:${stBadgeColor}18;color:${stBadgeColor};border:1px solid ${stBadgeColor}44;padding:1px 6px;border-radius:4px;font-weight:700;margin-left:4px;">${escapeHtml(a.isPass ? '🎉 合格/受注' : a.status)}</span>
          ${reasonsHtml}
          ${actHtml}
          <button onclick="openEditModal('${escapeHtml(a.id)}')" title="案件を編集" style="background:none;border:none;cursor:pointer;font-size:.75rem;margin-left:4px;">✏️</button>
        </li>`;
      }).join('');
      audHtml = `<div>
        <div class="weekly-sec-title">🎬 案件・オーディションの動き（${r.displayAuditions.length}件）</div>
        <ul class="weekly-bullet-list">${items}</ul>
      </div>`;
    }

    // カレンダー・予定セクション
    let schedHtml = '';
    if (r.schedules.length > 0) {
      const items = r.schedules.map(s => {
        const timePart = s.timeStr ? `<strong style="margin-left:4px;">${escapeHtml(s.timeStr)}</strong>` : '';
        const subPart = s.sub ? `<span style="font-size:.72rem;color:var(--text-muted);margin-left:6px;">(${escapeHtml(s.sub)})</span>` : '';
        return `<li class="weekly-bullet-item">
          ・<span style="font-size:.64rem;background:${s.badgeColor}18;color:${s.badgeColor};padding:1px 5px;border-radius:4px;font-weight:700;margin-right:4px;">${escapeHtml(s.badge)}</span>
          <strong>${escapeHtml(s.dateStr)}</strong>${timePart}
          <span style="margin-left:4px;">${escapeHtml(s.title)}</span>${subPart}
        </li>`;
      }).join('');
      schedHtml = `<div>
        <div class="weekly-sec-title">📅 Googleカレンダー ＆ 直近スケジュール（${r.schedules.length}件）</div>
        <ul class="weekly-bullet-list">${items}</ul>
      </div>`;
    }

    // 営業セクション
    let salesHtml = '';
    if (r.salesMoves.length > 0) {
      const items = r.salesMoves.map(s => {
        const nextPart = s.nextAction ? `<span style="font-size:.73rem;color:var(--text-muted);margin-left:6px;">次回${s.nextDate ? '(' + escapeHtml(s.nextDate) + ')' : ''}: ${escapeHtml(s.nextAction)}</span>` : '';
        return `<li class="weekly-bullet-item">
          ・<strong>${escapeHtml(s.company)}</strong>
          <span style="font-size:.65rem;background:var(--bg-alt);border:1px solid var(--border);padding:1px 6px;border-radius:4px;font-weight:700;margin-left:4px;">${escapeHtml(s.status)}</span>
          ${nextPart}
        </li>`;
      }).join('');
      salesHtml = `<div>
        <div class="weekly-sec-title">💼 営業アタック・提案（${r.salesMoves.length}件）</div>
        <ul class="weekly-bullet-list">${items}</ul>
      </div>`;
    }

    // ニュースセクション
    let newsHtml = '';
    if (r.newsMoves.length > 0) {
      const items = r.newsMoves.slice(0, 2).map(n => {
        return `<li class="weekly-bullet-item">・<a href="${escapeHtml(n['リンク'] || '#')}" target="_blank" style="color:var(--accent);text-decoration:none;font-weight:600;">${escapeHtml(n['タイトル'])}</a> <span style="font-size:.7rem;color:var(--text-muted);">(${escapeHtml(n['日付'] || '')})</span></li>`;
      }).join('');
      newsHtml = `<div>
        <div class="weekly-sec-title">📰 最新ニュース（${r.newsMoves.length}件）</div>
        <ul class="weekly-bullet-list">${items}</ul>
      </div>`;
    }

    const emptyHtml = (!audHtml && !schedHtml && !salesHtml && !newsHtml)
      ? '<div style="font-size:.8rem;color:var(--text-muted);">この期間のアップデート・予定はありません</div>'
      : '';

    return `<div class="weekly-talent-card">
      <div style="height:4px;background:${c};width:100%;"></div>
      <div class="weekly-talent-card-head">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.2rem;">${icon}</span>
          <span style="font-weight:900;font-size:1rem;">${escapeHtml(r.talent)}</span>
          <span class="talent-badge-sm" style="background:${c}">${escapeHtml(r.shortName)}</span>
        </div>
        <div style="display:flex;gap:6px;font-size:.7rem;font-weight:700;color:var(--text-muted);">
          <span>案件 ${r.displayAuditions.length}</span>
          <span>・</span>
          <span>予定 ${r.schedules.length}</span>
          ${r.salesMoves.length ? `<span>・営業 ${r.salesMoves.length}</span>` : ''}
        </div>
      </div>
      <div class="weekly-talent-card-body">
        ${audHtml}${schedHtml}${salesHtml}${newsHtml}${emptyHtml}
      </div>
    </div>`;
  }).join('');
}
