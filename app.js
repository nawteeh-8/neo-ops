'use strict';

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

langCtrl.addEventListener('click', () => {
  const toES = langCtrl.textContent === 'ES';
  document.documentElement.lang = toES ? 'es' : 'en';
  langCtrl.textContent = toES ? 'EN' : 'ES';
  transNodes.forEach(n => n.textContent = toES ? n.dataset.es : n.dataset.en);
  phNodes.forEach(n => n.placeholder = toES ? n.dataset.esPh : n.dataset.enPh);
  humanLab.textContent = toES ? humanLab.dataset.es : humanLab.dataset.en;
});

themeCtrl.addEventListener('click', () => {
  const isDark = themeCtrl.textContent === 'Dark';
  document.body.classList.toggle('dark', isDark);
  themeCtrl.textContent = isDark ? 'Light' : 'Dark';
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
    const response = await fetch('https://your-cloudflare-worker.example.com/chat', {
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
