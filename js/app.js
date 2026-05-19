// ========== MATRIX CANVAS ==========
const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas ? matrixCanvas.getContext('2d') : null;
let matrixColumns = [];
let matrixRunning = false;
let mouseX = -1000, mouseY = -1000;

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯагент';

function initMatrix() {
  if (!matrixCanvas || !matrixCtx) return;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) { matrixCanvas.style.display = 'none'; return; }

  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const fontSize = 14;
  const cols = Math.floor(matrixCanvas.width / fontSize);
  matrixColumns = [];
  for (let i = 0; i < cols; i++) {
    matrixColumns.push(Math.random() * matrixCanvas.height / fontSize | 0);
  }

  if (!matrixRunning) {
    matrixRunning = true;
    matrixLoop(fontSize);
  }
}

function matrixLoop(fontSize) {
  if (!matrixRunning) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (!isDark) {
    matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    requestAnimationFrame(() => setTimeout(() => matrixLoop(fontSize), 120));
    return;
  }

  matrixCtx.fillStyle = 'rgba(10, 10, 10, 0.12)';
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  for (let i = 0; i < matrixColumns.length; i++) {
    const x = i * fontSize;
    const y = matrixColumns[i] * fontSize;
    const char = matrixChars[Math.random() * matrixChars.length | 0];

    const dx = x - mouseX;
    const dy = y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const alpha = dist < 120 ? 0.12 : 0.04;

    matrixCtx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
    matrixCtx.font = `${fontSize}px monospace`;
    matrixCtx.fillText(char, x, y);

    if (matrixColumns[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      matrixColumns[i] = 0;
    }
    matrixColumns[i]++;
  }

  requestAnimationFrame(() => setTimeout(() => matrixLoop(fontSize), 120));
}

document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
window.addEventListener('resize', () => {
  if (matrixCanvas) {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    initMatrix();
  }
});

// ========== READING PROGRESS BAR ==========
function updateReadingProgress() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + '%';
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });

// ========== THEME ==========
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (next === 'dark') initMatrix();
}

// ========== SIDEBAR ==========
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
}

function updateActiveLink(page) {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === page);
  });
}

// ========== LOADING SCREEN ==========
const lectureNames = {
  'lecture-1': 'Введение в AI-агенты',
  'lecture-2': 'Архитектура агентов',
  'lecture-3': 'Обучение агентов',
  'lecture-4': 'Мультиагентные системы',
  'lecture-5': 'Координация и кооперация',
  'lecture-6': 'LLM-агенты',
  'lecture-7': 'Мультиагентные оркестраторы',
  'lecture-8': 'Практические аспекты'
};

let shownLoadings = new Set();

function showLoadingScreen(page, callback) {
  if (shownLoadings.has(page)) { callback(); return; }
  shownLoadings.add(page);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (!isDark) { callback(); return; }

  const screen = document.getElementById('loadingScreen');
  const text = document.getElementById('loadingText');
  const bar = document.getElementById('loadingBarFill');
  const name = lectureNames[page] || page;

  text.innerHTML = `<div class="line">> Инициализация агента...</div>
<div class="line">> Загрузка модуля: ${name}</div>
<div class="line">> Подключение к мультиагентной среде... OK</div>
<div class="line">> Компиляция знаний... 100%</div>`;

  bar.style.animation = 'none';
  bar.offsetHeight;
  bar.style.animation = '';
  bar.style.width = '0';
  void bar.offsetWidth;
  bar.style.animation = 'loadBar 1.6s 0.2s ease-out forwards';

  screen.style.display = 'flex';
  screen.classList.remove('fade-out');

  setTimeout(() => {
    screen.classList.add('fade-out');
    setTimeout(() => {
      screen.style.display = 'none';
      callback();
    }, 400);
  }, 2000);
}

// ========== NAV BUTTONS ==========
function getNavButtons(page) {
  const pages = [
    'home',
    'lecture-1','practice-1','lecture-2','practice-2',
    'lecture-3','practice-3','lecture-4','practice-4',
    'lecture-5','practice-5','lecture-6','practice-6',
    'lecture-7','practice-7','lecture-8','practice-8',
    'test'
  ];
  const titles = {
    'home':'Обзор курса',
    'lecture-1':'Лекция 1','practice-1':'Практика 1',
    'lecture-2':'Лекция 2','practice-2':'Практика 2',
    'lecture-3':'Лекция 3','practice-3':'Практика 3',
    'lecture-4':'Лекция 4','practice-4':'Практика 4',
    'lecture-5':'Лекция 5','practice-5':'Практика 5',
    'lecture-6':'Лекция 6','practice-6':'Практика 6',
    'lecture-7':'Лекция 7','practice-7':'Практика 7',
    'lecture-8':'Лекция 8','practice-8':'Практика 8',
    'test':'Итоговый тест'
  };
  const idx = pages.indexOf(page);
  if (idx === -1) return '';
  let html = '<div class="nav-buttons">';
  if (idx > 0) {
    html += `<a href="#${pages[idx-1]}" class="nav-btn prev">
      <span class="nav-btn-label">&larr; Предыдущая</span>
      <span class="nav-btn-title">${titles[pages[idx-1]]}</span>
    </a>`;
  }
  if (idx < pages.length - 1) {
    html += `<a href="#${pages[idx+1]}" class="nav-btn next">
      <span class="nav-btn-label">Следующая &rarr;</span>
      <span class="nav-btn-title">${titles[pages[idx+1]]}</span>
    </a>`;
  }
  html += '</div>';
  return html;
}

