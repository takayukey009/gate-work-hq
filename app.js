// ===== GATE Audition Dashboard =====
const SHEET_ID = '1NBZce4Xqx7FgbXujQlaO15xd-nAZvUmAqBVGRBgIaGU';
const MANAGED_TALENTS = ['谷口彩菜','寺崎ひな','小久保宏紀','島田和奏','中塚智','太田陽菜'];
const TALENT_COLORS = {
  '谷口彩菜':'#E60012','寺崎ひな':'#3B82F6','小久保宏紀':'#8B5CF6',
  '島田和奏':'#F59E0B','中塚智':'#10B981','太田陽菜':'#EC4899'
};
const TALENT_ICONS = {
  '谷口彩菜':'🌸','寺崎ひな':'⭐','小久保宏紀':'🎭',
  '島田和奏':'🌟','中塚智':'🎬','太田陽菜':'🌻'
};
const STATUS_ORDER = ['情報収集','応募準備','書類送付済','オーディション済','結果待ち','完了'];
const STATUS_MAP = {info:'情報収集',prep:'応募準備',sent:'書類送付済',done:'オーディション済',wait:'結果待ち',complete:'完了'};
const GENRE_ICONS = {'映画':'🎬','ドラマ':'📺','舞台':'🎭','CM':'📢','MV':'🎵','Web':'🌐','広告':'📸','ショートドラマ':'📱','バラエティ':'🎪'};
const TYPE_ICONS = {'オーディション':'🎤','オファー':'📩','レギュラー':'📺','イベント':'🎪','撮影':'📸','その他':'📋'};
const TYPE_COLORS = {'オーディション':'#e2000f','オファー':'#10B981','レギュラー':'#3B82F6','イベント':'#F59E0B','撮影':'#8B5CF6','その他':'#6B7280'};

let allData = [];
let calendarEvents = [];
let currentTalent = 'all';
let currentSection = 'dashboard';
let calYear, calMonth;

