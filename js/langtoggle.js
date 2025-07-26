(function(){
  const langBtn = document.getElementById('btn-lang');
  if(!langBtn) return;
  let lang = 'en';

  function updateTexts(){
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'){
        el.placeholder = text || '';
      } else {
        const strong = el.querySelector('strong');
        if(strong){
          strong.remove();
          el.textContent = (text || '') + ' ';
          el.appendChild(strong);
        } else {
          el.textContent = text || '';
        }
      }
    });
    const titleEl = document.querySelector('title');
    if(titleEl){
      document.title = lang === 'en' ? titleEl.getAttribute('data-en') : titleEl.getAttribute('data-es');
    }
    langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  }

  langBtn.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    updateTexts();
  });

  updateTexts();
})();
