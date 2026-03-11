    (function () {
      document.querySelectorAll('[data-fiord-faq-item]').forEach(function (item) {
        var trigger = item.querySelector('[data-fiord-faq-trigger]');
        var panel = item.querySelector('[data-fiord-faq-panel]');
        var icon = item.querySelector('[data-fiord-faq-icon]');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', function () {
          var isOpen = !panel.classList.contains('hidden');

          // Close all other panels
          document.querySelectorAll('[data-fiord-faq-item]').forEach(function (otherItem) {
            var otherPanel = otherItem.querySelector('[data-fiord-faq-panel]');
            var otherTrigger = otherItem.querySelector('[data-fiord-faq-trigger]');
            var otherIcon = otherItem.querySelector('[data-fiord-faq-icon]');
            if (otherPanel && otherPanel !== panel) {
              otherPanel.classList.add('hidden');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
              if (otherIcon) otherIcon.style.transform = '';
            }
          });

          // Toggle current panel
          if (isOpen) {
            panel.classList.add('hidden');
            trigger.setAttribute('aria-expanded', 'false');
            if (icon) icon.style.transform = '';
          } else {
            panel.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
            if (icon) icon.style.transform = 'rotate(180deg)';
          }
        });
      });
    })();