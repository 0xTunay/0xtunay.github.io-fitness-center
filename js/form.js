// ─── FORM HANDLING ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initJoinForm();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const data = getFormData(form);
    saveToStorage('contacts', data);

    showNotification('✅ Ваше сообщение отправлено! Свяжемся в течение часа.');
    form.reset();
    clearErrors(form);
  });

  // Real-time validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearFieldError(field));
  });
}

function initJoinForm() {
  const form = document.getElementById('joinForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const data = getFormData(form);
    saveToStorage('members', data);

    showNotification('🎉 Заявка принята! Ожидайте звонка.');
    form.reset();
    clearErrors(form);
    closeModal('joinModal');
  });
}

// ─── VALIDATION ───────────────────────────────────────────────────────────────

const VALIDATORS = {
  required: (val) => val.trim() !== '' || 'Это поле обязательно',
  email:    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Введите корректный email',
  phone:    (val) => val === '' || /^[\d\s\+\-\(\)]{7,}$/.test(val) || 'Введите корректный телефон',
  minlen:   (val, n) => val.length >= n || `Минимум ${n} символов`,
};

function validateField(field) {
  const rules = (field.dataset.validate || '').split(',').filter(Boolean);
  for (const rule of rules) {
    const [name, param] = rule.trim().split(':');
    const fn = VALIDATORS[name];
    if (!fn) continue;
    const result = fn(field.value, param ? parseInt(param) : undefined);
    if (result !== true) {
      showFieldError(field, result);
      return false;
    }
  }
  clearFieldError(field);
  return true;
}

function validateForm(form) {
  const fields = form.querySelectorAll('[data-validate]');
  let valid = true;
  fields.forEach(f => { if (!validateField(f)) valid = false; });
  return valid;
}

function showFieldError(field, msg) {
  clearFieldError(field);
  field.style.borderColor = 'var(--accent)';
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  err.style.cssText = 'display:block;color:var(--accent);font-size:11px;margin-top:4px;font-weight:600;';
  field.parentNode.appendChild(err);
}

function clearFieldError(field) {
  field.style.borderColor = '';
  const err = field.parentNode.querySelector('.field-error');
  if (err) err.remove();
}

function clearErrors(form) {
  form.querySelectorAll('.field-error').forEach(e => e.remove());
  form.querySelectorAll('input, textarea, select').forEach(f => f.style.borderColor = '');
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

function getFormData(form) {
  const data = { timestamp: new Date().toISOString() };
  new FormData(form).forEach((val, key) => data[key] = val);
  return data;
}

function saveToStorage(key, data) {
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {
    console.warn('Storage error:', e);
  }
}