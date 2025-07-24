'use strict';

// Expected parent origin
const ALLOWED_ORIGIN = window.location.origin;

// Short selectors
const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);

/* === Transliteration & Theme Controls === */
const langCtrl   = qs('#langCtrl');
const transNodes = qsa('[data-en]');
const phNodes    = qsa('[data-en-ph]');
const humanLab   = qs('#human-label');
const closeCtrl  = qs('#closeCtrl');
const themeCtrl  = qs('#themeCtrl');

let curLang = 'en';
let curTheme = 'light';

window.addEventListener('message', event => {
  if (event.origin !== ALLOWED_ORIGIN) return;
  if (event.data.type === 'langChange') {
    curLang = event.data.lang;
    const isEn = curLang === 'en';
    document.documentElement.lang = isEn ? 'en' : 'es';
    langCtrl.textContent = isEn ? 'EN' : 'ES';
    transNodes.forEach(n => n.textContent = isEn ? n.dataset.en : n.dataset.es);
    phNodes.forEach(n => n.placeholder = isEn ? n.dataset.enPh : n.dataset.esPh);
    humanLab.textContent = isEn ? humanLab.dataset.en : humanLab.dataset.es;
  } else if (event.data.type === 'themeChange') {
    curTheme = event.data.theme;
    const isDark = curTheme === 'dark';
    document.body.classList.toggle('dark', isDark);
    themeCtrl.textContent = isDark ? 'Dark' : 'Light';
  }
});

// Toggle controls and notify parent
langCtrl.addEventListener('click', () => {
  curLang = curLang === 'en' ? 'es' : 'en';
  window.parent.postMessage({ type: 'langChange', lang: curLang }, ALLOWED_ORIGIN);
  const isEn = curLang === 'en';
  document.documentElement.lang = isEn ? 'en' : 'es';
  langCtrl.textContent = isEn ? 'EN' : 'ES';
  transNodes.forEach(n => n.textContent = isEn ? n.dataset.en : n.dataset.es);
  phNodes.forEach(n => n.placeholder = isEn ? n.dataset.enPh : n.dataset.esPh);
  humanLab.textContent = isEn ? humanLab.dataset.en : humanLab.dataset.es;
});

themeCtrl.addEventListener('click', () => {
  curTheme = curTheme === 'light' ? 'dark' : 'light';
  window.parent.postMessage({ type: 'themeChange', theme: curTheme }, ALLOWED_ORIGIN);
  const isDark = curTheme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeCtrl.textContent = isDark ? 'Dark' : 'Light';
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

// Enable send when human verified
humanCheckbox.addEventListener('change', () => {
  sendBtn.disabled = !humanCheckbox.checked;
});

// Sanitize and escape text
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function addMsg(text, cls) {
  const div = document.createElement('div');
  div.className = `chat-msg ${cls}`;
  div.innerHTML = sanitize(text);
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

// [end user interaction and AI]
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!humanCheckbox.checked) return;
  const msg = input.value.trim();
  if (!msg) return;

  addMsg(msg, 'user');
  input.value = '';
  sendBtn.disabled = true;
  addMsg('…', 'bot');

  try {
    // Replace with your actual Cloudflare worker URL
    const response = await fetch('worker.js', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: msg })
    });
    if (!response.ok) throw new Error(`Server error ${response.status}`);
    const data = await response.json();
    log.lastChild.textContent = data.reply || 'No reply.';
  } catch (err) {
    log.lastChild.textContent = `Error: ${sanitize(err.message)}`;
  } finally {
    sendBtn.disabled = false;
  }
});
// [end user interaction and AI]
