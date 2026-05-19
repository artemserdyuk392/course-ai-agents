function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

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

function getNavButtons(page) {
  const pages = [
    'home',
    'lecture-1','practice-1',
    'lecture-2','practice-2',
    'lecture-3','practice-3',
    'lecture-4','practice-4',
    'lecture-5','practice-5',
    'lecture-6','practice-6',
    'lecture-7','practice-7',
    'lecture-8','practice-8',
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

function renderPage(page) {
  const el = document.getElementById('content');
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

  el.innerHTML = html;
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = '';

  updateActiveLink(page);
  closeSidebar();
  window.scrollTo({top: 0, behavior: 'instant'});

  if (page === 'test') {
    initTest();
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
      <div class="home-card-number">Лекция ${l.id}</div>
      <div class="home-card-title">${l.title}</div>
      <div class="home-card-desc">${l.desc}</div>
    </a>
  `).join('');

  return `
    <div class="home-hero">
      <span class="badge">Учебный курс</span>
      <h1>AI-агенты и мультиагентные системы</h1>
      <p>Полный курс из 8 лекций с практическими заданиями и итоговым тестированием.
         От классических архитектур до современных LLM-оркестраторов.</p>
      <a href="#lecture-1" class="btn-start">Начать обучение</a>
    </div>
    <div class="home-cards">${cards}</div>
    <div class="footer">AI-агенты и мультиагентные системы &copy; 2025. Учебный курс.</div>
  `;
}

function router() {
  const hash = location.hash.slice(1) || 'home';
  renderPage(hash);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  router();
});
