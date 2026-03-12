(function () {
  const triggers = document.querySelectorAll('[data-fiord-toggle]');

  triggers.forEach(function (trigger) {
    const targetId = trigger.dataset.fiordToggle;
    const menu = document.getElementById(targetId);
    if (!menu) return;

    // Toggle on click
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');

      // Close all open menus first
      document.querySelectorAll('[data-fiord-menu]').forEach(function (m) {
        m.classList.add('hidden');
      });
      document.querySelectorAll('[data-fiord-toggle]').forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        menu.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('[data-fiord-menu]').forEach(function (menu) {
      menu.classList.add('hidden');
    });
    document.querySelectorAll('[data-fiord-toggle]').forEach(function (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-fiord-menu]').forEach(function (menu) {
        menu.classList.add('hidden');
      });
      document.querySelectorAll('[data-fiord-toggle]').forEach(function (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