// ========== TYPEWRITER ==========
function startTypewriter(el) {
  if (!el) return;
  const text = 'Добро пожаловать в мир AI-агентов';
  el.innerHTML = '<span class="cursor"></span>';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML = text.slice(0, i + 1) + '<span class="cursor"></span>';
      i++;
      setTimeout(type, 50 + Math.random() * 40);
    }
  }
  setTimeout(type, 600);
}

// ========== PAGE RENDERING ==========
function renderPage(page) {
  const el = document.getElementById('content');

  const isLecture = page.startsWith('lecture-');

  function doRender() {
    let html = '';
    if (page === 'home') {
      html = renderHome();
    } else if (page === 'test') {
      html = renderTest();
    } else if (CONTENT[page]) {
      html = CONTENT[page] + getNavButtons(page);
    } else {
      html = '<h1>Страница не найдена</h1><p>Выберите раздел в меню.</p>';
    }

    el.classList.remove('slide-out');
    el.innerHTML = html;
    el.classList.add('slide-in');
    setTimeout(() => el.classList.remove('slide-in'), 350);

    updateActiveLink(page);
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateReadingProgress();

    if (page === 'test') initTest();
    if (page === 'home') {
      const tw = document.getElementById('typewriterText');
      startTypewriter(tw);
    }
  }

  el.classList.add('slide-out');

  if (isLecture) {
    setTimeout(() => {
      showLoadingScreen(page, doRender);
    }, 200);
  } else {
    setTimeout(doRender, 200);
  }
}

function renderHome() {
  const lectures = [
    {id:1, title:'Введение в AI-агенты', desc:'Определение, история, таксономия агентов'},
    {id:2, title:'Архитектура агентов', desc:'BDI, подсистемы восприятия, цикл sense-plan-act'},
    {id:3, title:'Обучение агентов', desc:'Reinforcement learning, PPO, reward shaping'},
    {id:4, title:'Мультиагентные системы', desc:'Протоколы коммуникации, FIPA, KQML'},
    {id:5, title:'Координация и кооперация', desc:'Теория игр, аукционы, Contract Net'},
    {id:6, title:'LLM-агенты', desc:'ReAct, tool use, chain-of-thought, RAG'},
    {id:7, title:'Мультиагентные оркестраторы', desc:'CrewAI, AutoGen, LangGraph, паттерны'},
    {id:8, title:'Практические аспекты', desc:'Безопасность, prompt injection, guardrails'}
  ];

  let cards = lectures.map(l => `
    <a href="#lecture-${l.id}" class="home-card">
      <div class="home-card-number">&gt; Лекция ${l.id}</div>
      <div class="home-card-title">${l.title}</div>
      <div class="home-card-desc">${l.desc}</div>
    </a>
  `).join('');

  return `
    <div class="home-hero">
      <span class="badge">&gt; Учебный курс</span>
      <h1 class="glitch" data-text="AI-агенты и мультиагентные системы">AI-агенты и мультиагентные системы</h1>
      <div class="typewriter" id="typewriterText"></div>
      <br>
      <a href="#lecture-1" class="btn-start">&gt; Начать обучение</a>
    </div>
    <div class="home-cards">${cards}</div>
    <div class="footer">&gt; AI-агенты и мультиагентные системы &copy; 2025</div>
  `;
}

// ========== ANIMATED SCORE COUNTER ==========
const origCheckTest = window.checkTest;
window.checkTest = function() {
  origCheckTest();

  const scoreEl = document.getElementById('resultScore');
  if (!scoreEl) return;
  const finalText = scoreEl.textContent;
  const finalNum = parseInt(finalText);
  if (isNaN(finalNum)) return;

  let current = 0;
  scoreEl.textContent = '0%';
  const step = Math.max(1, Math.ceil(finalNum / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= finalNum) {
      current = finalNum;
      clearInterval(interval);
    }
    scoreEl.textContent = current + '%';
  }, 30);
};

// ========== ROUTER ==========
function router() {
  const hash = location.hash.slice(1) || 'home';
  renderPage(hash);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  initMatrix();
  router();
});
