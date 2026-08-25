// ===================== DATA =====================

const STORIES = [
  { emoji:"💰", av:"av-blue", category:"Деньги",
    title:"Он потратил общие сбережения на бизнес брата",
    sender:"Аня", preview:"Проблема не в сумме, а в том, что решение принято за двоих",
    time:"09:12", pct:[48,42,10], featured:true },

  { emoji:"❤️", av:"av-pink", category:"Отношения",
    title:"Девушка требует, чтобы парень не общался с бывшей после свадьбы",
    sender:"Кирилл", preview:"Запрет на общение — это не про доверие, это про контроль",
    time:"08:40", pct:[39,44,17] },

  { emoji:"💼", av:"av-orange", category:"Работа",
    title:"Начальник забрал идею сотрудника и выдал её за свою",
    sender:"Марина", preview:"Здесь 71% сразу сошлись во мнении — редкий случай",
    time:"08:15", pct:[71,12,17] },

  { emoji:"🧑‍🤝‍🧑", av:"av-green", category:"Друзья",
    title:"Стоит ли говорить другу, что его новая компания обречена?",
    sender:"Ты", preview:"Молчание тоже выбор, и за него тоже отвечаешь",
    time:"вчера", pct:[33,41,26] },

  { emoji:"👨‍👩‍👧", av:"av-violet", category:"Семья",
    title:"Родители попросили дочь съехать после 25 лет",
    sender:"Олег", preview:"Вердикт закрыт: 46% против 38% — почти ничья",
    time:"вчера", pct:[46,38,16] },
];

const RESULT_DEMOGRAPHICS = {
  gender: [
    { label:"Мужчины", pct:[30,30,40] },
    { label:"Женщины", pct:[67,25,8] },
  ],
  age: [
    { label:"18–24", pct:[58,30,12] },
    { label:"25–34", pct:[62,28,10] },
    { label:"35–44", pct:[64,28,8] },
    { label:"45+", pct:[57,32,11] },
  ],
  city: [
    { label:"Москва", pct:[60,30,10] },
    { label:"Санкт-Петербург", pct:[63,28,9] },
    { label:"Другие города", pct:[61,29,10] },
  ],
};

const DEMO_TAB_LABELS = { gender:"Пол", age:"Возраст", city:"Город" };

const ONBOARD_SLIDES = [
  { emoji:"📖", title:"Каждый день — история из жизни", text:"Настоящая ситуация, из-за которой люди в интернете уже перессорились." },
  { emoji:"⚖️", title:"Скажи, кто прав", text:"Сначала твоё мнение — до того, как ты увидишь чужие." },
  { emoji:"💬", title:"А потом читай, что думают другие", text:"Тысячи комментариев, живой спор и общий ответ в конце дня." },
];

const CATEGORY_CHIPS = [
  { emoji:"❤️", name:"Отношения" },
  { emoji:"💼", name:"Работа" },
  { emoji:"👨‍👩‍👧", name:"Семья" },
  { emoji:"💰", name:"Деньги" },
  { emoji:"🤖", name:"Технологии" },
  { emoji:"⚖️", name:"Этика" },
  { emoji:"😂", name:"Абсурд" },
  { emoji:"🌍", name:"Общество" },
];

const NOTIFICATIONS = [
  { icon:"📣", title:"Сегодняшние 5 историй уже здесь", desc:"Новый день — новые споры", time:"сегодня утром", unread:true },
  { icon:"🔥", title:"Вердикт готов", desc:"61% участников согласились с тобой", time:"2 ч назад", unread:true },
  { icon:"🧠", title:"После твоего комментария 12 человек передумали", desc:"Посмотри, какие именно", time:"5 ч назад", unread:true },
  { icon:"🏆", title:"Ты вошёл в топ-5% участников", desc:"Среди всех, кто голосовал сегодня", time:"вчера", unread:true },
  { icon:"👀", title:"У твоей истории уже 1 824 голоса", desc:"Обсуждение набирает обороты", time:"вчера", unread:false },
];

const VOTE_LABELS = { him:"он неправ", her:"она неправа", both:"оба неправы", unclear:"мало информации" };
// ===================== DEBATE DATA =====================

const STORY_STATUS = [
  null,                                   // история дня — статус вычисляется
  { key:"none",  label:"Не голосовал" },
  { key:"ready", label:"Вердикт готов" },
  { key:"live",  label:"Обсуждаешь" },
  { key:"done",  label:"Завершён" },
];

const POS = {
  him:     { label:"Неправ муж",    cls:"pos-him" },
  her:     { label:"Неправа жена",  cls:"pos-her" },
  both:    { label:"Оба неправы",   cls:"pos-both" },
  unclear: { label:"Трудно сказать", cls:"pos-both" },
};

// AI-кластеры: агрегированные позиции, а не сообщения конкретных людей
const CLUSTERS = [
  { id:0, text:"Общие деньги нельзя тратить без согласия партнёра", count:1284, pct:30, changed:74,
    summary:"Если деньги общие — и решать надо вместе. Неважно, на что: хоть на помощь родному брату." },
  { id:1, text:"Помощь семье — нормальная причина", count:964, pct:22, changed:31,
    summary:"Помочь брату — святое дело. Он же не в казино их спустил, а выручил родного человека." },
  { id:2, text:"Главная проблема — нарушение доверия", count:741, pct:17, changed:98,
    summary:"Тут спорят уже не про деньги. Обидно не то, что он их отдал, а то, что он промолчал." },
  { id:3, text:"Если бы деньги вернулись, конфликта бы не было", count:512, pct:12, changed:19,
    summary:"Если бы у брата всё получилось, никто бы и не ругался. Просто не повезло — вот и весь конфликт." },
  { id:4, text:"Жена слишком контролирует финансовые решения", count:431, pct:10, changed:24,
    summary:"Жена слишком всё контролирует. Шума получилось больше, чем стоил сам повод." },
  { id:5, text:"Ошиблись оба: один скрыл, вторая не проговорила правила", count:387, pct:9, changed:41,
    summary:"Тут никого не выгораживают. Он зря промолчал — а она за столько лет так и не обсудила, как они тратят общие деньги." },
];

const clusterById = id => CLUSTERS.find(c => c.id === id);

