'use strict';
// Sanitize utility
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

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
