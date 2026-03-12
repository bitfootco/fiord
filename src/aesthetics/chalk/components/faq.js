    (function () {
      document.querySelectorAll('[data-fiord-faq-trigger]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var panelId = trigger.getAttribute('data-fiord-faq-trigger');
          var panel = document.getElementById('faq-panel-' + panelId.replace('faq-', ''));
          if (!panel) return;

          var isOpen = !panel.classList.contains('hidden');
          var icon = trigger.querySelector('[data-faq-icon]');

          if (isOpen) {
            panel.classList.add('hidden');
            trigger.setAttribute('aria-expanded', 'false');
            if (icon) icon.classList.remove('rotate-45');
          } else {
            panel.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
            if (icon) icon.classList.add('rotate-45');
          }
        });
      });
    })();