// Реальные комментарии участников
const BASE_COMMENTS = [
  { id:"c1", author:"Мария", av:"av-pink", time:"12 мин", mins:12, position:"him", cluster:0,
    text:"Проблема не в том, что он помог брату. Проблема в том, что он потратил общие накопления, даже не обсудив это с женой.",
    likes:184, liked:false, strong:96, replyCount:37,
    replies:[
      { id:"c1r1", author:"Алекс К.", av:"av-blue", time:"9 мин", position:"her",
        text:"Но деньги в основном зарабатывал он. Разве он не вправе распоряжаться тем, что заработал?", likes:42, liked:false, counter:true },
      { id:"c1r2", author:"Пётр", av:"av-green", time:"7 мин", position:"him",
        text:"Если деньги общие, то и решение должно быть общим. Кто больше заработал — тут вообще ни при чём.", likes:88, liked:false },
      { id:"c1r3", author:"Мария", av:"av-pink", time:"4 мин", position:"him",
        text:"Да, именно поэтому я вижу проблему в доверии, а не в сумме.", likes:61, liked:false },
    ] },

  { id:"c2", author:"Илья", av:"av-blue", time:"8 мин", mins:8, position:"her", cluster:1,
    text:"Если деньги в основном заработал он, почему любое решение о помощи семье должно требовать согласования?",
    likes:126, liked:false, strong:88, replyCount:18,
    replies:[
      { id:"c2r1", author:"Настя", av:"av-violet", time:"6 мин", position:"him",
        text:"Потому что это были накопления на общую квартиру, а не его карманные деньги.", likes:57, liked:false, counter:true },
      { id:"c2r2", author:"Илья", av:"av-blue", time:"3 мин", position:"her",
        text:"Тогда вопрос в том, договаривались ли они об этом заранее. Судя по истории — нет.", likes:24, liked:false },
    ] },

  { id:"c3", author:"Ольга", av:"av-orange", time:"21 мин", mins:21, position:"both", cluster:5,
    text:"Тут ошиблись оба: он скрыл решение, а она за годы так и не проговорила правила общих денег.",
    likes:97, liked:false, strong:74, replyCount:12,
    replies:[
      { id:"c3r1", author:"Дмитрий", av:"av-green", time:"14 мин", position:"both",
        text:"Плюс. Взрослые люди, а бюджет обсуждают только после скандала.", likes:33, liked:false },
    ] },

  { id:"c4", author:"Кирилл", av:"av-green", time:"34 мин", mins:34, position:"him", cluster:2,
    text:"Дело вообще не в 15 тысячах. Он поставил жену перед фактом — и вот это уже не про деньги, а про то, считает ли он её равной в решениях.",
    likes:302, liked:false, strong:99, replyCount:54,
    replies:[
      { id:"c4r1", author:"Женя", av:"av-pink", time:"28 мин", position:"him",
        text:"Вот именно. Верните ему эти деньги — обида всё равно останется.", likes:71, liked:false },
      { id:"c4r2", author:"Тимур", av:"av-orange", time:"22 мин", position:"her",
        text:"А если бы он спросил и она сказала «нет»? Брат остался бы без помощи.", likes:45, liked:false, counter:true },
      { id:"c4r3", author:"Кирилл", av:"av-green", time:"19 мин", position:"him",
        text:"Тогда это было бы их общее решение. Плохое или хорошее — но общее.", likes:92, liked:false },
    ] },

  { id:"c5", author:"Настя", av:"av-violet", time:"47 мин", mins:47, position:"her", cluster:4,
    text:"Мне кажется, она реагирует так резко, потому что вообще не участвует в финансовых решениях. Проблема шире одного займа.",
    likes:88, liked:false, strong:70, replyCount:15, replies:[] },

  { id:"c6", author:"Дмитрий", av:"av-green", time:"1 ч", mins:60, position:"him", cluster:0,
    text:"«Одолжить» — это когда есть договорённость о возврате. Здесь была надежда, а не договорённость.",
    likes:145, liked:false, strong:81, replyCount:22, replies:[] },

  { id:"c7", author:"Лена", av:"av-pink", time:"1 ч", mins:74, position:"her", cluster:1,
    text:"Помогать своей семье — это норма, а не измена. Если бы бизнес выстрелил, никто бы не жаловался.",
    likes:74, liked:false, strong:66, replyCount:9,
    replies:[
      { id:"c7r1", author:"Мария", av:"av-pink", time:"52 мин", position:"him",
        text:"Вот в этом и дело: оценивать решение по результату — так себе аргумент.", likes:58, liked:false, counter:true },
    ] },

  { id:"c8", author:"Артём", av:"av-orange", time:"2 ч", mins:120, position:"both", cluster:3,
    text:"Если бы брат вернул деньги, никто бы вообще не узнал об этом решении.",
    likes:63, liked:false, strong:58, replyCount:7, replies:[] },

  { id:"c9", author:"Вика", av:"av-violet", time:"3 ч", mins:180, position:"him", cluster:2,
    text:"Он не просто потратил деньги. Он четыре месяца молчал, надеясь, что всё как-нибудь обойдётся.",
    likes:119, liked:false, strong:79, replyCount:16, replies:[] },

  { id:"c10", author:"Гоша", av:"av-blue", time:"4 ч", mins:240, position:"her", cluster:4,
    text:"Требовать вернуть сумму из его личных накоплений — это уже наказание, а не решение проблемы.",
    likes:52, liked:false, strong:49, replyCount:6, replies:[] },
];

// AI-вставки внутри ленты обсуждения
const FEED_AI_CARDS = [
  { after:2, kind:"pattern", cluster:2, people:312,
    line:"Проблема здесь не в деньгах, а в доверии." },
  { after:6, kind:"counter", cluster:1,
    line:"Если это были деньги Андрея, почему он должен получать разрешение на помощь собственной семье?" },
];

const TOTAL_VOTES = 18742;

const FINAL_SPLIT = [
  { key:"him",  label:"Неправ муж",   pct:61, color:"var(--green)" },
  { key:"both", label:"Оба неправы",  pct:29, color:"var(--accent)" },
  { key:"her",  label:"Неправа жена", pct:10, color:"var(--gold)" },
];

// ===================== STATE =====================

const state = {
  screen: "home",
  nav: [],
  dailyProgress: 3,
  profile: { score:87, influenceTotal:1248, percentile:92,
    week:{ stories:37, args:112, changed:8, convinced:126, accuracy:68 } },
  resultDemoTab: "gender",
  onboardStep: 0,
  notifications: NOTIFICATIONS,
  selectedCategories: new Set(["Отношения","Деньги"]),
  debate: null,
};

function freshDebate(){
  return {
    started: false,
    vote: null,
    initialVote: null,
    hubTab: "map",
    sort: "top",
    filterCluster: null,
    comments: JSON.parse(JSON.stringify(BASE_COMMENTS)),
    commentTotal: 4321,
    myCommentId: null,
    myCluster: null,
    guess: null,
    changePanelOpen: false,
    changedMind: null,
    finished: false,
    influenceApplied: false,
    challengeSent: false,
    activeThread: null,
    activePosition: null,
    likesGiven: 0,
    repliesGiven: 0,
    demoShowDemographics: false,
  };
}
state.debate = freshDebate();

// ===================== HELPERS =====================

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const fmt = n => n.toLocaleString("ru-RU");
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[ch]));
const posLabel = key => (POS[key] || POS.him).label;
const posClass = key => (POS[key] || POS.him).cls;

let toastTimer = null;
function toast(msg){
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove("show"), 2600);
}

const FULLSCREEN_FLOW = new Set([
  "story","voted","debate","thread","position","verdict","challenge","onboard",
]);

function setScreen(name){
  state.screen = name;
  $$(".screen").forEach(s => s.classList.toggle("active", s.dataset.screen === name));
  $$(".tab-btn").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  if(name === "home") renderHome();
  if(name === "profile") renderProfile();
  if(name === "story") renderStoryScreen();
  if(name === "voted") renderVotedScreen();
  if(name === "debate") renderHub();
  if(name === "thread") renderThread();
  if(name === "position") renderPosition();
  if(name === "verdict") renderFinalVerdict();
  if(name === "challenge") renderChallenge();
  if(name === "onboard") renderOnboard();
  if(name === "hub") renderMoreHub();
  if(name === "notifications") renderNotifications();
  if(name === "categories") renderCategories();
  if(name === "weekly") renderWeekly();
  $("#tabbar").classList.toggle("tabbar-hidden", FULLSCREEN_FLOW.has(name));
  const sc = $(`#screen-${name} .scroll`);
  if(sc) sc.scrollTop = 0;
}

function goTo(name){
  state.nav.push(state.screen);
  setScreen(name);
}
function navBack(fallback){
  const prev = state.nav.pop();
  setScreen(prev || fallback || "home");
}
function goTab(name){
  state.nav = [];
  setScreen(name);
}

// ===================== HOME =====================

