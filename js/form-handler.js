document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.service-form');

  forms.forEach(form => {
    const messageDiv = form.nextElementSibling;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      const data = {};
      form.querySelectorAll('input[required]').forEach(inp => {
        inp.classList.remove('error');
        if (!inp.value.trim()) {
          inp.classList.add('error');
          valid = false;
        } else {
          const key = inp.getAttribute('name') || inp.getAttribute('data-en') || inp.placeholder;
          data[key] = inp.value.trim();
        }
      });
      if (!valid) {
        showMessage(messageDiv, 'Please complete all required fields.', false);
        return;
      }
      try {
        const res = await fetch('https://example.com/api/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          showMessage(messageDiv, 'Thank you! Your request has been received.', true);
          form.reset();
        } else {
          showMessage(messageDiv, 'Submission failed. Please try again later.', false);
        }
      } catch (err) {
        showMessage(messageDiv, 'Unable to submit form. Please try again later.', false);
      }
    });
  });

  function showMessage(container, msg, success) {
    if (!container) return;
    container.textContent = msg;
    container.classList.remove('error', 'success');
    container.classList.add(success ? 'success' : 'error');
  }
});
