// ELEMENTS
const form      = document.getElementById('chat-form');
const input     = document.getElementById('user-input');
const messages  = document.getElementById('messages');
const honeypot  = document.getElementById('honeypot');
const themeBtn  = document.getElementById('toggle-theme');
const langBtn   = document.getElementById('toggle-lang');
const speechBtn = document.getElementById('speech-btn');

// STATE
let currentLang = 'en';
let theme       = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);
themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
langBtn.textContent  = 'ES';

// SANITIZE
const sanitize = str => str.replace(/[<>]/g, '');

// RENDER
function addMessage(txt, who) {
  const el = document.createElement('div');
  el.className = who === 'user' ? 'user-msg' : 'bot-msg';
  el.textContent = txt;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  if (who === 'bot') speak(txt);
}

// FALLBACK
function simulateReply() {
  const options = [
    'That’s cool!',
    'Tell me more…',
    'Absolutely.',
    'Could you clarify?',
    'I’m listening.'
  ];
  setTimeout(() => {
    addMessage(options[Math.floor(Math.random()*options.length)], 'bot');
  }, 700);
}

// SUBMIT
form.addEventListener('submit', e => {
  e.preventDefault();
  if (honeypot.value) return;
  const txt = sanitize(input.value.trim());
  if (!txt) return;
  addMessage(txt, 'user');
  input.value = '';

  grecaptcha.ready(() => {
    grecaptcha.execute('YOUR_SITE_KEY', {action:'chat'}).then(token => {
      fetch('https://your-cloudflare-worker.example.com/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({message:txt, token})
      })
      .then(r=>r.json()).then(d=>addMessage(d.reply,'bot'))
      .catch(simulateReply);
    });
  });
});

// STT
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.onresult = e => {
    input.value = e.results[0][0].transcript;
    form.dispatchEvent(new Event('submit'));
  };
}
speechBtn.addEventListener('click', ()=> recognition && recognition.start());

// TTS
function speak(txt) {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = currentLang==='en'?'en-US':'es-ES';
    speechSynthesis.speak(u);
  }
}

// THEME TOGGLE
themeBtn.addEventListener('click', () => {
  theme = theme==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeBtn.textContent = theme==='dark'?'☀️':'🌙';
});

// LANGUAGE TOGGLE
langBtn.addEventListener('click', () => {
  currentLang = currentLang==='en'?'es':'en';
  langBtn.textContent = currentLang==='en'?'ES':'EN';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  if (recognition) {
    recognition.lang = currentLang==='en'?'en-US':'es-ES';
  }
});
