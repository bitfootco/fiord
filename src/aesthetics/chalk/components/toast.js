    (function () {
      document.querySelectorAll('[data-fiord-toast-trigger]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var toastId = trigger.getAttribute('data-fiord-toast-trigger');
          var toast = document.getElementById(toastId);
          if (!toast) return;

          // Make visible
          toast.classList.remove('hidden');
          toast.style.opacity = '1';

          // Auto-dismiss after 4 seconds
          var timer = setTimeout(function () {
            toast.style.opacity = '0';
            setTimeout(function () { toast.classList.add('hidden'); toast.style.opacity = ''; }, 300);
          }, 4000);

          // Manual dismiss via close buttons inside the toast
          toast.querySelectorAll('button[aria-label="Dismiss"]').forEach(function (btn) {
            btn.addEventListener('click', function () {
              clearTimeout(timer);
              toast.style.opacity = '0';
              setTimeout(function () { toast.classList.add('hidden'); toast.style.opacity = ''; }, 300);
            }, { once: true });
          });
        });
      });
    })();
