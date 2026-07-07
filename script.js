/* =========================================================
   AURA VET — shared script
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initToast();
  initBlogModal();
  initBookingWizard();
  initContactForm();
  initScrollReveal();
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});

/* ---------------- scroll reveal ---------------- */

function initScrollReveal() {
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('has-reveal');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(function (t) { io.observe(t); });
}

/* ---------------- mobile nav ---------------- */

function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('mobile-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('mobile-open');
      toggle.classList.remove('is-open');
    });
  });
}

/* ---------------- toast ---------------- */

function initToast() {
  if (document.querySelector('.toast')) return;
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span></span>';
  document.body.appendChild(toast);
}

function showToast(message) {
  var toast = document.querySelector('.toast');
  if (!toast) return;
  toast.querySelector('span').textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 3200);
}

/* ---------------- blog modal ---------------- */

var ARTICLES = {
  surgery: {
    tag: 'Хирургия',
    title: 'Как подготовить собаку к операции',
    date: '2 июля 2026',
    read: '6 мин чтения',
    body: [
      'Плановая операция — всегда стресс, но правильная подготовка снижает риски и ускоряет восстановление питомца. Вот что важно сделать за несколько дней до визита в клинику.',
    ],
    list: [
      'Голодная диета за 8–12 часов до наркоза — узнайте точное время у своего врача.',
      'Свежий анализ крови и мочи не позднее чем за 5–7 дней до операции.',
      'Сообщите врачу обо всех препаратах и добавках, которые получает питомец.',
      'В день операции не поите собаку водой после утреннего приёма пищи, если это оговорено врачом.',
      'Возьмите с собой любимую подстилку или игрушку — так животному спокойнее после наркоза.',
    ],
    tail: 'После операции первые 24 часа собака может быть вялой — это нормальная реакция на анестезию. Наши врачи подробно распишут схему восстановления и обезболивания индивидуально для вашего питомца.',
  },
  dental: {
    tag: 'Стоматология',
    title: 'Нужно ли чистить зубы кошке',
    date: '18 июня 2026',
    read: '4 мин чтения',
    body: [
      'Да — и это не преувеличение. Зубной налёт у кошек превращается в камень уже через несколько недель, а дальше начинается воспаление дёсен, которое причиняет боль и мешает питомцу нормально есть.',
    ],
    list: [
      'Начинайте чистку с котёнка — так кошка быстрее привыкнет к процедуре.',
      'Используйте только ветеринарную зубную пасту — человеческая опасна для кошек.',
      'Специальный корм и лакомства для гигиены полости рта снижают образование налёта.',
      'Профессиональная чистка зубов под седацией нужна в среднем раз в 1–2 года.',
    ],
    tail: 'Если кошка стала хуже есть, трогать мордочку или у неё появился неприятный запах изо рта — это повод показать её стоматологу как можно скорее.',
  },
  ticks: {
    tag: 'Профилактика',
    title: 'Как защитить питомца от клещей',
    date: '30 мая 2026',
    read: '5 мин чтения',
    body: [
      'Клещи активны с ранней весны до поздней осени и переносят опасные для жизни заболевания. Комплексная защита — единственный надёжный способ уберечь питомца от беды.',
    ],
    list: [
      'Используйте капли, ошейник или таблетки от клещей — по рекомендации врача и без пропусков.',
      'Осматривайте шерсть после каждой прогулки в парках, лесу и высокой траве.',
      'Если клещ присосался — не выкручивайте его сами, аккуратно доставьте питомца в клинику.',
      'При вялости, отказе от еды или температуре в течение 1–3 недель после укуса — срочно к врачу.',
    ],
    tail: 'Наша лаборатория делает экспресс-тесты на пироплазмоз и другие клещевые инфекции за 30 минут — это критично важно в первые часы после укуса.',
  },
  vaccination: {
    tag: 'Вакцинация',
    title: 'График прививок для щенков и котят',
    date: '14 мая 2026',
    read: '4 мин чтения',
    body: [
      'Своевременная вакцинация — основа здоровья питомца на всю жизнь. Первые прививки формируют иммунитет, который материнские антитела уже не обеспечивают.',
    ],
    list: [
      'Первая вакцинация — в 8–9 недель, ревакцинация — через 3–4 недели.',
      'Прививка от бешенства ставится не ранее 12 недель.',
      'Ежегодная ревакцинация поддерживает иммунитет на протяжении всей жизни.',
      'За 10 дней до прививки обязательно проводится дегельминтизация.',
    ],
    tail: 'Наши врачи подберут индивидуальный график с учётом породы, образа жизни и региона — запишитесь на консультацию заранее.',
  },
  nutrition: {
    tag: 'Питание',
    title: 'Как выбрать корм для питомца с чувствительным пищеварением',
    date: '2 мая 2026',
    read: '5 мин чтения',
    body: [
      'Расстройства пищеварения — одна из частых причин обращений к терапевту. Правильно подобранный рацион способен решить проблему без медикаментов.',
    ],
    list: [
      'Переходите на новый корм постепенно, в течение 7–10 дней.',
      'При хронических проблемах выбирайте лечебные линейки по рекомендации врача.',
      'Следите за реакцией: стул, шерсть, активность питомца — лучший индикатор.',
      'Не смешивайте более двух видов корма одновременно — это усложняет диагностику.',
    ],
    tail: 'Если проблема не уходит за 2 недели — запишитесь на консультацию к нашему терапевту для полной диагностики ЖКТ.',
  },
  cardio: {
    tag: 'Кардиология',
    title: 'Признаки болезней сердца у собак старшего возраста',
    date: '20 апреля 2026',
    read: '6 мин чтения',
    body: [
      'После 7 лет риск сердечно-сосудистых заболеваний у собак заметно растёт, особенно у мелких пород. Важно вовремя распознать тревожные симптомы.',
    ],
    list: [
      'Быстрая утомляемость даже при привычных нагрузках.',
      'Кашель, особенно ночью или после отдыха.',
      'Одышка в спокойном состоянии.',
      'Обмороки или эпизоды слабости задних лап.',
    ],
    tail: 'Ежегодная кардиологическая диагностика после 7 лет — простой способ выявить проблему на ранней стадии, когда лечение наиболее эффективно.',
  },
};

