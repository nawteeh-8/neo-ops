// Shared language and theme toggles for service pages
// Runs only if elements with IDs 'btn-lang' and 'btn-theme' are present

document.addEventListener('DOMContentLoaded', () => {
  const btnLang = document.getElementById('btn-lang');
  const btnTheme = document.getElementById('btn-theme');
  if (!btnLang || !btnTheme) return;

  const html = document.documentElement;
  const body = document.body;

  let currentLang = 'en';
  let isDark = true;

  function setLanguage(lang) {
    currentLang = lang;
    html.lang = lang;
    const titleTag = document.querySelector('title');
    if (titleTag) {
      const newTitle = titleTag.getAttribute('data-' + lang);
      if (newTitle) document.title = newTitle;
    }
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (!text) return;
      const tag = el.tagName.toLowerCase();
      if (tag === 'input') {
        el.placeholder = text;
      } else if (tag === 'img') {
        el.alt = text;
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll('nav a').forEach(a => {
      const text = a.getAttribute('data-' + lang);
      if (text) a.textContent = text;
    });
    btnLang.textContent = lang.toUpperCase();
    btnLang.setAttribute('aria-pressed', lang === 'es');
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'en' ? 'es' : 'en');
  }

  function setTheme(darkMode) {
    isDark = darkMode;
    if (darkMode) {
      body.classList.remove('light');
      btnTheme.textContent = 'Dark Mode';
      btnTheme.setAttribute('aria-pressed', 'false');
    } else {
      body.classList.add('light');
      btnTheme.textContent = 'Light Mode';
      btnTheme.setAttribute('aria-pressed', 'true');
    }
  }

  function toggleTheme() {
    setTheme(!isDark);
  }

  btnLang.addEventListener('click', toggleLanguage);
  btnTheme.addEventListener('click', toggleTheme);

  setLanguage(currentLang);
  setTheme(isDark);
});
