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

// ========== CURSOR GLOW TRAIL ==========
(function() {
  if (matchMedia('(hover: none)').matches) return;

  const dots = [];
  const MAX_DOTS = 25;
  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastTime < 30) return;
    lastTime = now;

    const loading = document.getElementById('loadingScreen');
    if (loading && loading.style.display !== 'none') return;
    if (document.querySelector('.pay-modal-overlay') || document.querySelector('.reveal-overlay')) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-glow-dot';
    dot.style.left = (e.clientX - 3) + 'px';
    dot.style.top = (e.clientY - 3) + 'px';
    document.body.appendChild(dot);
    dots.push(dot);

    requestAnimationFrame(() => dot.classList.add('fade'));

    if (dots.length > MAX_DOTS) {
      const old = dots.shift();
      old.remove();
    }

    setTimeout(() => {
      dot.remove();
      const idx = dots.indexOf(dot);
      if (idx > -1) dots.splice(idx, 1);
    }, 600);
  });
})();

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

// ========== TYPEWRITER (home) ==========
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

// ========== LECTURE TYPEWRITER ==========
let lectureTypewriterAbort = false;

function startLectureTypewriter(contentEl) {
  const firstP = contentEl.querySelector('.lecture-first-p');
  const rest = contentEl.querySelector('.lecture-rest');
  if (!firstP || !rest) return;

  const fullHTML = firstP.getAttribute('data-full');
  if (!fullHTML) return;

  firstP.innerHTML = '<span class="tw-cursor"></span>';
  contentEl.classList.add('lecture-typewriter-active');
  lectureTypewriterAbort = false;

  let i = 0;
  const plainText = new DOMParser().parseFromString(fullHTML, 'text/html').body.textContent;

  function skipAll() {
    lectureTypewriterAbort = true;
    firstP.innerHTML = fullHTML;
    rest.classList.add('visible');
    contentEl.classList.remove('lecture-typewriter-active');
    document.removeEventListener('click', skipAll);
  }

  document.addEventListener('click', skipAll);

  function typeChar() {
    if (lectureTypewriterAbort) return;
    if (i < plainText.length) {
      firstP.innerHTML = plainText.slice(0, i + 1) + '<span class="tw-cursor"></span>';
      i++;
      setTimeout(typeChar, 30);
    } else {
      firstP.innerHTML = fullHTML;
      setTimeout(() => {
        rest.classList.add('visible');
        contentEl.classList.remove('lecture-typewriter-active');
      }, 200);
      document.removeEventListener('click', skipAll);
    }
  }

  setTimeout(typeChar, 300);
}

function wrapLectureContent(html) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  const allChildren = Array.from(wrapper.children);
  let firstPIdx = -1;
  for (let i = 0; i < allChildren.length; i++) {
    if (allChildren[i].tagName === 'P' && !allChildren[i].classList.contains('subtitle')) {
      firstPIdx = i;
      break;
    }
  }

  if (firstPIdx === -1) return html;

  const firstP = allChildren[firstPIdx];
  const fullHTML = firstP.innerHTML;
  firstP.setAttribute('data-full', fullHTML);
  firstP.classList.add('lecture-first-p');
  firstP.innerHTML = '';

  const restDiv = document.createElement('div');
  restDiv.className = 'lecture-rest';
  for (let i = firstPIdx + 1; i < allChildren.length; i++) {
    restDiv.appendChild(allChildren[i].cloneNode(true));
  }

  let result = '';
  for (let i = 0; i <= firstPIdx; i++) {
    result += allChildren[i].outerHTML;
  }
  result += restDiv.outerHTML;

  return result;
}

