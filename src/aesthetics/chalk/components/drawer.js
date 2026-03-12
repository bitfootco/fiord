    (function () {
      function openDrawer(drawer) {
        drawer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        var firstFocusable = drawer.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
      }

      function closeDrawer(drawer) {
        drawer.classList.add('hidden');
        document.body.style.overflow = '';
      }

      // Open triggers
      document.querySelectorAll('[data-fiord-drawer-open]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var targetId = trigger.getAttribute('data-fiord-drawer-open');
          var drawer = document.getElementById(targetId);
          if (drawer) openDrawer(drawer);
        });
      });

      // Close triggers and backdrop click
      document.querySelectorAll('[data-fiord-drawer]').forEach(function (drawer) {
        drawer.querySelectorAll('[data-fiord-close]').forEach(function (closer) {
          closer.addEventListener('click', function () {
            closeDrawer(drawer);
          });
        });
      });

      // Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          document.querySelectorAll('[data-fiord-drawer]:not(.hidden)').forEach(function (drawer) {
            closeDrawer(drawer);
          });
        }
      });
    })();