function debateStatus(){
  const d = state.debate;
  if(!d.started || !d.vote) return { key:"none", label:"Не голосовал" };
  if(d.finished) return { key:"done", label:"Завершён" };
  return { key:"live", label:"Обсуждаешь" };
}

function renderHome(){
  $("#dp-count").textContent = state.dailyProgress;
  const dots = $("#dp-dots");
  dots.innerHTML = "";
  for(let i=0;i<5;i++){
    const d = document.createElement("span");
    d.className = "dp-dot" + (i < state.dailyProgress ? " filled" : "");
    dots.appendChild(d);
  }

  // «Продолжить» — retention-блок для уже начатых дебатов
  const cont = $("#continue-block");
  const d = state.debate;
  if(d.started && d.vote && !d.finished){
    cont.innerHTML = `
      <div class="section-label">Продолжить</div>
      <button class="continue-card" id="continue-card">
        <div class="continue-top">🔥 Ты уже проголосовал в этой истории</div>
        <div class="continue-title">Последний шанс посмотреть, почему 61% думают иначе</div>
        <div class="continue-meta">
          <span>${fmt(d.commentTotal)} ${plural(d.commentTotal,["комментарий","комментария","комментариев"])}</span>
          <span class="continue-timer">2 часа до конца</span>
        </div>
      </button>
    `;
    $("#continue-card").addEventListener("click", () => { state.nav = ["home"]; setScreen("debate"); });
  } else {
    cont.innerHTML = "";
  }

  const feed = $("#feed");
  feed.innerHTML = "";
  STORIES.forEach((s, i) => {
    const st = i === 0 ? debateStatus() : STORY_STATUS[i];
    const row = document.createElement("div");
    row.className = "chat-row" + (s.featured ? " featured" : "");
    row.innerHTML = `
      <div class="chat-avatar ${s.av}">${s.emoji}</div>
      <div class="chat-main">
        <div class="chat-l1">
          <div class="chat-name">${s.featured ? "🔥 " : ""}${esc(s.title)}</div>
          <div class="chat-time">${s.time}</div>
        </div>
        <div class="chat-l2">
          <div class="chat-preview">${esc(s.preview)}</div>
        </div>
        <div class="chat-votebar" aria-hidden="true">
          ${s.pct.map(p => `<span style="width:${p}%"></span>`).join("")}
        </div>
        <div class="story-status st-${st.key}">${st.label}</div>
      </div>
    `;
    row.addEventListener("click", () => {
      if(s.featured){ openDailyStory(); }
      else { toast("🔒 В прототипе полностью открыта только история дня — остальные появятся в полном запуске."); }
    });
    feed.appendChild(row);
  });
}

// Вход в историю дня: либо чтение истории, либо сразу в Debate Hub
function openDailyStory(){
  const d = state.debate;
  state.nav = ["home"];
  if(d.started && d.vote) setScreen("debate");
  else setScreen("story");
}

function restartDemo(){
  state.debate = freshDebate();
  state.nav = ["home"];
  setScreen("story");
}

// ===================== PROFILE =====================

function renderProfile(){
  $("#profile-influence").textContent = fmt(state.profile.influenceTotal);
  $("#profile-percentile").textContent = state.profile.percentile + "%";
  $("#profile-score").textContent = state.profile.score;
  const w = state.profile.week;
  $("#w-stories").textContent = w.stories;
  $("#w-args").textContent = w.args;
  $("#w-changed").textContent = w.changed;
  $("#w-convinced").textContent = w.convinced;
  $("#w-accuracy").textContent = w.accuracy + "%";
}

// ===================== ONBOARDING =====================

function hasSeenOnboarding(){
  try { return localStorage.getItem("verdict_onboarded") === "1"; }
  catch(e){ return false; }
}
function markOnboardingSeen(){
  try { localStorage.setItem("verdict_onboarded", "1"); }
  catch(e){ /* ignore */ }
}

function renderOnboard(){
  const c = $("#onboard-content");
  const slide = ONBOARD_SLIDES[state.onboardStep];
  const isLast = state.onboardStep === ONBOARD_SLIDES.length - 1;
  c.innerHTML = `
    <div class="onboard-topbar">
      <div class="onboard-dots">
        ${ONBOARD_SLIDES.map((_, i) => `<span class="onboard-dot ${i === state.onboardStep ? "active" : ""}"></span>`).join("")}
      </div>
      <button class="btn-ghost" id="btn-onboard-skip">Пропустить</button>
    </div>
    <div class="onboard-slide">
      <div class="onboard-emoji">${slide.emoji}</div>
      <h1 class="about-h1" style="text-align:center">${slide.title}</h1>
      <p class="about-p" style="text-align:center">${slide.text}</p>
    </div>
    <div class="onboard-actions">
      <button class="btn-primary" id="btn-onboard-next">${isLast ? "Начать" : "Далее"}</button>
    </div>
  `;
  $("#btn-onboard-skip", c).addEventListener("click", finishOnboarding);
  $("#btn-onboard-next", c).addEventListener("click", () => {
    if(isLast){ finishOnboarding(); }
    else { state.onboardStep += 1; renderOnboard(); }
  });
}

function finishOnboarding(){
  markOnboardingSeen();
  state.onboardStep = 0;
  setScreen("home");
}

// ===================== HUB / NOTIFICATIONS / CATEGORIES / WEEKLY =====================

function unreadNotifCount(){
  return state.notifications.filter(n => n.unread).length;
}

function refreshBadges(){
  const n = unreadNotifCount();
  const tabBadge = $("#hub-tab-badge");
  if(tabBadge){
    tabBadge.textContent = n;
    tabBadge.style.display = n > 0 ? "flex" : "none";
  }
  const hubBadge = $("#hub-row-badge");
  if(hubBadge){
    hubBadge.textContent = n;
    hubBadge.style.display = n > 0 ? "flex" : "none";
  }
}

function renderMoreHub(){
  refreshBadges();
}

function renderNotifications(){
  const list = $("#notif-list");
  list.innerHTML = state.notifications.map(n => `
    <div class="notif-row">
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-text">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-time">${n.time}</div>
      </div>
      ${n.unread ? '<span class="notif-dot"></span>' : ""}
    </div>
  `).join("");
  state.notifications.forEach(n => n.unread = false);
  refreshBadges();
}

function renderCategories(){
  const grid = $("#cat-grid");
  grid.innerHTML = CATEGORY_CHIPS.map(cat => `
    <button class="cat-chip ${state.selectedCategories.has(cat.name) ? "selected" : ""}" data-cat="${cat.name}">
      <span>${cat.emoji}</span><span>${cat.name}</span>
    </button>
  `).join("");
  $$(".cat-chip", grid).forEach(chip => {
    chip.addEventListener("click", () => {
      const name = chip.dataset.cat;
      if(state.selectedCategories.has(name)) state.selectedCategories.delete(name);
      else state.selectedCategories.add(name);
      chip.classList.toggle("selected");
    });
  });
}

function renderWeekly(){
  const w = state.profile.week;
  $("#weekly-grid").innerHTML = `
    <div class="week-stat"><div class="week-num">${w.stories}</div><div class="week-label">историй</div></div>
    <div class="week-stat"><div class="week-num">${w.args}</div><div class="week-label">комментариев</div></div>
    <div class="week-stat"><div class="week-num">${w.changed}</div><div class="week-label">изменений мнения</div></div>
    <div class="week-stat"><div class="week-num">${w.convinced}</div><div class="week-label">убеждённых</div></div>
  `;
  $("#weekly-accuracy").innerHTML = `Точность прогноза мнения сообщества — <b>${w.accuracy}%</b>`;
}

