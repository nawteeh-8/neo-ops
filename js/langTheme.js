(function(){
  const storedLang = localStorage.getItem('ops-lang') || 'en';
  function setLanguage(lang){
    document.documentElement.lang = lang;
    const titleTag = document.querySelector('title');
    if(titleTag){
      const newTitle = titleTag.getAttribute('data-' + lang);
      if(newTitle) document.title = newTitle;
    }
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if(!text) return;
      const tag = el.tagName.toLowerCase();
      if(tag === 'input'){
        el.placeholder = text;
      } else if(tag === 'img'){
        el.alt = text;
      } else {
        el.textContent = text;
      }
    });
    localStorage.setItem('ops-lang', lang);
  }
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(storedLang);
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');
    if(btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    if(btnEs) btnEs.addEventListener('click', () => setLanguage('es'));
  });
})();
