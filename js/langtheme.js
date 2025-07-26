// Language & Theme toggle logic for service pages
// Reads state from DOM and updates elements with data-en/data-es
// Activates only when #btn-lang and #btn-theme are present

(function() {
  const langBtn = document.getElementById('btn-lang');
  const themeBtn = document.getElementById('btn-theme');
  if (!langBtn || !themeBtn) return; // Only run on pages with toggle buttons

  let lang = document.documentElement.lang || 'en';
  let theme = document.body.classList.contains('light') ? 'light' : 'dark';

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en],[data-es]').forEach(el => {
      const en = el.getAttribute('data-en');
      const es = el.getAttribute('data-es');
      const text = lang === 'en' ? en : es;
      if (text == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'TITLE') {
        document.title = text;
      } else {
        el.textContent = text;
      }
    });
  }

  function applyTheme() {
    document.body.classList.toggle('light', theme === 'light');
  }

  langBtn.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    applyLang();
  });

  themeBtn.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    themeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    applyTheme();
  });

  // Initial application
  langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  themeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
  applyLang();
  applyTheme();
})();
