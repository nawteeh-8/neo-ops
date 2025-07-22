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

window.addEventListener('message', event => {
  if (event.data.type === 'langChange') {
    const isEn = event.data.lang === 'en';
    document.documentElement.lang = isEn ? 'en' : 'es';
    langCtrl.textContent = isEn ? 'EN' : 'ES';
    transNodes.forEach(n => n.textContent = isEn ? n.dataset.en : n.dataset.es);
    phNodes.forEach(n => n.placeholder = isEn ? n.dataset.enPh : n.dataset.esPh);
    humanLab.textContent = isEn ? humanLab.dataset.en : humanLab.dataset.es;
  } else if (event.data.type === 'themeChange') {
    const isDark = event.data.theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    themeCtrl.textContent = isDark ? 'Dark' : 'Light';
  }
});

// Close handler with fallback
closeCtrl.addEventListener('click', () => {
  if (history.length > 1) history.back();
  else window.location.href = '/';
});
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeCtrl.click(); });

/* === Dragging, Resizing, Positioning === */
const chatbot = qs('#chatbot-container');
const header  = qs('#chatbot-header');
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

function drag(e) {
  e.preventDefault();
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDrag;
  document.onmousemove =- elementDrag;
}

function elementDrag(e) {
  e.preventDefault();
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  chatbot.style.top = `${chatbot.offsetTop - pos2}px`;
  chatbot.style.left = `${chatbot.offsetLeft - pos1}px`;
}

function closeDrag() {
  document.onmouseup = null;
  document.onmousemove = null;
}

header.addEventListener('mousedown', drag);

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
