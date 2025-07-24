(function(){
  let lang = localStorage.getItem('ops-lang') || 'en';

  function applyLang() {
    document.documentElement.lang = lang;
    const titleTag = document.querySelector('title');
    if(titleTag && titleTag.getAttribute('data-' + lang)) {
      document.title = titleTag.getAttribute('data-' + lang);
    }
    document.querySelectorAll('[data-en]').forEach(function(el){
      const text = el.getAttribute('data-' + lang);
      if(!text) return;
      const tag = el.tagName.toLowerCase();
      if(tag === 'input') {
        el.placeholder = text;
      } else if(tag === 'img') {
        el.alt = text;
      } else {
        el.textContent = text;
      }
    });
  }

  function setLang(l){
    lang = l;
    applyLang();
    localStorage.setItem('ops-lang', l);
  }

  const enBtn = document.getElementById('btn-en');
  const esBtn = document.getElementById('btn-es');
  if(enBtn) enBtn.addEventListener('click', function(){ setLang('en'); });
  if(esBtn) esBtn.addEventListener('click', function(){ setLang('es'); });

  applyLang();
})();
