(function(){
  'use strict';
  function apply(theme){
    document.body.classList.toggle('dark', theme === 'dark');
    const label = theme === 'dark' ? 'Light' : 'Dark';
    ['themeToggle','theme-toggle','mobile-theme-toggle','themeCtrl'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.textContent = label;
    });
  }
  window.applyTheme = apply;
  window.toggleTheme = function(){
    const current = localStorage.getItem('ops-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ops-theme', next);
    apply(next);
    return next;
  };
  const saved = localStorage.getItem('ops-theme') || 'light';
  apply(saved);
})();
