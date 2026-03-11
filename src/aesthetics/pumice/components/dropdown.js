(function () {
  function initDropdowns() {
    document.querySelectorAll('[data-fiord-dropdown-trigger]').forEach(function (trigger) {
      var menuId = trigger.getAttribute('data-fiord-dropdown-trigger');
      var menu = document.getElementById(menuId);
      if (!menu) return;

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = !menu.classList.contains('hidden');
        // Close all other open menus
        document.querySelectorAll('[data-fiord-dropdown-menu]').forEach(function (m) {
          m.classList.add('hidden');
        });
        document.querySelectorAll('[data-fiord-dropdown-trigger]').forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          menu.classList.remove('hidden');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function () {
      document.querySelectorAll('[data-fiord-dropdown-menu]').forEach(function (m) {
        m.classList.add('hidden');
      });
      document.querySelectorAll('[data-fiord-dropdown-trigger]').forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('[data-fiord-dropdown-menu]').forEach(function (m) {
          m.classList.add('hidden');
        });
        document.querySelectorAll('[data-fiord-dropdown-trigger]').forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
})();
