(function(){
  'use strict';
  window.updateLanguage = function(lang){
    document.documentElement.lang = lang;
    const title = document.querySelector('title[data-en]');
    if(title){
      document.title = title.getAttribute('data-'+lang) || document.title;
    }
    document.querySelectorAll('[data-en]').forEach(el=>{
      const val = el.getAttribute('data-'+lang);
      if(!val) return;
      const tag = el.tagName.toLowerCase();
      if(tag==='input' || tag==='textarea'){
        el.placeholder = val;
      } else if(tag==='img'){
        el.alt = val;
      } else if(tag==='option'){
        el.textContent = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-en-ph]').forEach(el=>{
      const val = el.getAttribute('data-'+lang+'-ph');
      if(val) el.placeholder = val;
    });
  };

  // theme toggling handled in theme.js
})();
