// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

function showNotification(message, type = 'success') {
  const notif = document.getElementById('notification');
  if (!notif) return;

  notif.textContent = message;
  notif.className   = type;
  notif.style.display = 'block';

  clearTimeout(notif._timer);
  notif._timer = setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notif.style.display = 'none';
      notif.style.opacity  = '';
      notif.style.transform = '';
    }, 300);
  }, 3000);
}

// ─── COUNTER ANIMATION ───────────────────────────────────────────────────────

function animateCounter(el, end, duration = 2000, suffix = '') {
  const start = 0;
  const startTime = performance.now();
  const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value    = Math.floor(ease(progress) * (end - start) + start);
    el.textContent = value.toLocaleString('ru-RU') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target._counted) {
        entry.target._counted = true;
        const end      = parseInt(entry.target.dataset.counter);
        const duration = parseInt(entry.target.dataset.duration) || 2000;
        const suffix   = entry.target.dataset.suffix || '';
        animateCounter(entry.target, end, duration, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ─── SCROLL FADE-IN ───────────────────────────────────────────────────────────

function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ─── JOIN BUTTON (popup) ──────────────────────────────────────────────────────

function initJoinBtn() {
  const btn = document.getElementById('joinBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    openModal('joinModal');
  });
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.closest('.modal').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ─── AUTO INIT ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initFadeIn();
  initJoinBtn();
});