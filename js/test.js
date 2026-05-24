const TEST_QUESTIONS = [
  // === SINGLE CHOICE (10) ===
  {
    type: 'single',
    text: 'Какой компонент когнитивной архитектуры агента отвечает за выбор следующего действия на основе текущего состояния и целей?',
    options: [
      'Модуль восприятия (Perception)',
      'Модуль планирования (Planning)',
      'Модуль памяти (Memory)',
      'Модуль действий (Action)'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Какой параметр API OpenAI контролирует степень случайности (креативности) генерации?',
    options: [
      'max_tokens',
      'temperature',
      'top_k',
      'presence_penalty'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Что такое tool calling в контексте LLM-агентов?',
    options: [
      'Вызов технической поддержки провайдера API',
      'Способность модели генерировать структурированные вызовы внешних функций',
      'Ручной запуск скриптов пользователем',
      'Метод обучения модели на данных инструментов'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Какая метрика чаще всего используется для поиска ближайших векторов в embedding-пространстве?',
    options: [
      'Евклидово расстояние',
      'Косинусное сходство',
      'Манхэттенское расстояние',
      'Расстояние Хэмминга'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Какой паттерн мультиагентной системы предполагает наличие центрального агента, координирующего работу остальных?',
    options: [
      'Peer-to-peer',
      'Supervisor (оркестратор)',
      'Swarm',
      'MapReduce'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Какой фреймворк использует концепцию графа состояний с условными переходами для управления потоком агента?',
    options: [
      'LangChain',
      'CrewAI',
      'LangGraph',
      'Langflow'
    ],
    correct: 2
  },
  {
    type: 'single',
    text: 'Косвенная prompt injection (indirect) отличается от прямой тем, что:',
    options: [
      'Она использует более сложный язык',
      'Вредоносные инструкции внедрены в данные, обрабатываемые агентом (документы, веб-страницы)',
      'Она работает только с open-source моделями',
      'Она требует физического доступа к серверу'
    ],
    correct: 1
  },
  {
    type: 'single',
    text: 'Что такое паттерн Reflexion в контексте AI-агентов?',
    options: [
      'Отражение данных между серверами для отказоустойчивости',
      'Способность агента анализировать собственные ошибки и улучшать поведение на основе рефлексии',
      'Дублирование агента для параллельной обработки',
      'Метод сжатия контекстного окна'
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
    text: 'Какой подход лучше всего подходит для оценки качества ответа агента, когда нет единственно верного ответа?',
    options: [
      'Точное сравнение строк',
      'LLM-as-a-judge с рубрикой оценки',
      'Измерение длины ответа',
      'Время генерации ответа'
    ],
    correct: 1
  },

  // === MULTIPLE CHOICE (8) ===
  {
    type: 'multiple',
    text: 'Какие из перечисленных являются модулями когнитивной архитектуры LLM-агента? (выберите все подходящие)',
    options: [
      'Восприятие (Perception)',
      'Компиляция (Compilation)',
      'Планирование (Planning)',
      'Память (Memory)',
      'Действие (Action)'
    ],
    correct: [0, 2, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие техники помогают сократить расход токенов при работе с LLM API?',
    options: [
      'Сжатие промпта (prompt compression)',
      'Увеличение temperature',
      'Кэширование ответов',
      'Использование embeddings для поиска вместо отправки всех данных',
      'Увеличение max_tokens'
    ],
    correct: [0, 2, 3]
  },
  {
    type: 'multiple',
    text: 'Какие из следующих действий агента считаются опасными и требуют подтверждения пользователя?',
    options: [
      'Чтение файла',
      'Удаление файла',
      'Отправка email',
      'Поиск в базе данных',
      'Выполнение SQL DELETE запроса'
    ],
    correct: [1, 2, 4]
  },
  {
    type: 'multiple',
    text: 'Какие из следующих являются типами памяти LLM-агента?',
    options: [
      'Краткосрочная (контекстное окно)',
      'Процедурная (навыки)',
      'Долговременная (RAG / векторная БД)',
      'Эпизодическая (лог действий)',
      'Рабочая (scratchpad)'
    ],
    correct: [0, 2, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие проблемы характерны для мультиагентных систем?',
    options: [
      'Сложность отладки',
      'Высокая стоимость (много вызовов LLM)',
      'Невозможность параллельного выполнения',
      'Проблемы координации между агентами',
      'Каскадные сбои'
    ],
    correct: [0, 1, 3, 4]
  },
  {
    type: 'multiple',
    text: 'Какие преимущества предоставляет LangGraph по сравнению с обычным LangChain AgentExecutor?',
    options: [
      'Визуализация потока выполнения',
      'Поддержка циклов и условных переходов',
      'Автоматическая генерация кода',
      'Управление состоянием между шагами',
      'Встроенная поддержка checkpoint/resume'
    ],
    correct: [0, 1, 3, 4]
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
    text: 'Какие стратегии используются для оценки качества работы агента в production?',
    options: [
      'LLM-as-a-judge',
      'A/B тестирование с реальными пользователями',
      'Ручная оценка выборки ответов',
      'Только unit-тесты',
      'Метрики удовлетворённости пользователей'
    ],
    correct: [0, 1, 2, 4]
  },

  // === TEXT INPUT (5) ===
  {
    type: 'text',
    text: 'Как называется архитектурный паттерн LLM-агента, чередующий Thought, Action и Observation? (название из 5 букв)',
    correct: ['ReAct', 'react', 'REACT', 'React']
  },
  {
    type: 'text',
    text: 'Как называется архитектурный паттерн, расширяющий знания LLM через поиск во внешних источниках данных? (аббревиатура из 3 букв)',
    correct: ['RAG', 'rag', 'РАГ']
  },
  {
    type: 'text',
    text: 'Как называется принцип безопасности, по которому агент должен иметь только минимально необходимые права? (два английских слова через пробел)',
    correct: ['least privilege', 'Least Privilege', 'Least privilege', 'LEAST PRIVILEGE']
  },
  {
    type: 'text',
    text: 'Как называется фреймворк для построения мультиагентных систем с ролевым подходом (Agent, Task, Crew)? (одно слово)',
    correct: ['CrewAI', 'crewai', 'CREWAI', 'Crewai']
  },
  {
    type: 'text',
    text: 'Как называется подход к оценке качества агента, при котором другая языковая модель выступает судьёй? (формат: LLM-as-a-????, одно слово вместо ????)',
    correct: ['judge', 'Judge', 'JUDGE']
  },

  // === MATCHING (4) ===
  {
    type: 'matching',
    text: 'Сопоставьте компонент LLM-агента с его реализацией:',
    left: ['Восприятие', 'Рассуждение', 'Действие', 'Память'],
    right: ['Chain-of-Thought, ReAct', 'Векторная БД, RAG', 'Function calling, tool use', 'Пользовательский ввод, API-ответы'],
    correct: {0:3, 1:0, 2:2, 3:1}
  },
  {
    type: 'matching',
    text: 'Сопоставьте фреймворк с его ключевой парадигмой:',
    left: ['LangChain', 'LangGraph', 'CrewAI', 'Langflow'],
    right: ['Визуальный конструктор (drag-and-drop)', 'Цепочки вызовов и LCEL', 'Граф состояний с условными переходами', 'Ролевой подход (Agent, Task, Crew)'],
    correct: {0:1, 1:2, 2:3, 3:0}
  },
  {
    type: 'matching',
    text: 'Сопоставьте тип памяти агента с его назначением:',
    left: ['Краткосрочная память', 'Долговременная память', 'Эпизодическая память', 'Семантическая память'],
    right: ['История прошлых сессий и действий', 'Факты и знания о домене', 'Текущий контекст диалога', 'Индексированные документы (RAG)'],
    correct: {0:2, 1:3, 2:0, 3:1}
  },
  {
    type: 'matching',
    text: 'Сопоставьте паттерн мультиагентной системы с его описанием:',
    left: ['Supervisor', 'Pipeline', 'Debate', 'Collaborative'],
    right: ['Последовательная обработка агентами', 'Агенты аргументируют разные позиции для достижения консенсуса', 'Центральный агент координирует и делегирует подзадачи', 'Агенты работают параллельно над частями задачи'],
    correct: {0:2, 1:0, 2:1, 3:3}
  },

  // === ORDERING (3) ===
  {
    type: 'ordering',
    text: 'Расположите этапы RAG-пайплайна в правильном порядке:',
    items: ['Генерация ответа (Generation)', 'Поиск релевантных чанков (Retrieval)', 'Индексация документов (Indexing)', 'Дополнение промпта контекстом (Augmentation)'],
    correct: [2, 1, 3, 0]
  },
  {
    type: 'ordering',
    text: 'Расположите этапы обработки tool call в правильном порядке:',
    items: ['Модель возвращает финальный текстовый ответ', 'Выполнить функцию локально и получить результат', 'Отправить запрос пользователя с описанием tools', 'Модель возвращает tool_call с именем и аргументами', 'Отправить результат с ролью tool обратно в API'],
    correct: [2, 3, 1, 4, 0]
  },
  {
    type: 'ordering',
    text: 'Расположите этапы деплоя агента в production в правильном порядке:',
    items: ['Полный rollout с A/B тестированием', 'Написание eval-набора и бенчмарков', 'Canary-релиз на малую аудиторию', 'Разработка и тестирование агента', 'Настройка мониторинга и алертов'],
    correct: [3, 1, 4, 2, 0]
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
