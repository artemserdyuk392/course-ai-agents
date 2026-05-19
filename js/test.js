const TEST_QUESTIONS = [
  // === SINGLE CHOICE (10) ===
  {
    type: 'single',
    text: 'Какое определение наиболее точно описывает интеллектуального агента по Расселу и Норвигу?',
    options: [
      'Программа, выполняющая заданный алгоритм без отклонений',
      'Сущность, воспринимающая среду через сенсоры и действующая через актуаторы для достижения целей',
      'Нейронная сеть, обученная на большом объёме данных',
      'Робот, способный перемещаться в пространстве'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Какой компонент BDI-модели отвечает за обязательства агента, определяющие текущее направление действий?',
    options: [
      'Beliefs (Убеждения)',
      'Desires (Желания)',
      'Intentions (Намерения)',
      'Goals (Цели)'
    ],
    correct: 2
  },
  {
    type: 'single',
    text: 'В алгоритме Q-learning обновление Q-значения использует:',
    options: [
      'Минимальное Q-значение следующего состояния',
      'Q-значение фактически выбранного следующего действия (как в SARSA)',
      'Максимальное Q-значение следующего состояния',
      'Среднее Q-значение по всем действиям в следующем состоянии'
    ],
    correct: 2
  },
  {
    type: 'single',
    text: 'Какой перформатив FIPA-ACL используется для запроса предложений от других агентов?',
    options: [
      'inform',
      'request',
      'cfp (call for proposals)',
      'propose'
    ],
    correct: 2
  },
  {
    type: 'single',
    text: 'Аукцион Викри (второй цены) обладает свойством incentive compatibility, что означает:',
    options: [
      'Победитель платит свою ставку',
      'Участникам выгодно ставить истинную ценность товара',
      'Аукцион всегда приносит максимальный доход продавцу',
      'Все участники платят одинаковую цену'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Паттерн ReAct в LLM-агентах чередует:',
    options: [
      'Обучение и тестирование',
      'Рассуждение (Thought), действие (Action) и наблюдение (Observation)',
      'Генерацию и дискриминацию',
      'Кодирование и декодирование'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Какой фреймворк мультиагентной оркестрации строит системы как графы состояний с условными переходами?',
    options: [
      'CrewAI',
      'AutoGen',
      'LangGraph',
      'JADE'
    ],
    correct: 2
  },
  {
    type: 'single',
    text: 'Косвенная prompt injection отличается от прямой тем, что:',
    options: [
      'Она использует более сложный язык',
      'Вредоносные инструкции внедрены в данные, обрабатываемые агентом (документы, веб-страницы)',
      'Она работает только с открытыми моделями',
      'Она требует физического доступа к серверу'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'PPO (Proximal Policy Optimization) ограничивает изменение политики через:',
    options: [
      'L2-регуляризацию весов нейросети',
      'Фиксированный размер шага градиентного спуска',
      'Обрезку (clipping) отношения вероятностей новой и старой политик',
      'Раннюю остановку обучения'
    ],
    correct: 2
  },
  {
    type: 'single',
    text: 'В архитектуре подчинения (subsumption) Брукса высшие слои поведения:',
    options: [
      'Всегда выполняются первыми',
      'Могут подавлять (subsume) выходы низших слоёв',
      'Имеют более высокий приоритет и подавляют низшие',
      'Работают только при отключении низших слоёв'
    ],
    correct: 2
  },

  // === MULTIPLE CHOICE (8) ===
  {
    type: 'multiple',
    text: 'Какие из перечисленных свойств являются ключевыми характеристиками интеллектуального агента? (выберите все подходящие)',
    options: [
      'Автономность',
      'Детерминированность',
      'Реактивность',
      'Проактивность',
      'Социальность'
    ],
    correct: [0, 2, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие из следующих элементов входят в формализм PEAS для описания агента?',
    options: [
      'Performance (мера производительности)',
      'Planning (планирование)',
      'Environment (среда)',
      'Actuators (исполнительные механизмы)',
      'Sensors (сенсоры)'
    ],
    correct: [0, 2, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие нововведения обеспечили стабильность обучения DQN? (выберите все подходящие)',
    options: [
      'Experience Replay (буфер воспроизведения)',
      'Dropout регуляризация',
      'Target Network (целевая сеть)',
      'Batch Normalization'
    ],
    correct: [0, 2]
  },
  {
    type: 'multiple',
    text: 'Какие паттерны оркестрации мультиагентных LLM-систем поддерживают параллельное выполнение задач?',
    options: [
      'Sequential (pipeline)',
      'Map-Reduce',
      'Supervisor',
      'Debate'
    ],
    correct: [1, 2]
  },
  {
    type: 'multiple',
    text: 'Какие из следующих являются типами памяти LLM-агента?',
    options: [
      'Кратковременная (контекстное окно)',
      'Процедурная (навыки)',
      'Долговременная (RAG / векторная БД)',
      'Эпизодическая (лог действий)',
      'Рабочая (scratchpad)'
    ],
    correct: [0, 2, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие стратегии защиты от prompt injection применимы к LLM-агентам?',
    options: [
      'Санитизация ввода',
      'Принцип наименьших привилегий',
      'Увеличение контекстного окна',
      'Фильтрация вывода',
      'Sandboxing выполнения кода'
    ],
    correct: [0, 1, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие из перечисленных бенчмарков используются для оценки AI-агентов?',
    options: [
      'ImageNet',
      'SWE-bench',
      'GAIA',
      'WebArena',
      'GLUE'
    ],
    correct: [1, 2, 3]
  },
  {
    type: 'multiple',
    text: 'Какие свойства характерны для мультиагентных систем (МАС)?',
    options: [
      'Централизованное управление',
      'Децентрализация',
      'Локальность информации',
      'Глобальные часы синхронизации',
      'Асинхронность'
    ],
    correct: [1, 2, 4]
  },

  // === TEXT INPUT (5) ===
  {
    type: 'text',
    text: 'Как называется модель агента, основанная на трёх компонентах: убеждения, желания и намерения? (аббревиатура из 3 букв)',
    correct: ['BDI', 'bdi', 'БДИ']
  },
  {
    type: 'text',
    text: 'Как называется архитектурный паттерн, расширяющий знания LLM через поиск во внешних источниках данных? (аббревиатура из 3 букв)',
    correct: ['RAG', 'rag', 'РАГ']
  },
  {
    type: 'text',
    text: 'Как называется протокол распределения задач в МАС, основанный на метафоре рынка подрядов? (два английских слова через пробел + Protocol)',
    correct: ['Contract Net Protocol', 'contract net protocol', 'Contract Net', 'contract net', 'CNP', 'cnp']
  },
  {
    type: 'text',
    text: 'Как называется международная организация, разработавшая стандарты коммуникации агентов (ACL)? (аббревиатура из 4 букв)',
    correct: ['FIPA', 'fipa', 'ФИПА']
  },
  {
    type: 'text',
    text: 'Какой алгоритм обучения с подкреплением использует clipped surrogate objective для стабилизации обучения? (аббревиатура из 3 букв)',
    correct: ['PPO', 'ppo']
  },

  // === MATCHING (4) ===
  {
    type: 'matching',
    text: 'Сопоставьте тип агента с его характеристикой:',
    left: ['Реактивный агент', 'Deliberative агент', 'Гибридный агент', 'Обучающийся агент'],
    right: ['Нет модели мира, прямые правила стимул-реакция', 'Символическая модель мира и планирование', 'Комбинация реактивного и планирующего слоёв', 'Совершенствуется через опыт взаимодействия со средой'],
    correct: {0:0, 1:1, 2:2, 3:3}
  },
  {
    type: 'matching',
    text: 'Сопоставьте фреймворк оркестрации с его ключевой парадигмой:',
    left: ['CrewAI', 'AutoGen', 'LangGraph', 'JADE'],
    right: ['Граф состояний с условными переходами', 'Ролевой подход (Agent, Task, Crew)', 'FIPA-совместимая агентная платформа', 'Разговорные агенты (Conversable Agents)'],
    correct: {0:1, 1:3, 2:0, 3:2}
  },
  {
    type: 'matching',
    text: 'Сопоставьте тип аукциона с его описанием:',
    left: ['Английский', 'Голландский', 'Викри (второй цены)', 'Комбинаторный'],
    right: ['Нисходящая цена, первый согласившийся побеждает', 'Ставки на комбинации товаров', 'Открытые восходящие ставки', 'Закрытые ставки, победитель платит вторую цену'],
    correct: {0:2, 1:0, 2:3, 3:1}
  },
  {
    type: 'matching',
    text: 'Сопоставьте компонент LLM-агента с его реализацией:',
    left: ['Восприятие', 'Рассуждение', 'Действие', 'Память'],
    right: ['Chain-of-Thought, ReAct', 'Векторная БД, RAG', 'Function calling, tool use', 'Пользовательский ввод, API-ответы'],
    correct: {0:3, 1:0, 2:2, 3:1}
  },

  // === ORDERING (3) ===
  {
    type: 'ordering',
    text: 'Расположите этапы цикла sense-plan-act в правильном порядке:',
    items: ['Выполнение действия', 'Восприятие среды', 'Обновление модели мира', 'Формирование плана'],
    correct: [1, 2, 3, 0]
  },
  {
    type: 'ordering',
    text: 'Расположите этапы RAG-пайплайна в правильном порядке:',
    items: ['Генерация ответа (Generation)', 'Поиск релевантных чанков (Retrieval)', 'Индексация документов (Indexing)', 'Дополнение промпта контекстом (Augmentation)'],
    correct: [2, 1, 3, 0]
  },
  {
    type: 'ordering',
    text: 'Расположите этапы Contract Net Protocol в правильном порядке:',
    items: ['Выбор подрядчика (Award)', 'Подача заявок (Bid)', 'Отчёт о выполнении (Report)', 'Объявление задачи (Announce)'],
    correct: [3, 1, 0, 2]
  }
];

function renderTest() {
  let html = '<span class="badge">Итоговый тест</span>';
  html += '<h1>Итоговый тест</h1>';
  html += '<p class="subtitle">30 вопросов по всем 8 лекциям курса</p>';

  const typeLabels = {
    single: 'Один ответ',
    multiple: 'Несколько ответов',
    text: 'Ввод ответа',
    matching: 'Сопоставление',
    ordering: 'Упорядочивание'
  };

  TEST_QUESTIONS.forEach((q, i) => {
    html += '<div class="test-question" data-index="' + i + '">';
    html += '<div class="question-header">';
    html += '<span class="question-number">Вопрос ' + (i + 1) + '</span>';
    html += '<span class="question-type">' + typeLabels[q.type] + '</span>';
    html += '</div>';
    html += '<div class="question-text">' + q.text + '</div>';

    if (q.type === 'single') {
      q.options.forEach((opt, j) => {
        html += '<label class="option-label" data-opt="' + j + '">';
        html += '<input type="radio" name="q' + i + '" value="' + j + '"> ' + opt;
        html += '</label>';
      });
    } else if (q.type === 'multiple') {
      q.options.forEach((opt, j) => {
        html += '<label class="option-label" data-opt="' + j + '">';
        html += '<input type="checkbox" name="q' + i + '" value="' + j + '"> ' + opt;
        html += '</label>';
      });
    } else if (q.type === 'text') {
      html += '<input type="text" class="text-input-answer" data-question="' + i + '" placeholder="Введите ответ...">';
      html += '<div class="correct-text" data-question="' + i + '">Правильный ответ: ' + q.correct[0] + '</div>';
    } else if (q.type === 'matching') {
      html += '<div class="matching-container" data-question="' + i + '">';
      html += '<div class="matching-left">';
      q.left.forEach((item, j) => {
        html += '<div class="matching-item matching-left-item" data-side="left" data-idx="' + j + '">' + item + '<span class="match-indicator"></span></div>';
      });
      html += '</div>';
      html += '<div class="matching-right">';
      const shuffled = q.right.map((item, idx) => ({item, idx}));
      for (let k = shuffled.length - 1; k > 0; k--) {
        const r = Math.floor(Math.random() * (k + 1));
        [shuffled[k], shuffled[r]] = [shuffled[r], shuffled[k]];
      }
      shuffled.forEach((s) => {
        html += '<div class="matching-item matching-right-item" data-side="right" data-idx="' + s.idx + '">' + s.item + '</div>';
      });
      html += '</div></div>';
    } else if (q.type === 'ordering') {
      html += '<div class="ordering-list" data-question="' + i + '">';
      const shuffled = q.items.map((item, idx) => ({item, idx}));
      for (let k = shuffled.length - 1; k > 0; k--) {
        const r = Math.floor(Math.random() * (k + 1));
        [shuffled[k], shuffled[r]] = [shuffled[r], shuffled[k]];
      }
      shuffled.forEach((s) => {
        html += '<div class="ordering-item" data-original="' + s.idx + '"><span class="drag-handle">&#9776;</span> ' + s.item + '</div>';
      });
      html += '</div>';
    }

    html += '</div>';
  });

  html += '<div class="test-actions"><button class="btn-check" onclick="checkTest()">Проверить</button></div>';
  html += '<div class="test-result" id="testResult"><div class="result-score" id="resultScore"></div><div class="result-text" id="resultText"></div><div class="result-bar"><div class="result-bar-fill" id="resultBar"></div></div></div>';

  return html;
}

function initTest() {
  initMatching();
  initOrdering();
}

function initMatching() {
  document.querySelectorAll('.matching-container').forEach(container => {
    let selectedLeft = null;
    const matches = {};

    container.querySelectorAll('.matching-item').forEach(item => {
      item.addEventListener('click', () => {
        const side = item.dataset.side;
        const idx = parseInt(item.dataset.idx);

        if (side === 'left') {
          container.querySelectorAll('.matching-left-item').forEach(el => el.classList.remove('selected'));
          if (selectedLeft === idx) {
            selectedLeft = null;
            return;
          }
          selectedLeft = idx;
          item.classList.add('selected');
        } else if (side === 'right' && selectedLeft !== null) {
          Object.keys(matches).forEach(k => {
            if (matches[k] === idx) {
              delete matches[k];
              const oldLeft = container.querySelector('.matching-left-item[data-idx="' + k + '"]');
              if (oldLeft) {
                oldLeft.classList.remove('matched');
                oldLeft.querySelector('.match-indicator').textContent = '';
              }
            }
          });

          const prevRight = matches[selectedLeft];
          if (prevRight !== undefined) {
            const oldRight = container.querySelector('.matching-right-item[data-idx="' + prevRight + '"]');
            if (oldRight) oldRight.classList.remove('matched');
          }

          matches[selectedLeft] = idx;

          const leftEl = container.querySelector('.matching-left-item[data-idx="' + selectedLeft + '"]');
          leftEl.classList.remove('selected');
          leftEl.classList.add('matched');
          leftEl.querySelector('.match-indicator').textContent = '→ ' + item.textContent;
          item.classList.add('matched');

          selectedLeft = null;
        }
      });
    });

    container._matches = matches;
  });
}

function initOrdering() {
  document.querySelectorAll('.ordering-list').forEach(list => {
    let draggedItem = null;

    list.querySelectorAll('.ordering-item').forEach(item => {
      item.setAttribute('draggable', 'true');

      item.addEventListener('dragstart', (e) => {
        draggedItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedItem = null;
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = item.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        if (e.clientY < mid) {
          list.insertBefore(draggedItem, item);
        } else {
          list.insertBefore(draggedItem, item.nextSibling);
        }
      });

      // Touch support
      let touchStartY = 0;
      item.addEventListener('touchstart', (e) => {
        draggedItem = item;
        touchStartY = e.touches[0].clientY;
        item.classList.add('dragging');
      }, {passive: true});

      item.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
        const target = elements.find(el => el.classList.contains('ordering-item') && el !== draggedItem);
        if (target) {
          const rect = target.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (touch.clientY < mid) {
            list.insertBefore(draggedItem, target);
          } else {
            list.insertBefore(draggedItem, target.nextSibling);
          }
        }
      }, {passive: false});

      item.addEventListener('touchend', () => {
        if (draggedItem) draggedItem.classList.remove('dragging');
        draggedItem = null;
      });
    });
  });
}

function checkTest() {
  let correct = 0;
  const total = TEST_QUESTIONS.length;

  TEST_QUESTIONS.forEach((q, i) => {
    const qEl = document.querySelector('.test-question[data-index="' + i + '"]');
    let isCorrect = false;

    if (q.type === 'single') {
      const selected = qEl.querySelector('input[name="q' + i + '"]:checked');
      const selectedVal = selected ? parseInt(selected.value) : -1;
      isCorrect = selectedVal === q.correct;

      qEl.querySelectorAll('.option-label').forEach(label => {
        const opt = parseInt(label.dataset.opt);
        if (opt === q.correct) {
          label.classList.add('correct-answer');
        } else if (opt === selectedVal && selectedVal !== q.correct) {
          label.classList.add('wrong-answer');
        }
      });
    } else if (q.type === 'multiple') {
      const checked = Array.from(qEl.querySelectorAll('input[name="q' + i + '"]:checked')).map(el => parseInt(el.value));
      isCorrect = checked.length === q.correct.length && checked.every(v => q.correct.includes(v));

      qEl.querySelectorAll('.option-label').forEach(label => {
        const opt = parseInt(label.dataset.opt);
        if (q.correct.includes(opt)) {
          label.classList.add('correct-answer');
        } else if (checked.includes(opt)) {
          label.classList.add('wrong-answer');
        }
      });
    } else if (q.type === 'text') {
      const input = qEl.querySelector('.text-input-answer');
      const answer = input.value.trim();
      isCorrect = q.correct.some(c => c.toLowerCase() === answer.toLowerCase());

      const correctDiv = qEl.querySelector('.correct-text');
      correctDiv.style.display = 'block';
      if (isCorrect) {
        input.style.borderColor = 'var(--success)';
      } else {
        input.style.borderColor = 'var(--error)';
      }
    } else if (q.type === 'matching') {
      const container = qEl.querySelector('.matching-container');
      const matches = container._matches || {};
      let allCorrect = true;

      q.left.forEach((_, j) => {
        const leftEl = container.querySelector('.matching-left-item[data-idx="' + j + '"]');
        const expectedRight = q.correct[j];
        const actualRight = matches[j];

        if (actualRight === expectedRight) {
          leftEl.classList.add('correct-match');
          const rightEl = container.querySelector('.matching-right-item[data-idx="' + actualRight + '"]');
          if (rightEl) rightEl.classList.add('correct-match');
        } else {
          allCorrect = false;
          leftEl.classList.add('wrong-match');
          if (actualRight !== undefined) {
            const wrongRight = container.querySelector('.matching-right-item[data-idx="' + actualRight + '"]');
            if (wrongRight) wrongRight.classList.add('wrong-match');
          }
        }
      });
      isCorrect = allCorrect;
    } else if (q.type === 'ordering') {
      const list = qEl.querySelector('.ordering-list');
      const items = Array.from(list.querySelectorAll('.ordering-item'));
      const currentOrder = items.map(el => parseInt(el.dataset.original));
      isCorrect = JSON.stringify(currentOrder) === JSON.stringify(q.correct);

      items.forEach((item, j) => {
        const orig = parseInt(item.dataset.original);
        if (orig === q.correct[j]) {
          item.classList.add('correct-order');
        } else {
          item.classList.add('wrong-order');
        }
      });
    }

    qEl.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) correct++;
  });

  const pct = Math.round((correct / total) * 100);
  const resultEl = document.getElementById('testResult');
  resultEl.classList.add('visible');
  document.getElementById('resultScore').textContent = pct + '%';
  document.getElementById('resultText').textContent = correct + ' из ' + total + ' правильных ответов';
  document.getElementById('resultBar').style.width = pct + '%';

  resultEl.scrollIntoView({behavior: 'smooth', block: 'center'});

  document.querySelector('.btn-check').disabled = true;
  document.querySelector('.btn-check').textContent = 'Проверено';
}
