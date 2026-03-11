    (function () {
      function openDrawer(drawer) {
        drawer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        var panel = drawer.querySelector('[data-fiord-drawer-panel]');
        requestAnimationFrame(function () {
          if (panel) panel.classList.remove('translate-x-full');
        });
      }

      function closeDrawer(drawer) {
        var panel = drawer.querySelector('[data-fiord-drawer-panel]');
        if (panel) panel.classList.add('translate-x-full');
        setTimeout(function () {
          drawer.classList.add('hidden');
          document.body.style.overflow = '';
        }, 300);
      }

      document.querySelectorAll('[data-fiord-drawer-open]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var targetId = trigger.getAttribute('data-fiord-drawer-open');
          var drawer = document.getElementById(targetId);
          if (drawer) openDrawer(drawer);
        });
      });

      document.querySelectorAll('[data-fiord-drawer]').forEach(function (drawer) {
        drawer.querySelectorAll('[data-fiord-drawer-close]').forEach(function (closer) {
          closer.addEventListener('click', function () {
            closeDrawer(drawer);
          });
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          document.querySelectorAll('[data-fiord-drawer]:not(.hidden)').forEach(function (drawer) {
            closeDrawer(drawer);
          });
        }
      });
    })();