// ===================== STORY + PRIMARY VERDICT =====================

function renderStoryScreen(){
  const d = state.debate;
  const c = $("#story-content");
  c.innerHTML = `
    <div class="category-chip">💰 Деньги</div>
    <div class="source-badge">🔎 Реальная история из интернета</div>
    <h1 class="story-headline">Он потратил общие сбережения на бизнес брата</h1>
    <div class="tldr">
      <div class="tldr-label">Если совсем коротко</div>
      Муж отдал брату деньги, которые они с женой копили на квартиру. Жене он не сказал. Деньги пропали.
    </div>
    <div class="story-body">
      <p>Андрей и его жена несколько лет откладывали деньги на квартиру.</p>
      <p>Однажды Андрей одолжил своему брату $15 000 на запуск небольшого бизнеса — не рассказав жене заранее, потому что был уверен, что брат быстро вернёт деньги.</p>
      <p>Бизнес закрылся через четыре месяца. Теперь жена требует вернуть деньги из личных накоплений Андрея и говорит: дело не в сумме, а в том, что он принял решение за двоих.</p>
      <p>Андрей считает, что хотел помочь семье. Жена — что он игнорирует её право голоса в общих финансах.</p>
    </div>
    <div class="question-block">
      <div class="question-title">Как считаешь, кто неправ?</div>
      <div class="question-hint">Чужие мнения увидишь сразу после того, как ответишь</div>
    </div>
    <div class="vote-grid" id="vote-grid">
      <button class="vote-btn big" data-val="him">Неправ муж</button>
      <button class="vote-btn big" data-val="her">Неправа жена</button>
      <button class="vote-btn big" data-val="both">Оба неправы</button>
      <button class="vote-btn big" data-val="unclear">Трудно сказать</button>
    </div>
    <div class="blind-note">🙈 Комментарии спрятаны, чтобы не мешать тебе решать самому</div>
  `;

  if(d.vote){
    $$("#vote-grid .vote-btn", c).forEach(b => {
      b.classList.toggle("selected", b.dataset.val === d.vote);
      b.disabled = true;
    });
    $(".blind-note", c).innerHTML = `Ты уже ответил: <b>${posLabel(d.vote)}</b>`;
  }

  $$("#vote-grid .vote-btn", c).forEach(btn => {
    btn.addEventListener("click", () => {
      d.vote = btn.dataset.val;
      d.initialVote = btn.dataset.val;
      d.started = true;
      $$("#vote-grid .vote-btn", c).forEach(b => {
        b.classList.toggle("selected", b === btn);
        b.disabled = true;
      });
      setTimeout(() => goTo("voted"), 380);
    });
  });
}

function splitBarsHTML(){
  return `
    <div class="stat-block">
      ${FINAL_SPLIT.map(s => `
        <div class="stat-row">
          <span class="stat-name">${s.label}</span>
          <div class="stat-track"><div class="stat-fill" style="background:${s.color};width:${s.pct}%"></div></div>
          <span class="stat-pct">${s.pct}%</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderVotedScreen(){
  const d = state.debate;
  const c = $("#voted-content");

  // Шаг 1: одна догадка — превращает сухие цифры в маленькую игру
  if(d.guess === null){
    c.innerHTML = `
      <div class="saved-hero">
        <div class="result-check">✓</div>
        <div class="result-title">Готово, твой голос учтён</div>
        <div class="saved-vote">Ты ответил: <b>${posLabel(d.vote)}</b></div>
      </div>
      <div class="guess-block">
        <div class="guess-q">А теперь угадай:<br>много ли людей думают так же?</div>
        <div class="vote-grid" id="guess-grid">
          <button class="vote-btn big" data-guess="most">Большинство со мной</button>
          <button class="vote-btn big" data-guess="half">Мнения разделились поровну</button>
          <button class="vote-btn big" data-guess="few">Я в меньшинстве</button>
        </div>
        <div class="guess-hint">Сразу покажем, как ответили остальные 18 742 человека</div>
      </div>
    `;
    $$("#guess-grid .vote-btn", c).forEach(btn => {
      btn.addEventListener("click", () => {
        d.guess = btn.dataset.guess;
        btn.classList.add("selected");
        setTimeout(() => renderVotedScreen(), 260);
      });
    });
    return;
  }

  // Шаг 2: раскрытие результата
  const right = guessIsRight();
  c.innerHTML = `
    <div class="reveal-hero ${right ? "ok" : "miss"}">
      <div class="reveal-emoji">${right ? "🎯" : "😮"}</div>
      <div class="reveal-title">${right ? "Ты угадал!" : "А вот и нет!"}</div>
      <div class="reveal-sub">Ты ответил: <b>${posLabel(d.vote)}</b></div>
    </div>

    <div class="card">
      <div class="card-title">Вот как ответили другие</div>
      ${splitBarsHTML()}
    </div>

    <button class="btn-primary" id="btn-open-discussion">Читать, что пишут люди</button>
    <div class="cta-sub">${fmt(d.commentTotal)} ${plural(d.commentTotal,["комментарий","комментария","комментариев"])}</div>

    <div class="whats-next">
      <div class="wn-title">Что дальше</div>
      <div class="wn-row"><span class="wn-ico">💬</span><span><b>Комментарии</b> — что пишут живые люди. Можно лайкать и отвечать</span></div>
      <div class="wn-row"><span class="wn-ico">✨</span><span><b>О чём спорят</b> — все комментарии, собранные в 6 главных мнений</span></div>
      <div class="wn-row"><span class="wn-ico">🏆</span><span><b>Итог</b> — чем всё закончилось и что решили все вместе</span></div>
      <div class="wn-note">Между ними можно прыгать в любой момент — сверху есть три кнопки.</div>
    </div>
  `;

  $("#btn-open-discussion", c).addEventListener("click", () => {
    d.hubTab = "map";
    state.nav = ["home"];
    setScreen("debate");
  });
}

// Правильная догадка: победило «неправ муж» с 61%
function guessIsRight(){
  const d = state.debate;
  const correct = d.vote === "him" ? "most" : (d.vote === "both" ? "half" : "few");
  return d.guess === correct;
}

// ===================== COMMENT PRIMITIVES =====================

function plural(n, forms){
  const n10 = n % 10, n100 = n % 100;
  if(n10 === 1 && n100 !== 11) return forms[0];
  if(n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}

function findComment(id){
  for(const c of state.debate.comments){
    if(c.id === id) return c;
    for(const r of (c.replies || [])) if(r.id === id) return r;
  }
  return null;
}

function commentCardHTML(c, opts={}){
  const replies = c.replyCount || 0;
  const replyBtn = opts.reply === "plain" || !replies
    ? `<button class="c-act" data-reply="${c.id}">↩ Ответить</button>`
    : `<button class="c-act" data-thread="${c.id}">↩ ${fmt(replies)} ${plural(replies, ["ответ","ответа","ответов"])}</button>`;
  return `
    <div class="comment${c.isMe ? " is-me" : ""}${opts.compact ? " compact" : ""}" data-cid="${c.id}">
      <div class="c-avatar ${c.av}">${esc(c.author[0])}</div>
      <div class="c-main">
        <div class="c-head">
          <span class="c-author">${esc(c.author)}</span>
          ${c.isMe ? '<span class="c-you">Вы</span>' : ""}
          <span class="c-time">${c.time}</span>
        </div>
        <div class="c-tags">
          <span class="pos-tag ${posClass(c.position)}">${posLabel(c.position)}</span>
          ${c.counter ? '<span class="pos-tag pos-counter">Возражение</span>' : ""}
          ${opts.showStrong && c.strong >= 90 ? '<span class="pos-tag pos-strong">Многих зацепило</span>' : ""}
        </div>
        <div class="c-text">${esc(c.text)}</div>
        <div class="c-actions">
          <button class="c-act c-like${c.liked ? " liked" : ""}" data-like="${c.id}">
            <span class="heart">${c.liked ? "♥" : "♡"}</span><span>${fmt(c.likes)}</span>
          </button>
          ${replyBtn}
        </div>
      </div>
    </div>
  `;
}

// Единый обработчик лайков/ответов/веток для любого контейнера с карточками
function wireCommentActions(root, ctx = {}){
  $$("[data-like]", root).forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const c = findComment(btn.dataset.like);
      if(!c) return;
      c.liked = !c.liked;
      c.likes += c.liked ? 1 : -1;
      if(c.liked) state.debate.likesGiven += 1;
      btn.classList.toggle("liked", c.liked);
      $(".heart", btn).textContent = c.liked ? "♥" : "♡";
      btn.lastElementChild.textContent = fmt(c.likes);
    });
  });
  $$("[data-thread]", root).forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.debate.activeThread = btn.dataset.thread;
      goTo("thread");
    });
  });
  $$("[data-reply]", root).forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.reply;
      const top = state.debate.comments.find(c => c.id === id)
        || state.debate.comments.find(c => (c.replies||[]).some(r => r.id === id));
      if(!top) return;
      if(state.screen === "thread" && state.debate.activeThread === top.id){
        openThreadComposer();
        return;
      }
      state.debate.activeThread = top.id;
      goTo("thread");
      setTimeout(() => openThreadComposer(), 120);
    });
  });
}

