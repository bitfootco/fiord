(function () {
  function getFocusable(el) {
    return Array.from(
      el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((e) => !e.disabled);
  }

  function openModal(modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = getFocusable(modal);
    if (focusable.length) focusable[0].focus();
  }

  function closeModal(modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open triggers
  document.querySelectorAll('[data-fiord-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-fiord-modal-open');
      const modal = document.getElementById(id);
      if (modal) openModal(modal);
    });
  });

  // Close buttons
  document.querySelectorAll('[data-fiord-modal] [data-fiord-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('[data-fiord-modal]');
      if (modal) closeModal(modal);
    });
  });

  // Backdrop click
  document.querySelectorAll('[data-fiord-modal]').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.hasAttribute('data-fiord-backdrop')) {
        closeModal(modal);
      }
    });
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-fiord-modal]:not(.hidden)').forEach((modal) => {
        closeModal(modal);
      });
    }
  });
})();
