    (function () {
      var openPanel = null;
      var openTrigger = null;

      function showPopover(trigger, panel) {
        panel.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        openPanel = panel;
        openTrigger = trigger;
      }

      function hidePopover(trigger, panel) {
        panel.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        openPanel = null;
        openTrigger = null;
      }

      document.querySelectorAll('[data-fiord-popover-trigger]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var panelId = trigger.getAttribute('data-fiord-popover-trigger');
          var panel = document.getElementById(panelId);
          if (!panel) return;

          var isOpen = !panel.classList.contains('hidden');

          // Close any other open popover
          if (openPanel && openPanel !== panel) {
            hidePopover(openTrigger, openPanel);
          }

          if (isOpen) {
            hidePopover(trigger, panel);
          } else {
            showPopover(trigger, panel);
          }
        });
      });

      // Click outside to close
      document.addEventListener('click', function (e) {
        if (openPanel && !openPanel.contains(e.target) && openTrigger && !openTrigger.contains(e.target)) {
          hidePopover(openTrigger, openPanel);
        }
      });

      // Escape key to close
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openPanel) {
          hidePopover(openTrigger, openPanel);
          if (openTrigger) openTrigger.focus();
        }
      });
    })();
