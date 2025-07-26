// Language & theme toggle logic for service pages
// Default state: dark theme, English language

(function(){
  const langBtn = document.getElementById('btn-lang');
  const themeBtn = document.getElementById('btn-theme');
  if(!langBtn || !themeBtn) return;
  let lang = 'en';
  let theme = document.body.classList.contains('light') ? 'light' : 'dark';

  function updateTexts() {
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text || '';
      } else {
        el.textContent = text || '';
      }
    });
    document.title = lang === 'en' ? document.title = document.querySelector('title').getAttribute('data-en') : document.querySelector('title').getAttribute('data-es');
  }

  function setLang(l){
    lang = l;
    updateTexts();
    langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  }

  function setTheme(t){
    theme = t;
    document.body.classList.toggle('light', theme === 'light');
    themeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
  }

  langBtn.addEventListener('click', () => setLang(lang === 'en' ? 'es' : 'en'));
  themeBtn.addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));

  // initialize
  setLang(lang);
  setTheme(theme);
})();