// ===================== DEBATE HUB =====================

function renderHub(){
  const d = state.debate;
  console.log("renderHub called, hubTab =", d.hubTab);
  $$("#hub-seg .seg-btn").forEach(b => b.classList.toggle("active", b.dataset.hubtab === d.hubTab));
  $("#hub-meta").textContent = `18 742 голоса · ${fmt(d.commentTotal)} ${plural(d.commentTotal, ["комментарий","комментария","комментариев"])}`;
  $("#composer-bar").style.display = d.hubTab === "discussion" ? "block" : "none";
  $("#composer-pos").textContent = posLabel(d.vote);

  const c = $("#hub-content");
  if(d.hubTab === "discussion") renderDiscussion(c);
  if(d.hubTab === "map") renderMap(c);
  if(d.hubTab === "summary") renderSummary(c);
}

// ---- мой вердикт + необязательное изменение мнения ----

function verdictBlockHTML(){
  const d = state.debate;
  if(d.changedMind){
    return `
      <div class="ai-card change-card">
        <div class="change-title">Ты поменял ответ</div>
        <div class="change-visual">
          <div class="change-box was"><div class="change-box-label">Было</div><div class="change-box-val">${posLabel(d.initialVote).toUpperCase()}</div></div>
          <div class="change-arrow">→</div>
          <div class="change-box now"><div class="change-box-label">Стало</div><div class="change-box-val">${posLabel(d.vote).toUpperCase()}</div></div>
        </div>
        <div class="change-note">Так сделали только <b>14%</b> — почти никто не меняет мнение.</div>
        <div class="change-note">Больше всего тебя убедило:<br><b>«Дело не в деньгах, а в доверии»</b></div>
        <div class="change-motto">Изменить мнение — не проигрыш. Это часть игры.</div>
      </div>
    `;
  }
  if(d.changePanelOpen){
    const opts = ["him","her","both"].filter(k => k !== d.vote);
    return `
      <div class="ai-card change-card">
        <div class="change-title">Хочешь поменять ответ?</div>
        <div class="change-opts">
          ${opts.map(k => `<button class="vote-btn small" data-newvote="${k}">${posLabel(k)}</button>`).join("")}
        </div>
        <button class="link-btn wide" data-keepvote="1">Нет, остаюсь при своём</button>
      </div>
    `;
  }
  return `
    <div class="my-verdict-bar">
      <span class="mv-label">Ты ответил</span>
      <span class="pos-tag ${posClass(d.vote)}">${posLabel(d.vote)}</span>
      <button class="link-btn" data-openchange="1">Передумал?</button>
    </div>
  `;
}

function wireVerdictBlock(root){
  const d = state.debate;
  const rerender = () => {
    renderHub();
    const sc = $("#hub-scroll");
    if(sc && d.hubTab === "discussion") sc.scrollTop = sc.scrollHeight;
  };
  const open = $("[data-openchange]", root);
  if(open) open.addEventListener("click", () => { d.changePanelOpen = true; rerender(); });
  const keep = $("[data-keepvote]", root);
  if(keep) keep.addEventListener("click", () => {
    d.changePanelOpen = false;
    d.changedMind = false;
    rerender();
    toast("Хорошо, оставляем твой ответ");
  });
  $$("[data-newvote]", root).forEach(btn => {
    btn.addEventListener("click", () => {
      d.vote = btn.dataset.newvote;
      d.changePanelOpen = false;
      d.changedMind = true;
      state.profile.week.changed += 1;
      rerender();
      toast("Ответ изменён");
    });
  });
}

// ---- вкладка «Обсуждение» ----

function sortedComments(){
  const d = state.debate;
  let list = d.comments.slice();
  if(d.filterCluster !== null) list = list.filter(c => c.cluster === d.filterCluster);
  if(d.sort === "top") list.sort((a,b) => b.likes - a.likes);
  if(d.sort === "new") list.sort((a,b) => a.mins - b.mins);
  if(d.sort === "strong") list.sort((a,b) => b.strong - a.strong);
  return list;
}

function aiFeedCardHTML(card){
  const cl = clusterById(card.cluster);
  if(card.kind === "pattern"){
    return `
      <div class="ai-card feed-ai">
        <div class="ai-badge">✨ Тут все пишут об одном</div>
        <div class="ai-card-sub">${card.people} человек написали почти одно и то же:</div>
        <div class="ai-card-quote">«${esc(card.line)}»</div>
        <button class="ai-card-btn" data-gocluster="${cl.id}">Показать этих людей</button>
      </div>
    `;
  }
  return `
    <div class="ai-card feed-ai counter-ai">
      <div class="ai-badge">✨ А вот те, кто против</div>
      <div class="ai-card-quote">«${esc(card.line)}»</div>
      <div class="ai-card-sub">Так думают ${fmt(cl.count)} человек. Совсем не согласны с большинством.</div>
      <button class="ai-card-btn" data-gocluster="${cl.id}">Почитать их</button>
    </div>
  `;
}

