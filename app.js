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
  const isEn = document.documentElement.lang === 'en';
  document.documentElement.lang = isEn ? 'es' : 'en';
  langCtrl.textContent = isEn ? 'ES' : 'EN';
  transNodes.forEach(n => n.textContent = isEn ? n.dataset.es : n.dataset.en);
  phNodes.forEach(n => n.placeholder = isEn ? n.dataset.esPh : n.dataset.enPh);
  humanLab.textContent = isEn ? humanLab.dataset.es : humanLab.dataset.en;
});

themeCtrl.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  document.body.classList.toggle('dark');
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