// ===== Data Fetch =====
async function fetchSheetData(sheet) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheet)}`;
  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const cols = json.table.cols.map(c => c.label || '');
  return (json.table.rows || []).map(r => {
    const obj = {};
    r.c.forEach((cell, i) => { obj[cols[i]] = cell ? (cell.v != null ? String(cell.v) : '') : ''; });
    return obj;
  });
}

const FALLBACK_DATA = [
  {ID:'1',タレント名:'中塚智',オーディション名:'映画『夜明けの街』 主演キャスト',ジャンル:'映画',締切日:'2026/05/20',オーディション日:'2026/05/28',ステータス:'書類送付済',対応者:'マネージャー',アクション:'写真追加して再送',結果:'未定',備考:'監督指名あり',登録日:'2026/05/10',更新日:'2026/05/12',資料リンク:''},
  {ID:'2',タレント名:'中塚智',オーディション名:'NHKドラマ ゲスト出演',ジャンル:'ドラマ',締切日:'2026/05/15',オーディション日:'2026/05/22',ステータス:'オーディション済',対応者:'本人',アクション:'',結果:'結果待ち',備考:'2次審査通過',登録日:'2026/05/05',更新日:'2026/05/12',資料リンク:''},
  {ID:'3',タレント名:'中塚智',オーディション名:'サントリー CM',ジャンル:'CM',締切日:'2026/05/25',オーディション日:'',ステータス:'応募準備',対応者:'マネージャー',アクション:'プロフィール更新必要',結果:'未定',備考:'ギャラ:80万',登録日:'2026/05/11',更新日:'2026/05/12',資料リンク:''},
  {ID:'4',タレント名:'谷口彩菜',オーディション名:'舞台『蒼の彼方』',ジャンル:'舞台',締切日:'2026/05/18',オーディション日:'2026/05/30',ステータス:'書類送付済',対応者:'本人',アクション:'',結果:'未定',備考:'ダンス審査あり',登録日:'2026/05/08',更新日:'2026/05/12',資料リンク:''},
  {ID:'5',タレント名:'谷口彩菜',オーディション名:'YouTubeドラマ レギュラー',ジャンル:'Web',締切日:'2026/05/30',オーディション日:'',ステータス:'情報収集',対応者:'マネージャー',アクション:'詳細確認中',結果:'未定',備考:'週3回撮影',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'6',タレント名:'寺崎ひな',オーディション名:'ABEMA恋愛リアリティ',ジャンル:'バラエティ',締切日:'2026/05/22',オーディション日:'2026/06/01',ステータス:'応募準備',対応者:'本人',アクション:'自己PR動画撮影',結果:'未定',備考:'',登録日:'2026/05/10',更新日:'2026/05/12',資料リンク:''},
  {ID:'7',タレント名:'寺崎ひな',オーディション名:'ショートドラマ 主演',ジャンル:'ショートドラマ',締切日:'2026/05/16',オーディション日:'2026/05/20',ステータス:'オーディション済',対応者:'マネージャー',アクション:'スケジュール調整',結果:'結果待ち',備考:'先方から好感触',登録日:'2026/05/06',更新日:'2026/05/12',資料リンク:''},
  {ID:'8',タレント名:'小久保宏紀',オーディション名:'MV出演 アーティスト未定',ジャンル:'MV',締切日:'2026/06/05',オーディション日:'',ステータス:'情報収集',対応者:'マネージャー',アクション:'ギャラ確認',結果:'未定',備考:'',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'9',タレント名:'小久保宏紀',オーディション名:'化粧品ブランド モデル',ジャンル:'広告',締切日:'2026/05/19',オーディション日:'2026/05/26',ステータス:'書類送付済',対応者:'本人',アクション:'',結果:'未定',備考:'コンポジット写真必須',登録日:'2026/05/09',更新日:'2026/05/11',資料リンク:''},
  {ID:'10',タレント名:'島田和奏',オーディション名:'インディーズ映画 助演',ジャンル:'映画',締切日:'2026/06/10',オーディション日:'',ステータス:'情報収集',対応者:'マネージャー',アクション:'監督にコンタクト',結果:'未定',備考:'低予算だが良作の可能性',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
  {ID:'11',タレント名:'島田和奏',オーディション名:'アパレルブランド シーズンモデル',ジャンル:'CM',締切日:'2026/05/14',オーディション日:'2026/05/17',ステータス:'完了',対応者:'本人',アクション:'',結果:'合格',備考:'初のCM案件！',登録日:'2026/04/28',更新日:'2026/05/10',資料リンク:''},
  {ID:'12',タレント名:'太田陽菜',オーディション名:'舞台『月光』 ヒロイン',ジャンル:'舞台',締切日:'2026/04/20',オーディション日:'2026/05/05',ステータス:'完了',対応者:'本人',アクション:'',結果:'不合格',備考:'次回作で再挑戦',登録日:'2026/04/15',更新日:'2026/05/08',資料リンク:''},
  {ID:'13',タレント名:'太田陽菜',オーディション名:'ドラマ『翔ぶ季節』 レギュラー',ジャンル:'ドラマ',締切日:'2026/05/28',オーディション日:'2026/06/05',ステータス:'応募準備',対応者:'マネージャー',アクション:'オーディション用写真手配',結果:'未定',備考:'人気原作',登録日:'2026/05/11',更新日:'2026/05/12',資料リンク:''},
  {ID:'14',タレント名:'谷口彩菜',オーディション名:'アパレルECモデル',ジャンル:'CM',締切日:'2026/06/01',オーディション日:'',ステータス:'情報収集',対応者:'本人',アクション:'',結果:'未定',備考:'',登録日:'2026/05/12',更新日:'2026/05/12',資料リンク:''},
];

async function loadData() {
  try {
    allData = await fetchSheetData('シート1');
    renderAll();
    document.getElementById('loadingOverlay').classList.add('hidden');
  } catch (e) {
    console.warn('スプレッドシート読み込み失敗。フォールバックデータを使用:', e.message);
    allData = FALLBACK_DATA;
    renderAll();
    document.getElementById('loadingOverlay').classList.add('hidden');
  }
  // 売上データを非同期で取得（ダッシュボード表示後）
  loadSalesData();
  // カレンダーデータを非同期で取得
  loadCalendarData();
}

async function loadCalendarData() {
  if (!GAS_WEBAPP_URL) return;
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();
    const url = `${GAS_WEBAPP_URL}?action=calendar&start=${start}&end=${end}`;
    const res = await fetch(url, { redirect: 'follow', mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && json.events) {
      calendarEvents = json.events;
      console.log(`カレンダー: ${calendarEvents.length}件取得`);
      if (currentSection === 'calendar') renderCalendar();
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
}

// ===== Sales Data =====
const MONTH_LABELS = ['7月','8月','9月','10月','11月','12月','1月','2月','3月','4月','5月','6月'];

async function loadSalesData() {
  if (!GAS_WEBAPP_URL) {
    document.getElementById('salesLoading').textContent = '⚠️ GAS WebApp URLが未設定です';
    return;
  }
  try {
    const res = await fetch(GAS_WEBAPP_URL + '?action=sales');
    const json = await res.json();
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

// ===== Stats =====
function renderStats() {
  const data = getFiltered();
  const active = data.filter(d => d['ステータス'] !== '完了');
  const deadlineSoon = data.filter(d => { const du = daysUntil(d['締切日']); return du >= 0 && du <= 7; });
  const passed = data.filter(d => d['結果'] === '合格');
  const managerAction = data.filter(d => d['対応者'] === 'マネージャー' && d['ステータス'] !== '完了' && d['アクション']);
  document.getElementById('statsGrid').innerHTML = [
    statCard('📋', active.length, '進行中', ''),
    statCard('⏰', deadlineSoon.length, '今週の締切', ''),
    statCard('✅', passed.length, '合格', ''),
    statCard('⚡', managerAction.length, '対応待ち', 'urgent'),
  ].join('');
}

function statCard(icon, val, label, cls) {
  return `<div class="stat-card ${cls}"><span class="stat-icon">${icon}</span><div class="stat-body"><span class="stat-value">${val}</span><span class="stat-label">${label}</span></div></div>`;
}

// ===== Action Panel =====
function renderActionPanel() {
  const data = getFiltered().filter(d => d['対応者'] === 'マネージャー' && d['ステータス'] !== '完了' && d['アクション']);
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
  list.innerHTML = data.map(d => `<div class="action-item">
    <span class="action-talent-badge" style="background:${talentColor(d['タレント名'])}">${d['タレント名']}</span>
    <div class="action-info"><div class="action-title">${d['オーディション名']}</div><div class="action-desc">${d['アクション']}</div></div>
    <span class="action-due">${d['締切日'] ? '〆 '+fmtDate(d['締切日']) : ''}</span>
  </div>`).join('');
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
    return `<div class="deadline-item"><div class="deadline-date"><span class="day ${urgent}">${dd?dd.getDate():'-'}</span><span class="month">${dd?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dd.getMonth()]:''}</span></div><div class="deadline-info"><div class="deadline-title">${d['オーディション名']}</div><div class="deadline-meta"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${d['タレント名']}</span> ${du<=0?'⚠️ 今日！':du+'日後'}</div></div></div>`;
  }).join('');
}

// ===== Recent =====
function renderRecent() {
  const data = [...getFiltered()].sort((a,b) => (b['更新日']||'').localeCompare(a['更新日']||'')).slice(0, 5);
  const el = document.getElementById('dashRecent');
  if (!data.length) { el.innerHTML = '<div class="empty-state"><div class="empty-icon">📝</div><p>データなし</p></div>'; return; }
  el.innerHTML = data.map(d => `<div class="deadline-item"><div class="deadline-info"><div class="deadline-title">${d['オーディション名']}</div><div class="deadline-meta"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${d['タレント名']}</span> ${d['ステータス']} ${d['結果']&&d['結果']!=='未定'?'→ '+d['結果']:''}</div></div><span style="font-size:.7rem;color:var(--text-muted)">${fmtDate(d['更新日'])}</span></div>`).join('');
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
    return `<div class="talent-summary-card" style="cursor:pointer" onclick="setTalent('${t}')"><div style="position:absolute;top:0;left:0;right:0;height:3px;background:${talentColor(t)}"></div><div class="talent-summary-top"><span class="talent-icon">${talentIcon(t)}</span><span class="talent-summary-name">${t}</span></div><div class="talent-stats-row"><div class="talent-stat-item"><span class="talent-stat-num">${total}</span><span class="talent-stat-lbl">総数</span></div><div class="talent-stat-item"><span class="talent-stat-num">${active}</span><span class="talent-stat-lbl">進行中</span></div><div class="talent-stat-item"><span class="talent-stat-num">${pass}</span><span class="talent-stat-lbl">合格</span></div></div></div>`;
  }).join('');
}

// ===== Kanban =====
function renderKanban() {
  const data = getFiltered();
  const map = {info:'情報収集',prep:'応募準備',sent:'書類送付済',done:'オーディション済',wait:'結果待ち',complete:'完了'};
  // Also map result-based statuses
  Object.keys(map).forEach(k => {
    const cards = data.filter(d => {
      if (k === 'wait') return d['結果'] === '結果待ち';
      if (k === 'complete') return d['ステータス'] === '完了' || d['結果'] === '合格' || d['結果'] === '不合格';
      if (k === 'wait') return false;
      return d['ステータス'] === map[k] && d['結果'] !== '結果待ち' && d['結果'] !== '合格' && d['結果'] !== '不合格';
    });
    const container = document.getElementById('cards-'+k);
    const countEl = document.getElementById('count-'+k);
    if (!container) return;
    container.innerHTML = cards.map(d => kanbanCard(d)).join('');
    if (countEl) countEl.textContent = cards.length;
  });
  // Simpler approach: distribute by status
  const buckets = {info:[],prep:[],sent:[],done:[],wait:[],complete:[]};
  data.forEach(d => {
    const s = d['ステータス'];
    const r = d['結果'];
    if (r === '合格' || r === '不合格') { buckets.complete.push(d); return; }
    if (r === '結果待ち') { buckets.wait.push(d); return; }
    if (s === '情報収集') buckets.info.push(d);
    else if (s === '応募準備') buckets.prep.push(d);
    else if (s === '書類送付済') buckets.sent.push(d);
    else if (s === 'オーディション済') buckets.done.push(d);
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
  const resultCls = d['結果']==='合格'?'result-pass':d['結果']==='不合格'?'result-fail':d['結果']==='結果待ち'?'result-waiting':'';
  const fileLink = d['資料リンク'] ? `<a href="${d['資料リンク']}" target="_blank" style="font-size:.6rem;color:var(--accent);text-decoration:none">📎 資料</a>` : '';
  return `<div class="kanban-card"><div class="kanban-card-talent"><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${d['タレント名']}</span></div><div class="kanban-card-title">${d['オーディション名']}</div><div class="kanban-card-meta">${d['締切日']?'〆 '+fmtDate(d['締切日']):''} ${d['対応者']==='マネージャー'?'<span style="color:var(--accent)">●MGR</span>':''}</div><span class="kanban-card-genre">${GENRE_ICONS[d['ジャンル']]||'📋'} ${d['ジャンル']}</span>${resultCls?` <span class="kanban-card-result ${resultCls}">${d['結果']}</span>`:''}${d['アクション']?`<div style="font-size:.65rem;color:var(--text-muted);margin-top:4px">→ ${d['アクション']}</div>`:''}${fileLink?`<div style="margin-top:4px">${fileLink}</div>`:''}</div>`;
}

// ===== List =====
let listFilter = 'all';
let listSearch = '';
let listSort = {col:'deadline',asc:true};

function renderList() {
  let data = getFiltered();
  if (listFilter === 'active') data = data.filter(d => d['ステータス']!=='完了' && d['結果']!=='合格' && d['結果']!=='不合格');
  else if (listFilter === '合格') data = data.filter(d => d['結果']==='合格');
  else if (listFilter === '不合格') data = data.filter(d => d['結果']==='不合格');
  if (listSearch) { const q = listSearch.toLowerCase(); data = data.filter(d => d['オーディション名'].toLowerCase().includes(q)); }
  if (listSort.col === 'deadline') data.sort((a,b) => (listSort.asc?1:-1)*(daysUntil(a['締切日'])-daysUntil(b['締切日'])));
  else if (listSort.col === 'talent') data.sort((a,b) => (listSort.asc?1:-1)*a['タレント名'].localeCompare(b['タレント名']));
  else if (listSort.col === 'name') data.sort((a,b) => (listSort.asc?1:-1)*a['オーディション名'].localeCompare(b['オーディション名']));

  const el = document.getElementById('listBody');
  el.innerHTML = data.map(d => {
    const sCls = d['ステータス']==='情報収集'?'status-info':d['ステータス']==='応募準備'?'status-prep':d['ステータス']==='書類送付済'?'status-sent':d['ステータス']==='オーディション済'?'status-auditioned':'status-completed';
    const rCls = d['結果']==='合格'?'result-pass':d['結果']==='不合格'?'result-fail':d['結果']==='結果待ち'?'result-waiting':'';
    const ownerCls = d['対応者']==='マネージャー'?'owner-manager':'';
    const fileLink = d['資料リンク'] ? `<a href="${d['資料リンク']}" target="_blank" style="font-size:.7rem;color:var(--accent)">📎</a>` : '';
    return `<tr><td><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${d['タレント名']}</span></td><td>${d['オーディション名']} ${fileLink}</td><td>${GENRE_ICONS[d['ジャンル']]||''} ${d['ジャンル']}</td><td>${fmtDate(d['締切日'])}</td><td><span class="status-badge ${sCls}">${d['ステータス']}</span></td><td class="${ownerCls}">${d['対応者']}</td><td>${rCls?`<span class="kanban-card-result ${rCls}">${d['結果']}</span>`:d['結果']||'-'}</td><td style="font-size:.75rem;color:var(--text-muted)">${d['アクション']||'-'}</td></tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">📭</div><p>該当なし</p></div></td></tr>';
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

  // Googleカレンダーイベントをフィルタ
  const filteredCalEvents = calendarEvents.filter(ev => {
    if (currentTalent !== 'all' && ev.talent !== currentTalent) return false;
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
  if (!GAS_WEBAPP_URL) return;
  try {
    const start = new Date(calYear, calMonth, 1).toISOString();
    const end = new Date(calYear, calMonth + 1, 0, 23, 59, 59).toISOString();
    // 既にデータがあるか確認
    const hasData = calendarEvents.some(ev => {
      const d = new Date(ev.start);
      return d.getMonth() === calMonth && d.getFullYear() === calYear;
    });
    if (hasData) return;
    const res = await fetch(`${GAS_WEBAPP_URL}?action=calendar&start=${start}&end=${end}`);
    const json = await res.json();
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
    const done = td.filter(d => d['結果']==='合格'||d['結果']==='不合格').length;
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
  const titles = {dashboard:'ダッシュボード',kanban:'カンバン',works:'仕事一覧',list:'リスト（AD）',calendar:'カレンダー',stats:'統計'};
  document.getElementById('pageTitle').textContent = titles[section] || section;
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  // Date
  const now = new Date();
  const days = ['日','月','火','水','木','金','土'];
  document.getElementById('currentDate').textContent = `${now.getMonth()+1}/${now.getDate()} (${days[now.getDay()]})`;

  // Nav
  document.querySelectorAll('.nav-item').forEach(n => {
    n.addEventListener('click', e => { e.preventDefault(); showSection(n.dataset.section); });
  });

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

  // Load data
  loadData();
});

// ===== GAS WebApp URL =====
// デプロイ後にここにURLを設定してください
const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx2AiGQCpXq2MtCJivMUnMQo83A0lrn6gXIfF9Y1PqEZFFtPQh38aOsu0vQPY1PVFT_7A/exec';

// ===== Modal =====
let selectedFile = null;

function openAddModal() {
  document.getElementById('addModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('addForm').reset();
  clearFile();
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAddModal();
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
    result: '未定',
    notes: document.getElementById('f-notes').value,
  };

  // ファイルをBase64に変換
  if (selectedFile) {
    try {
      formData.fileBase64 = await fileToBase64(selectedFile);
      formData.fileName = selectedFile.name;
      formData.fileMimeType = selectedFile.type;
    } catch (err) {
      console.warn('ファイル読み込みエラー:', err);
    }
  }

  try {
    if (GAS_WEBAPP_URL) {
      // GAS WebAppに送信
      const res = await fetch(GAS_WEBAPP_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        showToast('✅ スプレッドシートに追加しました！');
      } else {
        throw new Error(result.error || '送信失敗');
      }
    } else {
      // GAS未設定: ローカルデータに直接追加
      showToast('📝 ローカルデータに追加しました（GAS WebApp URLを設定するとスプシ連携可能）');
    }

    // ローカルデータにも即時反映
    const today = new Date();
    const todayStr = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
    allData.push({
      ID: String(allData.length + 1),
      案件種別: formData.type || 'オーディション',
      タレント名: formData.talentName,
      オーディション名: formData.auditionName,
      ジャンル: formData.genre,
      締切日: formData.deadline,
      オーディション日: formData.auditionDate,
      ステータス: formData.status,
      対応者: formData.owner,
      アクション: formData.action,
      結果: '未定',
      備考: formData.notes,
      登録日: todayStr,
      更新日: todayStr,
      資料リンク: '',
    });
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
function addAudDate() {
  const list = document.getElementById('auddateList');
  const row = document.createElement('div');
  row.className = 'auddate-row';
  row.innerHTML = '<input type="date" class="auddate-input"><button type="button" class="auddate-remove" onclick="removeAudDate(this)" title="削除">✕</button>';
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
    `<div class="works-type-badge" style="--type-color:${TYPE_COLORS[t] || '#888'}">${TYPE_ICONS[t] || '📋'} ${t} <strong>${c}</strong></div>`
  ).join('');

  // Table
  const el = document.getElementById('worksBody');
  el.innerHTML = data.map(d => {
    const type = d['案件種別'] || 'オーディション';
    const typeColor = TYPE_COLORS[type] || '#888';
    const sCls = d['ステータス']==='情報収集'?'status-info':d['ステータス']==='応募準備'?'status-prep':d['ステータス']==='書類送付済'?'status-sent':d['ステータス']==='オーディション済'?'status-auditioned':'status-completed';
    const dateStr = d['オーディション日'] ? fmtDate(d['オーディション日']) : (d['締切日'] ? '〆'+fmtDate(d['締切日']) : '-');
    return `<tr>
      <td><span class="type-badge" style="background:${typeColor}">${TYPE_ICONS[type]||''} ${type}</span></td>
      <td><span class="talent-badge-sm" style="background:${talentColor(d['タレント名'])}">${d['タレント名']}</span></td>
      <td>${d['オーディション名']}</td>
      <td>${GENRE_ICONS[d['ジャンル']]||''} ${d['ジャンル']}</td>
      <td>${dateStr}</td>
      <td><span class="status-badge ${sCls}">${d['ステータス']}</span></td>
      <td>${d['対応者']}</td>
      <td style="font-size:.75rem;color:var(--text-muted)">${d['備考']||'-'}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">📭</div><p>該当する案件はありません</p></div></td></tr>';
}
