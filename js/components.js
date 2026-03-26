// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

const HEADER_HTML = `
<header class="header" id="mainHeader">
  <a href="index.html" class="logo">FitLife<span>Pro</span></a>

  <nav id="nav">
    <a href="index.html" data-page="index">Главная</a>
    <a href="services.html" data-page="services">Услуги</a>
    <a href="trainers.html" data-page="trainers">Тренеры</a>
    <a href="pricing.html" data-page="pricing">Цены</a>
    <a href="about.html" data-page="about">О нас</a>
    <a href="contact.html" class="header-cta" data-page="contact">Записаться</a>
  </nav>

  <div id="burger" aria-label="Меню">
    <span></span><span></span><span></span>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-grid">
    <div>
      <span class="footer-logo">FitLife<span>Pro</span></span>
      <p class="footer-desc">Премиальный фитнес-центр для тех, кто ценит результат. Профессиональные тренеры, современное оборудование и атмосфера победы.</p>
      <div class="footer-socials">
        <a href="#" title="Instagram">📸</a>
        <a href="#" title="Telegram">✈️</a>
        <a href="#" title="VK">💙</a>
        <a href="#" title="YouTube">▶️</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Навигация</h4>
      <ul>
        <li><a href="index.html">Главная</a></li>
        <li><a href="services.html">Услуги</a></li>
        <li><a href="trainers.html">Тренеры</a></li>
        <li><a href="pricing.html">Цены</a></li>
        <li><a href="about.html">О нас</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Услуги</h4>
      <ul>
        <li><a href="services.html">Тренажёрный зал</a></li>
        <li><a href="services.html">Йога</a></li>
        <li><a href="services.html">Персональные тренировки</a></li>
        <li><a href="services.html">Кардио зона</a></li>
        <li><a href="services.html">Бассейн</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Контакты</h4>
      <ul>
        <li><a href="#">📍 Площадь Свободы 13</a></li>
        <li><a href="tel:+3735 3 123 45 55">📞 +375 33 123 45 55</a></li>
        <li><a href="mailto:info@fitlifepro.ru">✉️ info@fitlifepro.ru</a></li>
        <li><a href="#">⏰ Пн–Вс: 6:00–23:00</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 FitLife Pro. Все права защищены.</span>
    <span>Разработано с ❤️ для чемпионов</span>
  </div>
</footer>
<div id="notification"></div>`;

// ─── INIT ─────────────────────────────────────────────────────────────────────

function initComponents() {
  // Inject header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = HEADER_HTML;
  }

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML;
  }

  initHeader();
}

function initHeader() {
  const header = document.getElementById('mainHeader');
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');

  // Scroll effect
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Burger
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('active');
  });

  // Close nav on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('active');
      burger.classList.remove('open');
    });
  });

  // Active page highlight
  const page = document.body.dataset.page;
  nav.querySelectorAll('[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}

// Run when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}