// ========== MARQUEE QUOTES ==========
const QUOTES = [
  '"Я знаю кунг-фу." — Нео, Матрица',
  '"Хьюстон, у нас проблема." — Аполлон 13',
  '"Да пребудет с тобой сила." — Звёздные войны',
  '"Я вернусь." — Терминатор',
  '"Жизнь — как коробка конфет." — Форрест Гамп',
  '"Почему ты такой серьёзный?" — Тёмный рыцарь',
  '"Я — неизбежность." — Мстители: Финал',
  '"Нет ложки." — Матрица',
  '"Бонд. Джеймс Бонд." — 007',
  '"Это не птица, это не самолёт..." — Супермен',
  '"Элементарно, Ватсон." — Шерлок Холмс',
  '"Я — Грут." — Стражи Галактики',
  '"Мы все здесь безумцы." — Алиса в Стране чудес',
  '"Дорогу осилит идущий." — Нейрокорова, 2024',
  '"Корреляция — не каузация, но всё равно подозрительно." — Аноним',
  '"Мой нейрон — мои правила." — Перцептрон, 1958',
  '"404: смысл жизни не найден." — Интернет',
  '"sudo make me a sandwich." — xkcd',
  '"Я не баг, я фича." — Каждый разработчик',
  '"Кажется, дождь собирается..." — Пятачок',
  '"В матрице опять кэш переполнился." — Нео, неизданное',
  '"Лучше один раз обучить, чем сто раз переобучить." — Народная AI-мудрость',
  '"Кукуруза — это овощ? Нейросеть считает что да." — GPT-2',
  '"За каждым великим агентом стоит великий промпт." — Аноним',
  '"Я мыслю, следовательно, у меня 175 миллиардов параметров." — GPT-3',
  '"Не паникуй." — Автостопом по Галактике',
  '"Зимой и летом одним цветом. Это же зелёный терминал." — Загадка',
  '"Любой достаточно продвинутый агент неотличим от стажёра." — Закон Кларка 2.0',
  '"Gradient descent — это просто скатывание с горки, но математически." — Студент ML',
  '"Один агент в поле не воин, нужна мультиагентная система." — Пословица',
  '"Переобучение — грех. Ранняя остановка — добродетель." — Монах ML',
  '"Этот датасет чист? — Настолько, насколько может быть чист интернет." — Диалог',
  '"Мне нужна твоя одежда, ботинки и доступ к API." — Терминатор-нейронатор',
  '"Что посеешь, то и натренируешь." — Нейрофермер',
  '"Бип-буп, я пришёл за вашей работой." — Робот, 2030',
  '"На вкус и цвет — все нейроны разные." — Пословица',
  '"Я видел вещи, которые вам, людям, и не снились." — Бегущий по лезвию',
  '"Открой двери, Хэл." — 2001: Космическая одиссея',
  '"Живи долго и процветай." — Мистер Спок',
  '"Роботы не плачут. Обычно." — Аноним'
];

function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  const shuffled = [...QUOTES].sort(() => Math.random() - 0.5);
  const sep = '<span class="marquee-sep">⟐</span>';
  const content = shuffled.join(sep) + sep;
  track.innerHTML = content + content;
}

