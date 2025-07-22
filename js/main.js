'use strict';
// Sanitize utility
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Toggle Language
document.getElementById('lang-toggle').addEventListener('click', () => {
  const toES = document.documentElement.lang !== 'es';
  document.documentElement.lang = toES ? 'es' : 'en';
  document.getElementById('lang-toggle').textContent = toES ? 'EN' : 'ES';
});

// Toggle Theme
document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  document.getElementById('theme-toggle').textContent = dark ? 'Light' : 'Dark';
});

// Modal handling
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-modal-target]');
  if (!btn) return;
  loadModal(btn.getAttribute('data-modal-target'));
});

async function loadModal(id) {
  try {
    const res = await fetch(`components/modals/${sanitize(id)}.html`);
    if (!res.ok) throw new Error('Modal not found');
    document.getElementById('modal-container').innerHTML = await res.text();
  } catch (err) {
    console.error('Modal load error:', err);
  }
}