function initBlogModal() {
  var overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  var box = overlay.querySelector('.modal-box');

  document.querySelectorAll('[data-article]').forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-article');
      var a = ARTICLES[key];
      if (!a) return;

      var listHtml = a.list ? '<ul>' + a.list.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' : '';

      box.innerHTML =
        '<button class="modal-close" aria-label="Закрыть"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>' +
        '<span class="blog-tag">' + a.tag + '</span>' +
        '<h2>' + a.title + '</h2>' +
        '<div class="modal-meta">' + a.date + ' · ' + a.read + '</div>' +
        a.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
        listHtml +
        (a.tail ? '<p>' + a.tail + '</p>' : '');

      overlay.classList.add('is-open');
      box.querySelector('.modal-close').addEventListener('click', closeModal);
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    overlay.classList.remove('is-open');
  }
}

/* ---------------- contact form ---------------- */

function initContactForm() {
  var form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    form.reset();
  });
}

/* =========================================================
   BOOKING WIZARD
   ========================================================= */

function initBookingWizard() {
  var wizard = document.querySelector('.booking-wrap');
  if (!wizard) return;

  var state = {
    step: 1,
    service: null,
    serviceLabel: null,
    doctor: null,
    doctorLabel: null,
    date: null,
    time: null,
    calMonth: new Date().getMonth(),
    calYear: new Date().getFullYear(),
  };

  var stepItems = document.querySelectorAll('.step-item');
  var stepPanels = document.querySelectorAll('.booking-step');
  var successPanel = document.querySelector('.booking-success');
  var panelWrap = document.querySelector('.booking-panel');

  var doctorCards = document.querySelectorAll('.doctor-pick[data-doctor]');
  var doctorNotice = document.querySelector('.doctor-pick-notice');

  /* filter doctors on step 2 to match the specialty of the chosen service */
  function filterDoctorsByService() {
    if (!doctorCards.length) return;

    var matching = [];
    doctorCards.forEach(function (c) {
      if (c.getAttribute('data-specialty') === state.service) matching.push(c);
    });

    var showAll = matching.length === 0;

    doctorCards.forEach(function (c) {
      c.style.display = (showAll || matching.indexOf(c) !== -1) ? '' : 'none';
    });

    if (doctorNotice) {
      if (showAll) {
        doctorNotice.textContent = 'Для выбранной услуги нет закреплённого специалиста — администратор подберёт врача из команды клиники после подтверждения записи.';
        doctorNotice.style.display = '';
      } else {
        doctorNotice.style.display = 'none';
      }
    }

    /* drop a previously selected doctor if it's no longer visible */
    if (state.doctor) {
      var selectedCard = document.querySelector('.doctor-pick[data-doctor="' + state.doctor + '"]');
      if (selectedCard && selectedCard.style.display === 'none') {
        selectedCard.classList.remove('is-selected');
        state.doctor = null;
        state.doctorLabel = null;
        document.querySelector('#to-step-3').disabled = true;
        updateSummary();
      }
    }
  }

  /* service selection */
  document.querySelectorAll('.pick-card[data-service]').forEach(function (card) {
    card.addEventListener('click', function () {
      document.querySelectorAll('.pick-card[data-service]').forEach(function (c) { c.classList.remove('is-selected'); });
      card.classList.add('is-selected');
      state.service = card.getAttribute('data-service');
      state.serviceLabel = card.querySelector('.pick-title').textContent;
      updateSummary();
      document.querySelector('#to-step-2').disabled = false;
      filterDoctorsByService();
    });
  });

  /* doctor selection */
  doctorCards.forEach(function (card) {
    card.addEventListener('click', function () {
      doctorCards.forEach(function (c) { c.classList.remove('is-selected'); });
      card.classList.add('is-selected');
      state.doctor = card.getAttribute('data-doctor');
      state.doctorLabel = card.querySelector('.pick-title').textContent;
      updateSummary();
      document.querySelector('#to-step-3').disabled = false;
    });
  });

  /* nav buttons */
  document.querySelectorAll('[data-goto]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToStep(parseInt(btn.getAttribute('data-goto'), 10));
    });
  });

  function goToStep(n) {
    state.step = n;
    stepItems.forEach(function (item) {
      var idx = parseInt(item.getAttribute('data-step'), 10);
      item.classList.toggle('is-active', idx === n);
      item.classList.toggle('is-done', idx < n);
    });
    stepPanels.forEach(function (panel) {
      panel.classList.toggle('is-active', parseInt(panel.getAttribute('data-step'), 10) === n);
    });
    if (panelWrap) panelWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* calendar */
  var calBody = document.querySelector('.cal-days');
  var calHead = document.querySelector('.calendar-head h4');
  var timeGrid = document.querySelector('.time-grid');

  var monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  var weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  function renderCalendar() {
    if (!calBody) return;
    calBody.innerHTML = '';
    calHead.textContent = monthNames[state.calMonth] + ' ' + state.calYear;

    var firstDay = new Date(state.calYear, state.calMonth, 1);
    var startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
    var daysInMonth = new Date(state.calYear, state.calMonth + 1, 0).getDate();
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    for (var i = 0; i < startOffset; i++) {
      var empty = document.createElement('div');
      empty.className = 'cal-day is-empty';
      calBody.appendChild(empty);
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var dateObj = new Date(state.calYear, state.calMonth, d);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      btn.textContent = d;

      if (dateObj < today) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', function (dObj, dNum) {
          return function () {
            document.querySelectorAll('.cal-day').forEach(function (c) { c.classList.remove('is-selected'); });
            this.classList.add('is-selected');
            state.date = dObj;
            state.dateLabel = dNum + ' ' + monthNames[dObj.getMonth()];
            renderTimeSlots();
            updateSummary();
          };
        }(dateObj, d));
      }

      if (dateObj.getTime() === today.getTime()) btn.classList.add('is-today');
      if (state.date && dateObj.getTime() === state.date.getTime()) btn.classList.add('is-selected');

      calBody.appendChild(btn);
    }
  }

  function renderTimeSlots() {
    if (!timeGrid) return;
    timeGrid.innerHTML = '';
    var times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    var seed = state.date ? (state.date.getDate() * 31 + state.date.getMonth() * 7) : 0;
    state.time = null;

    times.forEach(function (t, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-slot';
      btn.textContent = t;
      var busy = (seed + idx * 13) % 5 === 0;
      if (busy) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.time-slot').forEach(function (c) { c.classList.remove('is-selected'); });
          btn.classList.add('is-selected');
          state.time = t;
          updateSummary();
          document.querySelector('#to-step-4').disabled = false;
        });
      }
      timeGrid.appendChild(btn);
    });
  }

  var prevBtn = document.querySelector('.cal-prev');
  var nextBtn = document.querySelector('.cal-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      state.calMonth--;
      if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
      renderCalendar();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      state.calMonth++;
      if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
      renderCalendar();
    });
  }

  renderCalendar();
  renderTimeSlots();

  /* summary sidebar */
  function updateSummary() {
    var box = document.querySelector('#summary-content');
    if (!box) return;
    var rows = [];

    rows.push(rowHtml('service', state.serviceLabel, 'Услуга'));
    rows.push(rowHtml('doctor', state.doctorLabel, 'Врач'));
    var dateVal = state.date ? (state.dateLabel + (state.time ? ', ' + state.time : '')) : null;
    rows.push(rowHtml('date', dateVal, 'Дата и время'));

    box.innerHTML = rows.join('');

    function rowHtml(icon, value, label) {
      var icons = {
        service: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M4 8h16M5 8v11a2 2 0 002 2h10a2 2 0 002-2V8H5z"/>',
        doctor: '<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z"/>',
        date: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
      };
      return '<div class="summary-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + icons[icon] + '</svg>' +
        '<div><span class="s-label">' + label + '</span><span class="' + (value ? 's-value' : 'summary-empty') + '">' + (value || 'Не выбрано') + '</span></div></div>';
    }
  }

  updateSummary();

  /* preselect from query string, e.g. booking.html?service=surgery */
  var params = new URLSearchParams(window.location.search);
  var qService = params.get('service');
  if (qService) {
    var target = document.querySelector('.pick-card[data-service="' + qService + '"]');
    if (target) target.click();
  }

  /* final submit */
  var finalForm = document.querySelector('#booking-form');
  if (finalForm) {
    finalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      stepPanels.forEach(function (p) { p.classList.remove('is-active'); });
      document.querySelector('.steps-nav').style.display = 'none';
      if (successPanel) successPanel.classList.add('is-active');
      if (panelWrap) panelWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