function renderDiscussion(root){
  const d = state.debate;
  const list = sortedComments();
  const filterCl = d.filterCluster !== null ? clusterById(d.filterCluster) : null;

  const sorts = [["top","Популярные"],["new","Новые"],["strong","Убедительные"]];

  let items = "";
  list.forEach((c, i) => {
    items += commentCardHTML(c, { showStrong: d.sort === "strong" });
    if(!filterCl){
      const ai = FEED_AI_CARDS.find(a => a.after === i + 1);
      if(ai) items += aiFeedCardHTML(ai);
    }
  });

  root.innerHTML = `
    ${d.myCluster !== null && d.myCommentId ? `
      <div class="ai-card my-cluster-card">
        <div class="ai-badge">✨ Ты не один так думаешь!</div>
        <div class="ai-card-sub">Ещё ${fmt(clusterById(d.myCluster).count)} человек написали примерно то же самое:</div>
        <div class="ai-card-quote">«${esc(clusterById(d.myCluster).text)}»</div>
        <button class="ai-card-btn" data-openposition="${d.myCluster}">Показать их комментарии</button>
      </div>` : ""}

    <div class="sort-row">
      ${sorts.map(([k,l]) => `<button class="sort-chip${d.sort===k?" active":""}" data-sort="${k}">${l}</button>`).join("")}
    </div>
    ${d.sort === "strong" ? '<div class="sort-hint">Это не «правильные» комментарии — просто те, которые чаще всего заставляли людей задуматься.</div>' : ""}

    ${filterCl ? `
      <div class="filter-bar">
        <div class="filter-text"><span class="filter-key">Только те, кто думает:</span> ${esc(filterCl.text)}</div>
        <button class="filter-clear" data-clearfilter="1">✕</button>
      </div>
      <div class="filter-count">Всего таких ${fmt(filterCl.count)}. Нажми ✕, чтобы вернуть остальные комментарии</div>
    ` : ""}

    <div class="comment-list">${items || '<div class="empty-note">Здесь пока нет комментариев</div>'}</div>

    <div class="feed-end">
      <div class="feed-end-title">Ну как, что скажешь?</div>
      ${verdictBlockHTML()}
    </div>
  `;

  wireVerdictBlock(root);
  wireCommentActions(root);
  $$("[data-sort]", root).forEach(b => b.addEventListener("click", () => {
    d.sort = b.dataset.sort;
    renderHub();
  }));
  $$("[data-gocluster]", root).forEach(b => b.addEventListener("click", () => {
    d.activePosition = Number(b.dataset.gocluster);
    goTo("position");
  }));
  $$("[data-openposition]", root).forEach(b => b.addEventListener("click", () => {
    d.activePosition = Number(b.dataset.openposition);
    goTo("position");
  }));
  const clear = $("[data-clearfilter]", root);
  if(clear) clear.addEventListener("click", () => { d.filterCluster = null; renderHub(); });
}

// ---- вкладка «Карта мнений» ----

function renderMap(root){
  const d = state.debate;
  root.innerHTML = `
    <div class="map-head">
      <div class="ai-badge plain">✨ Тут поработал AI</div>
    </div>
    <div class="cluster-list">
      ${CLUSTERS.map(cl => `
        <button class="pos-card" data-openposition="${cl.id}">
          <div class="pos-card-top">
            <span class="pos-card-idx">${String(cl.id+1).padStart(2,"0")}</span>
            <span class="pos-card-text">${esc(cl.text)}</span>
          </div>
          <div class="pos-card-bar"><span style="width:${cl.pct}%"></span></div>
          <div class="pos-card-meta">
            <span>${fmt(cl.count)} ${plural(cl.count,["комментарий","комментария","комментариев"])}</span>
            <span>так думает ${cl.pct}%</span>
            <span class="pos-card-cta">›</span>
          </div>
        </button>
      `).join("")}
    </div>
  `;
  $$("[data-openposition]", root).forEach(b => b.addEventListener("click", () => {
    d.activePosition = Number(b.dataset.openposition);
    goTo("position");
  }));
}

// ---- вкладка «Итоги» ----

function demoBreakdownHTML(){
  const rows = RESULT_DEMOGRAPHICS[state.resultDemoTab];
  return rows.map(row => `
    <div class="demo-row">
      <div class="demo-row-label">${row.label}</div>
      <div class="demo-row-bar">
        <span style="width:${row.pct[0]}%;background:${FINAL_SPLIT[0].color}"></span>
        <span style="width:${row.pct[1]}%;background:${FINAL_SPLIT[1].color}"></span>
        <span style="width:${row.pct[2]}%;background:${FINAL_SPLIT[2].color}"></span>
      </div>
      <div class="demo-row-pcts">
        <span><i class="legend-dot" style="background:${FINAL_SPLIT[0].color}"></i><b>${row.pct[0]}%</b> неправ муж</span>
        <span><i class="legend-dot" style="background:${FINAL_SPLIT[1].color}"></i><b>${row.pct[1]}%</b> оба</span>
        <span><i class="legend-dot" style="background:${FINAL_SPLIT[2].color}"></i><b>${row.pct[2]}%</b> неправа жена</span>
      </div>
    </div>
  `).join("");
}

function renderSummary(root){
  const d = state.debate;
  root.innerHTML = `
    ${d.finished ? `
      <div class="status-card done">
        <div class="status-title">✅ Спор закончен</div>
        <div class="status-sub">Голосование закрыто. Вот что решили все вместе</div>
        <button class="btn-primary" id="btn-see-verdict">Показать общий ответ</button>
      </div>
    ` : `
      <div class="status-card">
        <div class="status-title">Спор ещё идёт</div>
        <div class="status-nums">
          <div><b>18 742</b><span>голоса</span></div>
          <div><b>${fmt(d.commentTotal)}</b><span>${plural(d.commentTotal,["комментарий","комментария","комментариев"])}</span></div>
        </div>
        <div class="status-timer">Общий ответ будет через <b>2 часа 14 минут</b></div>
        <button class="btn-secondary" id="btn-fastforward">Уведомить, когда готово</button>
      </div>
    `}

    ${verdictBlockHTML()}

    <div class="synthesis-section">
      <div class="synthesis-h">Самый убедительный довод</div>
      <div class="quote-card">
        <div class="quote-text">«Дело вообще не в 15 тысячах. Он поставил жену перед фактом.»</div>
        <div class="quote-meta"><span>♡ 302</span><span>так думает большинство</span></div>
      </div>
      <button class="link-btn wide" data-gocomment="c4">Кто это написал и что ему ответили</button>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">И самый сильный ответ на него</div>
      <div class="quote-card counter">
        <div class="quote-text">«Если это были деньги Андрея, почему он должен получать разрешение на помощь собственной семье?»</div>
        <div class="quote-meta"><span>♡ 126</span><span>а так — те, кто против</span></div>
      </div>
      <button class="link-btn wide" data-gocomment="c2">Кто это написал и что ему ответили</button>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">В чём все сошлись</div>
      <p class="synthesis-p">И те и другие согласны: помочь брату — это нормально. Вопрос только в том, как он это сделал.</p>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">После чего люди чаще всего меняли мнение</div>
      <div class="quote-card">
        <div class="quote-text">«Если бы он сказал заранее, спор был бы не о деньгах, а только о размере помощи.»</div>
        <div class="quote-meta"><span>🔁 после этих слов передумали 98 человек</span></div>
      </div>
    </div>

    <button class="link-btn wide" id="sum-to-discussion">← Назад к комментариям</button>
  `;

  wireVerdictBlock(root);
  const ff = $("#btn-fastforward", root);
  if(ff) ff.addEventListener("click", () => {
    d.finished = true;
    d.demoShowDemographics = true;
    finishDebate();
    goTo("verdict");
  });
  const sv = $("#btn-see-verdict", root);
  if(sv) sv.addEventListener("click", () => goTo("verdict"));

  $$("[data-openposition]", root).forEach(b => b.addEventListener("click", () => {
    d.activePosition = Number(b.dataset.openposition);
    goTo("position");
  }));
  $$("[data-gocomment]", root).forEach(b => b.addEventListener("click", () => {
    d.activeThread = b.dataset.gocomment;
    goTo("thread");
  }));
  $("#sum-to-map", root).addEventListener("click", () => { d.hubTab = "map"; renderHub(); });
  $("#sum-to-discussion", root).addEventListener("click", () => { d.hubTab = "discussion"; renderHub(); });
}

