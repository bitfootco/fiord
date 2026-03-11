(function () {
  function closeAll() {
    document.querySelectorAll('[data-fiord-popover-content]:not(.hidden)').forEach((panel) => {
      panel.classList.add('hidden');
      const id = panel.id;
      const trigger = document.querySelector('[data-fiord-popover-trigger="' + id + '"]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('[data-fiord-popover-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = trigger.getAttribute('data-fiord-popover-trigger');
      const panel = document.getElementById(id);
      if (!panel) return;

      const isOpen = !panel.classList.contains('hidden');

      // Close any other open popovers
      closeAll();

      if (!isOpen) {
        panel.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        // Focus first interactive element in panel
        const focusable = panel.querySelector('input, button, [href], select, textarea');
        if (focusable) focusable.focus();
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', () => {
    closeAll();
  });

  // Prevent closing when clicking inside panel
  document.querySelectorAll('[data-fiord-popover-content]').forEach((panel) => {
    panel.addEventListener('click', (e) => e.stopPropagation());
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();
