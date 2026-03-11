(function () {
  function openDrawer(drawer) {
    const panel = drawer.querySelector('[data-fiord-panel]');
    drawer.classList.remove('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Allow paint before animating
    requestAnimationFrame(() => {
      if (panel) {
        panel.classList.remove('translate-x-full');
        panel.classList.add('translate-x-0');
      }
    });
    const focusable = panel
      ? panel.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      : null;
    if (focusable) focusable.focus();
  }

  function closeDrawer(drawer) {
    const panel = drawer.querySelector('[data-fiord-panel]');
    if (panel) {
      panel.classList.add('translate-x-full');
      panel.classList.remove('translate-x-0');
    }
    // Wait for transition before hiding
    setTimeout(() => {
      drawer.classList.add('hidden');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }, 300);
  }

  // Open triggers
  document.querySelectorAll('[data-fiord-drawer-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-fiord-drawer-open');
      const drawer = document.getElementById(id);
      if (drawer) openDrawer(drawer);
    });
  });

  // Close buttons
  document.querySelectorAll('[data-fiord-drawer] [data-fiord-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('[data-fiord-drawer]');
      if (drawer) closeDrawer(drawer);
    });
  });

  // Backdrop click
  document.querySelectorAll('[data-fiord-drawer]').forEach((drawer) => {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer || e.target.hasAttribute('data-fiord-backdrop')) {
        closeDrawer(drawer);
      }
    });
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-fiord-drawer]:not(.hidden)').forEach((drawer) => {
        closeDrawer(drawer);
      });
    }
  });
})();