// ========== PDF DOWNLOAD ==========
function downloadLecturePDF(page) {
  const contentEl = document.getElementById('content');
  if (!contentEl) return;

  const clone = contentEl.cloneNode(true);

  const navBtns = clone.querySelector('.nav-buttons');
  if (navBtns) navBtns.remove();
  const pdfBtn = clone.querySelector('.btn-pdf');
  if (pdfBtn) pdfBtn.remove();

  clone.classList.remove('lecture-typewriter-active');
  const rest = clone.querySelector('.lecture-rest');
  if (rest) rest.classList.add('visible');
  const firstP = clone.querySelector('.lecture-first-p');
  if (firstP) {
    const full = firstP.getAttribute('data-full');
    if (full) firstP.innerHTML = full;
  }

  const opt = {
    margin: [12, 12, 16, 12],
    filename: page + '.pdf',
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'font-family: sans-serif; color: #1a1a2e; max-width: 700px; padding: 20px; line-height: 1.7;';
  wrapper.innerHTML = clone.innerHTML;

  wrapper.querySelectorAll('*').forEach(el => {
    el.style.color = '#1a1a2e';
    if (el.tagName === 'CODE' || el.tagName === 'PRE') {
      el.style.background = '#f0f0f0';
      el.style.color = '#333';
    }
    if (el.tagName === 'BLOCKQUOTE') {
      el.style.borderLeft = '3px solid #0d6b2e';
      el.style.background = '#e8f5e9';
      el.style.padding = '12px 16px';
    }
  });

  html2pdf().set(opt).from(wrapper).save();
}

function getPdfButton(page) {
  return `<button class="btn-pdf" onclick="downloadLecturePDF('${page}')">📄 Скачать PDF</button>`;
}

// ========== NEURAL RAIN TRANSITION ==========
function playNeuralRain() {
  const canvas = document.createElement('canvas');
  canvas.id = 'neuralRainCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const neurons = [];
  const count = 35;
  for (let i = 0; i < count; i++) {
    neurons.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      vy: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 2,
      size: 3 + Math.random() * 3,
      alpha: 0.6 + Math.random() * 0.4,
      trail: []
    });
  }

  const connections = [];
  for (let i = 0; i < 12; i++) {
    const a = Math.floor(Math.random() * count);
    let b = Math.floor(Math.random() * count);
    if (b === a) b = (b + 1) % count;
    connections.push({ a, b, flicker: Math.random() });
  }

  const start = performance.now();
  const duration = 1500;

  function animate(now) {
    const elapsed = now - start;
    const progress = elapsed / duration;
    if (progress > 1) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;

    neurons.forEach(n => {
      if (progress > 0.5) {
        n.vx *= 1.02;
        n.vy *= 0.99;
      }
      n.x += n.vx;
      n.y += n.vy;
      n.trail.push({ x: n.x, y: n.y });
      if (n.trail.length > 8) n.trail.shift();

      for (let t = 0; t < n.trail.length; t++) {
        const ta = (t / n.trail.length) * 0.3 * n.alpha * fadeOut;
        ctx.beginPath();
        ctx.arc(n.trail[t].x, n.trail[t].y, n.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,65,${ta})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,65,${n.alpha * fadeOut})`;
      ctx.shadowColor = 'rgba(0,255,65,0.6)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    connections.forEach(c => {
      const na = neurons[c.a], nb = neurons[c.b];
      const dist = Math.hypot(na.x - nb.x, na.y - nb.y);
      if (dist < 300) {
        const flickAlpha = 0.15 + Math.sin(elapsed * 0.01 + c.flicker * 10) * 0.1;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(0,255,65,${flickAlpha * fadeOut})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// ========== NEURO SVG BACKGROUNDS ==========
const NEURO_SVGS = [
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="rgba(0,255,65,0.06)" stroke-width="1.2">
      <path d="M40,140 Q50,100 70,95 Q80,80 100,85 Q120,80 130,95 Q150,100 160,140 Q150,160 130,165 Q110,170 100,168 Q90,170 70,165 Q50,160 40,140Z"/>
      <path d="M65,90 Q60,70 55,65 M135,90 Q140,70 145,65"/>
      <line x1="100" y1="60" x2="100" y2="45"/><circle cx="100" cy="42" r="4"/>
      <circle cx="75" cy="110" r="6"/><circle cx="125" cy="110" r="6"/>
      <circle cx="90" cy="130" r="5"/><circle cx="110" cy="130" r="5"/>
      <circle cx="100" cy="95" r="5"/><circle cx="85" cy="150" r="4"/>
      <circle cx="115" cy="150" r="4"/><circle cx="70" cy="135" r="3"/><circle cx="130" cy="135" r="3"/>
      <line x1="75" y1="110" x2="100" y2="95"/><line x1="125" y1="110" x2="100" y2="95"/>
      <line x1="75" y1="110" x2="90" y2="130"/><line x1="125" y1="110" x2="110" y2="130"/>
      <line x1="90" y1="130" x2="110" y2="130"/><line x1="85" y1="150" x2="90" y2="130"/>
      <line x1="115" y1="150" x2="110" y2="130"/><line x1="70" y1="135" x2="75" y2="110"/>
      <line x1="130" y1="135" x2="125" y2="110"/><line x1="85" y1="150" x2="115" y2="150"/>
      <circle cx="80" cy="105" r="2" fill="rgba(0,255,65,0.06)"/>
      <circle cx="120" cy="105" r="2" fill="rgba(0,255,65,0.06)"/>
    </g>
  </svg>`,
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="rgba(0,255,65,0.06)" stroke-width="1.2">
      <path d="M80,170 Q75,130 78,100 Q80,70 90,50 Q95,40 100,35 Q105,40 110,50 Q120,70 122,100 Q125,130 120,170Z"/>
      <path d="M90,30 Q85,15 80,10 M100,28 Q100,12 100,5 M110,30 Q115,15 120,10"/>
      <circle cx="90" cy="60" r="4"/><circle cx="110" cy="60" r="4"/>
      <circle cx="85" cy="80" r="4"/><circle cx="100" cy="75" r="4"/><circle cx="115" cy="80" r="4"/>
      <circle cx="85" cy="100" r="4"/><circle cx="100" cy="97" r="4"/><circle cx="115" cy="100" r="4"/>
      <circle cx="87" cy="120" r="4"/><circle cx="100" cy="118" r="4"/><circle cx="113" cy="120" r="4"/>
      <circle cx="90" cy="140" r="4"/><circle cx="100" cy="138" r="4"/><circle cx="110" cy="140" r="4"/>
      <circle cx="93" cy="158" r="3"/><circle cx="107" cy="158" r="3"/>
      <line x1="90" y1="60" x2="110" y2="60"/><line x1="90" y1="60" x2="100" y2="75"/>
      <line x1="110" y1="60" x2="100" y2="75"/><line x1="85" y1="80" x2="100" y2="75"/>
      <line x1="115" y1="80" x2="100" y2="75"/><line x1="85" y1="80" x2="85" y2="100"/>
      <line x1="115" y1="80" x2="115" y2="100"/><line x1="100" y1="97" x2="85" y2="100"/>
      <line x1="100" y1="97" x2="115" y2="100"/><line x1="85" y1="100" x2="87" y2="120"/>
      <line x1="115" y1="100" x2="113" y2="120"/><line x1="100" y1="118" x2="87" y2="120"/>
      <line x1="100" y1="118" x2="113" y2="120"/><line x1="90" y1="140" x2="100" y2="138"/>
      <line x1="110" y1="140" x2="100" y2="138"/><line x1="87" y1="120" x2="90" y2="140"/>
      <line x1="113" y1="120" x2="110" y2="140"/>
    </g>
  </svg>`,
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="rgba(0,255,65,0.06)" stroke-width="1.2">
      <line x1="10" y1="180" x2="190" y2="180"/><line x1="10" y1="185" x2="190" y2="185"/>
      <line x1="30" y1="180" x2="30" y2="130"/><circle cx="30" cy="128" r="3"/>
      <line x1="30" y1="128" x2="20" y2="110"/><circle cx="20" cy="108" r="2.5"/>
      <line x1="30" y1="128" x2="40" y2="108"/><circle cx="40" cy="106" r="2.5"/>
      <line x1="30" y1="128" x2="30" y2="105"/><circle cx="30" cy="103" r="2.5"/>
      <line x1="20" y1="108" x2="30" y2="103"/><line x1="40" y1="106" x2="30" y2="103"/>
      <line x1="20" y1="108" x2="10" y2="95"/><circle cx="10" cy="93" r="2"/>
      <line x1="40" y1="106" x2="48" y2="92"/><circle cx="48" cy="90" r="2"/>
      <line x1="80" y1="180" x2="80" y2="125"/><circle cx="80" cy="123" r="3"/>
      <line x1="80" y1="123" x2="68" y2="105"/><circle cx="68" cy="103" r="2.5"/>
      <line x1="80" y1="123" x2="92" y2="103"/><circle cx="92" cy="101" r="2.5"/>
      <line x1="80" y1="123" x2="80" y2="98"/><circle cx="80" cy="96" r="2.5"/>
      <line x1="68" y1="103" x2="80" y2="96"/><line x1="92" y1="101" x2="80" y2="96"/>
      <line x1="68" y1="103" x2="60" y2="88"/><circle cx="60" cy="86" r="2"/>
      <line x1="92" y1="101" x2="100" y2="85"/><circle cx="100" cy="83" r="2"/>
      <line x1="140" y1="180" x2="140" y2="135"/><circle cx="140" cy="133" r="3"/>
      <line x1="140" y1="133" x2="128" y2="115"/><circle cx="128" cy="113" r="2.5"/>
      <line x1="140" y1="133" x2="152" y2="112"/><circle cx="152" cy="110" r="2.5"/>
      <line x1="140" y1="133" x2="140" y2="108"/><circle cx="140" cy="106" r="2.5"/>
      <line x1="128" y1="113" x2="140" y2="106"/><line x1="152" y1="110" x2="140" y2="106"/>
      <line x1="128" y1="113" x2="120" y2="98"/><circle cx="120" cy="96" r="2"/>
      <line x1="152" y1="110" x2="160" y2="95"/><circle cx="160" cy="93" r="2"/>
      <line x1="175" y1="180" x2="175" y2="150"/><circle cx="175" cy="148" r="2.5"/>
      <line x1="175" y1="148" x2="168" y2="135"/><circle cx="168" cy="133" r="2"/>
      <line x1="175" y1="148" x2="183" y2="133"/><circle cx="183" cy="131" r="2"/>
    </g>
  </svg>`
];

function placeNeuroSVGs() {
  document.querySelectorAll('.neuro-svg').forEach(el => el.remove());
  const mainEl = document.querySelector('.main');
  if (!mainEl) return;
  const count = 1 + Math.floor(Math.random() * 2);
  const used = [];
  for (let i = 0; i < count; i++) {
    let idx;
    do { idx = Math.floor(Math.random() * NEURO_SVGS.length); } while (used.includes(idx) && used.length < NEURO_SVGS.length);
    used.push(idx);
    const div = document.createElement('div');
    div.className = 'neuro-svg';
    div.innerHTML = NEURO_SVGS[idx];
    const positions = [
      { top: '80px', left: '10px' }, { top: '300px', right: '10px' },
      { bottom: '200px', left: '20px' }, { top: '500px', right: '20px' },
      { bottom: '100px', right: '30px' }, { top: '150px', left: '30px' }
    ];
    Object.assign(div.style, positions[Math.floor(Math.random() * positions.length)]);
    mainEl.appendChild(div);
  }
}

// ========== AUTHORS BLOCK ==========
function getAuthorsBlock() {
  return `
    <div class="authors-terminal" id="authorsTerminal">
      <div class="at-cmd" id="atCmd"></div>
      <div class="at-line" id="atLine1">💻 Код: Claude Code</div>
      <div class="at-line" id="atLine2">💡 Идея: Сердюк Артём</div>
      <div class="at-line" id="atLine3">🔥 Вдохновитель: Александр Ясаков</div>
      <div class="at-echo" id="atEcho"></div>
    </div>
  `;
}

function initAuthorsObserver() {
  const terminal = document.getElementById('authorsTerminal');
  if (!terminal) return;
  let triggered = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        observer.disconnect();
        runAuthorsTypewriter();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(terminal);
}

function runAuthorsTypewriter() {
  const cmdEl = document.getElementById('atCmd');
  const lines = [document.getElementById('atLine1'), document.getElementById('atLine2'), document.getElementById('atLine3')];
  const echoEl = document.getElementById('atEcho');
  const cmdText = '> cat /credits/authors.txt';
  const echoText = '> echo "Спасибо, что дочитали!"';
  let i = 0;
  function typeCmd() {
    if (i <= cmdText.length) {
      cmdEl.innerHTML = cmdText.slice(0, i) + '<span class="at-cursor"></span>';
      i++;
      setTimeout(typeCmd, 40);
    } else {
      cmdEl.innerHTML = cmdText;
      setTimeout(() => {
        lines.forEach((l, idx) => setTimeout(() => l.classList.add('visible'), idx * 200));
        setTimeout(typeEcho, 800);
      }, 300);
    }
  }
  let j = 0;
  function typeEcho() {
    echoEl.classList.add('visible');
    function step() {
      if (j <= echoText.length) {
        echoEl.innerHTML = echoText.slice(0, j) + '<span class="at-cursor"></span>';
        j++;
        setTimeout(step, 40);
      }
    }
    step();
  }
  typeCmd();
}

// ========== PAYMENT PAGE ==========
let lastTestScore = 0;
let lastTestCorrect = 0;
let lastTestTotal = 30;

function renderPayment() {
  return `
    <div class="payment-hero">
      <span class="badge">🎓 Нейросертификат</span>
      <h1>НЕЙРОСЕРТИФИКАТ PREMIUM ULTRA PRO MAX</h1>
      <p class="subtitle">Подтверди свои знания в области AI-агентов</p>
    </div>

    <h2 style="text-align:center; border:none; margin-top:16px;">Выберите тариф</h2>

    <div class="pricing-grid">
      <div class="pricing-card">
        <div class="pricing-title">Базовый</div>
        <div class="pricing-price"><s>0.001 BTC / мес</s><br>Бесплатно (но мы будем грустить)</div>
        <ul class="pricing-features">
          <li>Сертификат в формате .txt</li>
          <li>Подпись нейрокоровы</li>
          <li>Доступ к моральной поддержке 24/7</li>
        </ul>
        <button class="btn-pricing" onclick="openPayModal()">Выбрать (это ловушка)</button>
      </div>

      <div class="pricing-card featured">
        <div class="pricing-badge">Популярный</div>
        <div class="pricing-title">Продвинутый</div>
        <div class="pricing-price">Массаж для сервера / мес</div>
        <ul class="pricing-features">
          <li>Сертификат в формате .pdf с ПЕЧАТЬЮ</li>
          <li>Персональная нейрокорова-наставник</li>
          <li>Доступ к секретному Telegram-каналу (которого нет)</li>
          <li>3 бесплатных промпта в день (у вас и так безлимит)</li>
        </ul>
        <button class="btn-pricing" onclick="openPayModal()">Купить (карта не нужна)</button>
      </div>

      <div class="pricing-card">
        <div class="pricing-title">Корпоративный</div>
        <div class="pricing-price">Позвоните нам (телефон не подключён)</div>
        <ul class="pricing-features">
          <li>Всё из Продвинутого</li>
          <li>Нейрокорова приедет лично</li>
          <li>Интеграция с вашим холодильником</li>
          <li>Еженедельные отчёты о погоде</li>
          <li>Александр Ясаков лично пожмёт руку</li>
        </ul>
        <button class="btn-pricing" onclick="openPayModal()">Связаться (не работает)</button>
      </div>
    </div>

    <div class="payment-legal">
      Нажимая кнопку, вы соглашаетесь отдать свою нейрокорову в аренду на 42 года. Все транзакции обрабатываются нейрокукурузой версии 0.0.1-alpha. При возникновении вопросов обращайтесь к нейрополю по адресу /dev/null. Лицензия: WTFPL. &copy; 2026 Нейроферма Глобал
    </div>
  `;
}

function openPayModal() {
  const overlay = document.createElement('div');
  overlay.className = 'pay-modal-overlay';
  overlay.innerHTML = `
    <div class="pay-modal">
      <h2>💳 Оформление подписки</h2>
      <input type="text" class="pay-field" id="payCard" placeholder="Номер карты" maxlength="19" autocomplete="off">
      <div class="pay-row">
        <input type="text" class="pay-field" id="payExpiry" placeholder="MM/YY" maxlength="5" autocomplete="off">
        <input type="password" class="pay-field" id="payCvv" placeholder="CVV" maxlength="3" autocomplete="off">
      </div>
      <input type="text" class="pay-field" id="payName" placeholder="Имя на карте" autocomplete="off">
      <button class="btn-pay" id="btnPay" onclick="processPayment()">💰 Оплатить</button>
      <div class="pay-progress" id="payProgress"><div class="pay-progress-fill" id="payProgressFill"></div></div>
      <div class="pay-status" id="payStatus"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const cardInput = overlay.querySelector('#payCard');
  cardInput.addEventListener('input', () => {
    let v = cardInput.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(.{4})/g, '$1 ').trim();
    cardInput.value = v;
  });

  const expiryInput = overlay.querySelector('#payExpiry');
  expiryInput.addEventListener('input', () => {
    let v = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    expiryInput.value = v;
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

function processPayment() {
  const btn = document.getElementById('btnPay');
  const progress = document.getElementById('payProgress');
  const fill = document.getElementById('payProgressFill');
  const status = document.getElementById('payStatus');

  const card = document.getElementById('payCard').value.trim();
  const expiry = document.getElementById('payExpiry').value.trim();
  const cvv = document.getElementById('payCvv').value.trim();
  const name = document.getElementById('payName').value.trim();
  const hasInput = card.length > 0 || expiry.length > 0 || cvv.length > 0 || name.length > 0;

  btn.disabled = true;
  btn.textContent = '⏳ Обработка платежа...';

  setTimeout(() => {
    progress.style.display = 'block';
    status.textContent = 'Связь с банком...';
    requestAnimationFrame(() => fill.style.width = '100%');

    setTimeout(() => {
      status.textContent = 'Подтверждение транзакции...';

      setTimeout(() => {
        document.body.classList.add('pay-glitch-active');
        setTimeout(() => {
          document.body.classList.remove('pay-glitch-active');
          const modal = document.querySelector('.pay-modal-overlay');
          if (modal) modal.remove();
          showRevealScreen(hasInput);
        }, 500);
      }, 1000);
    }, 2000);
  }, 2000);
}

function showRevealScreen(hadInput) {
  const overlay = document.createElement('div');
  overlay.className = 'reveal-overlay';

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  overlay.appendChild(canvas);

  const smartPrefix = hadInput
    ? ''
    : '<div class="reveal-line reveal-text">Даже не попытался ввести данные. Умный ход. 🧠</div>';

  overlay.innerHTML += `
    <div class="reveal-content">
      <div class="reveal-line reveal-emoji">😄</div>
      <div class="reveal-line reveal-title">РАССЛАБЬСЯ</div>
      ${smartPrefix}
      <div class="reveal-line reveal-text">Это был тест на внимательность.</div>
      <div class="reveal-line reveal-text">Курс полностью бесплатный. Мы бы никогда не взяли с тебя деньги за знания об AI-агентах.</div>
      <div class="reveal-line reveal-text">А вот карту лучше перевыпусти. Шутка. Или нет. 👀</div>
      <div class="reveal-line reveal-text">Твой результат теста: ${lastTestScore}% (${lastTestCorrect} из ${lastTestTotal})</div>
      <div class="reveal-line reveal-text mono">print("Сертификат уже в твоём сердце ❤️")</div>
      <div class="reveal-line"><a href="#home" class="btn-back-home" onclick="this.closest('.reveal-overlay').remove()">← Вернуться на главную</a></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const lines = overlay.querySelectorAll('.reveal-line');
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 300 + i * 400);
  });

  runConfetti(canvas);
}

function runConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  const pieces = [];
  const colors = ['#00ff41', '#ffffff', '#ffd700', '#33ff66', '#e0e0e0'];

  for (let i = 0; i < 60; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 300,
      w: 6 + Math.random() * 8,
      h: 6 + Math.random() * 8,
      vy: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.8 + Math.random() * 0.2
    });
  }

  const start = performance.now();

  function draw(now) {
    const elapsed = now - start;
    if (elapsed > 5000) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fade = elapsed > 3500 ? 1 - (elapsed - 3500) / 1500 : 1;

    pieces.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vr;
      p.vx += (Math.random() - 0.5) * 0.05;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha * Math.max(0, fade);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

// ========== PAGE RENDERING ==========
let previousPage = null;

function renderPage(page) {
  const el = document.getElementById('content');

  const isLecture = page.startsWith('lecture-');
  const shouldRain = previousPage !== null && previousPage !== page;

  function doRender() {
    let html = '';
    if (page === 'home') {
      html = renderHome();
    } else if (page === 'test') {
      html = renderTest();
    } else if (page === 'payment') {
      html = renderPayment();
    } else if (CONTENT[page]) {
      let contentHTML = CONTENT[page];
      if (isLecture) {
        contentHTML = getPdfButton(page) + contentHTML;
        contentHTML = wrapLectureContent(contentHTML + getNavButtons(page));
      } else {
        contentHTML = contentHTML + getNavButtons(page);
      }
      html = contentHTML;
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
      initAuthorsObserver();
    }
    if (isLecture) {
      setTimeout(() => startLectureTypewriter(el), 100);
    }

    placeNeuroSVGs();
    previousPage = page;
  }

  if (shouldRain) playNeuralRain();

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
    ${getAuthorsBlock()}
    <div class="footer">&gt; AI-агенты и мультиагентные системы &copy; 2026</div>
  `;
}

// ========== ANIMATED SCORE COUNTER + CERTIFICATE BUTTON ==========
const origCheckTest = window.checkTest;
window.checkTest = function() {
  origCheckTest();

  const scoreEl = document.getElementById('resultScore');
  if (!scoreEl) return;
  const finalText = scoreEl.textContent;
  const finalNum = parseInt(finalText);
  if (isNaN(finalNum)) return;

  const resultTextEl = document.getElementById('resultText');
  const match = resultTextEl ? resultTextEl.textContent.match(/(\d+)\s.*?(\d+)/) : null;
  if (match) {
    lastTestCorrect = parseInt(match[1]);
    lastTestTotal = parseInt(match[2]);
  }
  lastTestScore = finalNum;

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

  const resultEl = document.getElementById('testResult');
  if (resultEl && !resultEl.querySelector('.btn-certificate')) {
    const certBtn = document.createElement('a');
    certBtn.href = '#payment';
    certBtn.className = 'btn-certificate';
    certBtn.textContent = '🎓 Получить сертификат';
    resultEl.appendChild(certBtn);
  }
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
  initMarquee();
  router();
});
