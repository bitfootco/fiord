    (function () {
      function openModal(modal) {
        modal.classList.remove('hidden');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        var firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
      }

      function closeModal(modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      // Open triggers
      document.querySelectorAll('[data-fiord-modal-open]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var targetId = trigger.getAttribute('data-fiord-modal-open');
          var modal = document.getElementById(targetId);
          if (modal) openModal(modal);
        });
      });

      // Close triggers (X button + Cancel button)
      document.querySelectorAll('[data-fiord-modal]').forEach(function (modal) {
        modal.querySelectorAll('[data-fiord-close]').forEach(function (closer) {
          closer.addEventListener('click', function () {
            closeModal(modal);
          });
        });
      });

      // Backdrop click closes modal
      document.querySelectorAll('[data-fiord-modal]').forEach(function (modal) {
        modal.addEventListener('click', function (e) {
          if (e.target === modal) closeModal(modal);
        });
      });

      // Escape key closes modal
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          document.querySelectorAll('[data-fiord-modal]:not(.hidden)').forEach(function (modal) {
            closeModal(modal);
          });
        }
      });
    })();
