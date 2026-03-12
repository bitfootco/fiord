    (function () {
      document.querySelectorAll('[data-fiord-toggle]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var targetId = trigger.getAttribute('data-fiord-toggle');
          var menu = document.getElementById(targetId);
          if (!menu) return;
          var isOpen = !menu.classList.contains('hidden');
          // Close all other popovers first
          document.querySelectorAll('[data-fiord-menu]').forEach(function (m) {
            m.classList.add('hidden');
          });
          if (!isOpen) {
            menu.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
          } else {
            trigger.setAttribute('aria-expanded', 'false');
          }
        });
      });

      // Close on outside click
      document.addEventListener('click', function () {
        document.querySelectorAll('[data-fiord-menu]').forEach(function (menu) {
          menu.classList.add('hidden');
        });
        document.querySelectorAll('[data-fiord-toggle]').forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          document.querySelectorAll('[data-fiord-menu]').forEach(function (menu) {
            menu.classList.add('hidden');
          });
        }
      });
    })();
