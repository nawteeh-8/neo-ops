// ELEMENTS
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messagesDiv = document.getElementById('messages');
const honeypot = document.getElementById('honeypot');
const themeBtn = document.getElementById('toggle-theme');
const langBtn = document.getElementById('toggle-lang');
const speechBtn = document.getElementById('speech-btn');

// STATE
let currentLang = 'en';
let theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);
themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
langBtn.textContent = 'ES';

// SANITIZER
function sanitize(str) {
  return str.replace(/[<>]/g, '');
}

// MESSAGE RENDERER
function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'user-msg' : 'bot-msg';
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  if (sender === 'bot') speak(text);
}

// SIMULATED FALLBACK
function simulateReply(userText) {
  const canned = [
    'Interesting!',
    'Tell me more…',
    'I see. Go on.',
    'How does that make you feel?',
    'Can you clarify?'
  ];
  setTimeout(() => {
    const reply = canned[Math.floor(Math.random() * canned.length)];
    addMessage(reply, 'bot');
  }, 800);
}

// FORM SUBMISSION
form.addEventListener('submit', e => {
  e.preventDefault();
  if (honeypot.value) return; // bot detected
  const text = sanitize(input.value.trim());
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';

  // ReCAPTCHA v3 verification + Cloudflare Worker stub
  grecaptcha.ready(() => {
    grecaptcha.execute('YOUR_SITE_KEY', {action: 'chat'}).then(token => {
      fetch('https://your-cloudflare-worker.example.com/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: text, token})
      })
      .then(r => r.json())
      .then(data => addMessage(data.reply, 'bot'))
      .catch(() => simulateReply(text));
    });
  });
});

// SPEECH-TO-TEXT
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.onresult = e => {
    input.value = e.results[0][0].transcript;
    form.dispatchEvent(new Event('submit'));
  };
}
speechBtn.addEventListener('click', () => {
  if (recognition) recognition.start();
});

// TEXT-TO-SPEECH
function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = currentLang === 'en' ? 'en-US' : 'es-ES';
    speechSynthesis.speak(utter);
  }
}

// THEME TOGGLE
themeBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// LANGUAGE TOGGLE
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  langBtn.textContent = currentLang === 'en' ? 'ES' : 'EN';
  // update placeholders/buttons
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  if (recognition) {
    recognition.lang = currentLang === 'en' ? 'en-US' : 'es-ES';
  }
});
