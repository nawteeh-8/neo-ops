const qs=s=>document.querySelector(s),
      qsa=s=>[...document.querySelectorAll(s)];

/* === Language toggle === */
const langCtrl   = qs('#langCtrl');
const humanLab   = qs('#human-label');

/* === Transliteration & Theme Controls === */
const closeCtrl  = qs('#closeCtrl');
const themeCtrl  = qs('#themeCtrl');

let curLang = 'en';
let curTheme = 'light';
updateLanguage(curLang);
themeCtrl.textContent = 'Light';

window.addEventListener('message', event => {
  if (event.data.type === 'langChange') {
    curLang = event.data.lang;
    updateLanguage(curLang);
    langCtrl.textContent = curLang === 'en' ? 'EN' : 'ES';
  } else if (event.data.type === 'themeChange') {
    curTheme = event.data.theme;
    if ((curTheme === 'dark') !== document.body.classList.contains('dark')) {
      toggleTheme();
    }
  }
});

// Toggle controls and notify parent
langCtrl.addEventListener('click', () => {
  curLang = curLang === 'en' ? 'es' : 'en';
  window.parent.postMessage({ type: 'langChange', lang: curLang }, '*');
  const isEn = curLang === 'en';
  updateLanguage(curLang);
  langCtrl.textContent = isEn ? 'EN' : 'ES';
});

themeCtrl.addEventListener('click', () => {
  curTheme = curTheme === 'light' ? 'dark' : 'light';
  window.parent.postMessage({ type: 'themeChange', theme: curTheme }, '*');
  toggleTheme();
});

// Close handler with fallback
closeCtrl.addEventListener('click', () => {
  if (history.length > 1) history.back();
  else window.location.href = '/';
});
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeCtrl.click(); });

/* === Chatbot Core === */
const log          = qs('#chat-log');
const form         = qs('#chatbot-input-row');
const input        = qs('#chatbot-input');
const sendBtn      = qs('#chatbot-send');
const humanCheckbox = qs('#human-check');
guard.onchange = () => send.disabled = !guard.checked;

function addMsg(txt,cls){
  const div = document.createElement('div');
  div.className = 'chat-msg '+cls;
  div.textContent = txt;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

form.onsubmit = async e=>{
  e.preventDefault();
  if(!guard.checked) return;

  const msg = input.value.trim();
  if(!msg) return;
  addMsg(msg,'user');
  input.value=''; send.disabled=true;
  addMsg('…','bot');

  try{
    const r = await fetch('https://your-cloudflare-worker.example.com/chat',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg})
    });
    const d = await r.json();
    log.lastChild.textContent = d.reply || 'No reply.';
  }catch{
    log.lastChild.textContent = 'Error: Can’t reach AI.';
  }
  send.disabled=false;
};