function wireDemographicsTab(root){
  $$("#demo-toggle .demo-tab-btn", root).forEach(btn => {
    btn.addEventListener("click", () => {
      state.resultDemoTab = btn.dataset.demoTab;
      $$("#demo-toggle .demo-tab-btn", root).forEach(b => b.classList.toggle("active", b === btn));
      $("#demo-panel", root).innerHTML = demoBreakdownHTML();
    });
  });
}

// ===================== COMPOSER (мой комментарий) =====================

function closeComposer(){
  $("#composer-collapsed").style.display = "flex";
  $("#composer-expanded").classList.remove("open");
  $("#composer-text").value = "";
}

function publishComment(){
  const d = state.debate;
  const text = $("#composer-text").value.trim()
    || "Мне кажется, дело не в деньгах: решение о совместных накоплениях должно приниматься вдвоём.";
  const id = "me-" + Date.now();
  d.comments.unshift({
    id, author:"Алекс", av:"av-blue", time:"только что", mins:0,
    position:d.vote, cluster:0, text, likes:0, liked:false, strong:85,
    replyCount:0, replies:[], isMe:true,
  });
  d.myCommentId = id;
  d.myCluster = 0;
  d.commentTotal += 1;
  d.sort = "new";
  state.profile.week.args += 1;
  closeComposer();
  renderHub();
  toast("Готово! Твой комментарий теперь видят все");
}

// ===================== THREAD =====================

function openThreadComposer(){
  $("#thread-collapsed").style.display = "none";
  $("#thread-composer-expanded").classList.add("open");
  $("#thread-text").focus();
}
function closeThreadComposer(){
  $("#thread-collapsed").style.display = "flex";
  $("#thread-composer-expanded").classList.remove("open");
  $("#thread-text").value = "";
}

function renderThread(){
  const d = state.debate;
  const root = $("#thread-content");
  const c = d.comments.find(x => x.id === d.activeThread);
  if(!c){ root.innerHTML = ""; return; }
  const shown = c.replies.length;
  root.innerHTML = `
    <div class="thread-root">${commentCardHTML(c, { reply:"plain" })}</div>
    <div class="thread-divider">
      ${c.replyCount ? `${fmt(c.replyCount)} ${plural(c.replyCount,["ответ","ответа","ответов"])}` : "Ответов пока нет"}
      ${c.replyCount > shown ? `<span class="thread-shown">показаны ${shown} самых заметных</span>` : ""}
    </div>
    <div class="thread-replies">
      ${c.replies.map(r => commentCardHTML(r, { reply:"plain", compact:true })).join("")
        || '<div class="empty-note">Стань первым, кто ответит</div>'}
    </div>
  `;
  wireCommentActions(root, { inThread:true });
  closeThreadComposer();
}

function publishReply(){
  const d = state.debate;
  const c = d.comments.find(x => x.id === d.activeThread);
  if(!c) return;
  const text = $("#thread-text").value.trim() || "Согласен: вопрос не в сумме, а в том, что решение было принято за двоих.";
  c.replies.push({
    id:"mer-" + Date.now(), author:"Алекс", av:"av-blue", time:"только что",
    position:d.vote, text, likes:0, liked:false, isMe:true,
  });
  c.replyCount += 1;
  d.commentTotal += 1;
  d.repliesGiven += 1;
  renderThread();
  toast("Ответ добавлен в ветку");
}

// ===================== AI POSITION =====================

function renderPosition(){
  const d = state.debate;
  const cl = clusterById(d.activePosition);
  const root = $("#position-content");
  if(!cl){ root.innerHTML = ""; return; }
  const top = d.comments
    .filter(c => c.cluster === cl.id)
    .sort((a,b) => b.likes - a.likes)
    .slice(0,3);

  root.innerHTML = `
    <div class="pos-hero">
      <div class="ai-badge plain">✨ Так думают ${fmt(cl.count)} человек</div>
      <h1 class="pos-hero-title">${esc(cl.text)}</h1>
      <div class="pos-hero-meta">Это ${cl.pct}% всех, кто написал комментарий</div>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">Если коротко</div>
      <p class="synthesis-p">${esc(cl.summary)}</p>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">Что пишут эти люди</div>
      <div class="comment-list">
        ${top.map(c => commentCardHTML(c)).join("") || '<div class="empty-note">Комментарии подгружаются</div>'}
      </div>
    </div>

    <button class="btn-primary" id="pos-see-all">Показать все ${fmt(cl.count)} ${plural(cl.count,["комментарий","комментария","комментариев"])}</button>
    <div class="cta-sub">Вернёмся к комментариям, но останутся только эти</div>
  `;

  wireCommentActions(root);
  $("#pos-see-all", root).addEventListener("click", () => {
    d.filterCluster = cl.id;
    d.hubTab = "discussion";
    d.sort = "top";
    state.nav = ["home"];
    setScreen("debate");
    toast("Показываем только этих людей");
  });
}

// ===================== FINAL VERDICT / RESULT / INFLUENCE =====================

function finishDebate(){
  const d = state.debate;
  if(d.finished && !d._counted){
    d._counted = true;
    if(state.dailyProgress < 5) state.dailyProgress += 1;
    state.profile.week.stories += 1;
    state.profile.week.convinced += 37;
  }
}

const GUESS_LABELS = {
  most:"большинство со мной",
  half:"мнения разделятся поровну",
  few:"я в меньшинстве",
};

function renderFinalVerdict(){
  const root = $("#verdict-content");
  const d = state.debate;
  if(!d.influenceApplied){
    d.influenceApplied = true;
    state.profile.influenceTotal += 42;
  }

  const winner = FINAL_SPLIT[0];
  const match = d.vote === winner.key;
  const mine = FINAL_SPLIT.find(s => s.key === d.vote) || winner;
  const myComments = (d.myCommentId ? 1 : 0) + d.repliesGiven;
  const guessed = d.guess !== null && guessIsRight();
  // центр «моего» сегмента общей полоски — под ним рисуем метку
  const sameAsMe = Math.round(TOTAL_VOTES * mine.pct / 100);
  const myIdx = Math.max(0, FINAL_SPLIT.indexOf(mine));
  const myMarkerPct = FINAL_SPLIT.slice(0, myIdx).reduce((a,s) => a + s.pct, 0) + mine.pct / 2;

  root.innerHTML = `
    <div class="result-hero ${match ? "" : "rare"}">
      <div class="rh-kicker">Ты ответил</div>
      <div class="rh-vote">${posLabel(d.vote)}</div>
      <div class="rh-badge">${match ? "Ты думаешь как большинство" : "Ты думаешь не как все"}</div>
      <div class="rh-sub">Так же ответили <b>${fmt(sameAsMe)}</b> ${plural(sameAsMe,["человек","человека","человек"])} — это <b>${mine.pct}%</b> из ${fmt(TOTAL_VOTES)}</div>
    </div>

    <div class="stat-strip">
      <div class="stat-cell"><b class="num-accent">+42</b><span>очка влияния</span></div>
      <div class="stat-cell"><b>${fmt(2481)}</b><span>прочитали тебя</span></div>
      <div class="stat-cell"><b class="num-green">37</b><span>передумали</span></div>
    </div>

    <div class="medal-row">
      <div class="medal-emoji">🏆</div>
      <div>
        <div class="medal-text-title">Ты умеешь убеждать</div>
        <div class="medal-text-desc">Ты повлиял на людей сильнее, чем 92% участников</div>
      </div>
    </div>

    <div class="card">
      <div class="you-row"><span class="you-row-label">Ты думал: ${d.guess === null ? "—" : GUESS_LABELS[d.guess]}</span><span class="you-row-val">${d.guess === null ? "—" : (guessed ? "Угадал 🎯" : "Не угадал 😮")}</span></div>
      <div class="you-row"><span class="you-row-label">Ты передумал по ходу спора</span><span class="you-row-val">${d.changedMind ? "Да" : "Нет"}</span></div>
      <div class="you-row"><span class="you-row-label">Ты написал</span><span class="you-row-val">${myComments} ${plural(myComments,["комментарий","комментария","комментариев"])}</span></div>
      <div class="you-row"><span class="you-row-label">Твой комментарий вошёл в топ</span><span class="you-row-val">5</span></div>
    </div>

    <div class="result-divider"><span>А что решили остальные</span></div>

    <div class="verdict-header">
      <div class="verdict-title">${posLabel(winner.key)} — ${winner.pct}%</div>
      <div class="verdict-votes">всего ответили ${fmt(TOTAL_VOTES)} ${plural(TOTAL_VOTES,["человек","человека","человек"])}</div>
    </div>
    <div class="verdict-bar-wrap">
      <div class="verdict-bar">
        ${FINAL_SPLIT.map(s => `<span style="width:${s.pct}%;background:${s.color}"></span>`).join("")}
      </div>
      <div class="verdict-mine-mark ${myMarkerPct > 78 ? "at-right" : (myMarkerPct < 22 ? "at-left" : "")}" style="left:${myMarkerPct}%">
        <i></i><span>твой голос</span>
      </div>
      <div class="verdict-legend">
        ${FINAL_SPLIT.map(s => `<div class="${s.key === d.vote ? "mine" : ""}"><span class="legend-dot" style="background:${s.color}"></span>${s.pct}% ${s.label}</div>`).join("")}
      </div>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">Что это значит</div>
      <p class="synthesis-p">Большинство решило, что муж неправ. Не столько из-за денег, сколько из-за того, что он ничего не сказал жене. Но это не «правильный ответ» — просто так думает большинство.</p>
    </div>

    <div class="synthesis-section">
      <div class="synthesis-h">Самое неожиданное</div>
      <p class="synthesis-p">Сначала все спорили про деньги. А к концу почти все говорили уже совсем о другом — о доверии.</p>
    </div>

    ${d.demoShowDemographics ? `
      <div class="synthesis-section">
        <div class="synthesis-h">Кто как голосовал</div>
        <div class="demo-toggle" id="demo-toggle">
          ${Object.keys(DEMO_TAB_LABELS).map(key => `
            <button class="demo-tab-btn ${state.resultDemoTab === key ? "active" : ""}" data-demo-tab="${key}">${DEMO_TAB_LABELS[key]}</button>
          `).join("")}
        </div>
        <div class="demo-panel" id="demo-panel">${demoBreakdownHTML()}</div>
      </div>
    ` : ""}

    <button class="btn-secondary" id="v-to-challenge">Позвать друга поспорить</button>
    <button class="link-btn wide" id="v-to-discussion">На главную</button>
  `;
  wireDemographicsTab(root);
  $("#v-to-challenge", root).addEventListener("click", () => goTo("challenge"));
  $("#v-to-discussion", root).addEventListener("click", () => goTab("home"));
}

function renderChallenge(){
  const d = state.debate;
  const root = $("#challenge-content");
  if(!d.challengeSent){
    root.innerHTML = `
      <div class="challenge-card">
        <div class="challenge-avatars">
          <div class="avatar-sm">А</div><span class="vs-text">VS</span><div class="avatar-sm">?</div>
        </div>
        <div class="challenge-quote">Алекс считает: ${posLabel(d.vote).toLowerCase()}. А ты как думаешь?</div>
        <div class="challenge-sub">Отправь эту историю другу и посмотрите, совпадёте ли вы.</div>
        <button class="btn-primary" id="send-challenge">Отправить другу</button>
      </div>
      <button class="link-btn wide" id="ch-to-home">Не сейчас</button>
    `;
    $("#send-challenge", root).addEventListener("click", () => {
      d.challengeSent = true;
      renderChallenge();
      toast("Отправлено!");
    });
    $("#ch-to-home", root).addEventListener("click", () => goTab("home"));
  } else {
    root.innerHTML = `
      <div class="challenge-card">
        <div class="challenge-avatars">
          <div class="avatar-sm">А</div><span class="vs-text">VS</span><div class="avatar-sm alt">М</div>
        </div>
        <div class="challenge-quote">Мария ответила по-другому!</div>
        <div class="challenge-score">Алекс 1 — Мария 0</div>
        <div class="challenge-sub">счёт в ваших спорах за эту неделю</div>
      </div>
      <button class="btn-primary" id="ch-home">На главную</button>
    `;
    $("#ch-home", root).addEventListener("click", () => goTab("home"));
  }
}

// ===================== NAV WIRING =====================

$$(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    if(tab === "debate"){ openDailyStory(); return; }
    goTab(tab);
  });
});

$("#daily-bar").addEventListener("click", openDailyStory);
$("#btn-search").addEventListener("click", () => toast("Поиск по историям появится в полной версии"));
$("#btn-profile-info").addEventListener("click", () => goTo("about"));
$("#btn-about-back").addEventListener("click", () => navBack("home"));

$("#btn-story-back").addEventListener("click", () => navBack("home"));
$("#btn-voted-back").addEventListener("click", () => navBack("home"));
$("#btn-hub-back").addEventListener("click", () => goTab("home"));
$("#btn-thread-back").addEventListener("click", () => navBack("debate"));
$("#btn-position-back").addEventListener("click", () => navBack("debate"));
$("#btn-verdict-back").addEventListener("click", () => navBack("debate"));
$("#btn-challenge-back").addEventListener("click", () => navBack("verdict"));

$$("#hub-seg .seg-btn").forEach(b => b.addEventListener("click", () => {
  state.debate.hubTab = b.dataset.hubtab;
  $("#hub-scroll").scrollTop = 0;
  renderHub();
}));

$("#composer-open").addEventListener("click", () => {
  $("#composer-collapsed").style.display = "none";
  $("#composer-expanded").classList.add("open");
  $("#composer-text").focus();
});
$("#composer-cancel").addEventListener("click", closeComposer);
$("#composer-publish").addEventListener("click", publishComment);

$("#thread-reply-open").addEventListener("click", openThreadComposer);
$("#thread-cancel").addEventListener("click", closeThreadComposer);
$("#thread-publish").addEventListener("click", publishReply);

$("#btn-share-profile").addEventListener("click", () => toast("Профиль скопирован в буфер (демо)"));

$("#hub-row-notifications").addEventListener("click", () => goTo("notifications"));
$("#hub-row-weekly").addEventListener("click", () => goTo("weekly"));
$("#hub-row-categories").addEventListener("click", () => goTo("categories"));
$("#hub-row-about").addEventListener("click", () => goTo("about"));
$("#hub-row-restart").addEventListener("click", () => { restartDemo(); toast("Дебат сброшен — можно пройти сценарий заново"); });
$("#hub-row-replay").addEventListener("click", () => { state.onboardStep = 0; goTo("onboard"); });

$("#btn-notif-back").addEventListener("click", () => navBack("hub"));
$("#btn-categories-back").addEventListener("click", () => navBack("hub"));
$("#btn-weekly-back").addEventListener("click", () => navBack("hub"));

$("#btn-cat-save").addEventListener("click", () => {
  navBack("hub");
  toast(`Сохранено: ${state.selectedCategories.size} категорий`);
});

// ===================== INIT =====================

renderHome();
renderProfile();
refreshBadges();
if(!hasSeenOnboarding()){
  setScreen("onboard");
}
