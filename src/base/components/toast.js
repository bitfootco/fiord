    (function () {
      var TOAST_DURATION = 4000;

      var VARIANTS = {
        success: {
          icon: '<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
          classes: 'bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
          iconClasses: 'text-green-500',
          label: 'Changes saved successfully.',
        },
        error: {
          icon: '<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
          classes: 'bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
          iconClasses: 'text-red-500',
          label: 'Something went wrong. Please try again.',
        },
        warning: {
          icon: '<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>',
          classes: 'bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
          iconClasses: 'text-yellow-500',
          label: 'Your trial expires in 3 days.',
        },
        info: {
          icon: '<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"/></svg>',
          classes: 'bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
          iconClasses: 'text-blue-500',
          label: 'Your report is ready to download.',
        },
      };

      function showToast(type) {
        var variant = VARIANTS[type] || VARIANTS.info;
        var container = document.getElementById('fiord-toast-container');
        if (!container) return;

        var toast = document.createElement('div');
        toast.setAttribute('role', 'alert');
        toast.className = [
          'pointer-events-auto flex items-start gap-3 w-80 px-4 py-3 rounded-lg shadow-lg',
          'transition-all duration-300 opacity-0 translate-y-2',
          variant.classes
        ].join(' ');

        var iconWrapper = document.createElement('span');
        iconWrapper.className = variant.iconClasses;
        iconWrapper.innerHTML = variant.icon;

        var message = document.createElement('p');
        message.className = 'flex-1 text-sm font-medium leading-snug pt-0.5';
        message.textContent = variant.label;

        var closeBtn = document.createElement('button');
        closeBtn.className = 'shrink-0 p-0.5 opacity-60 hover:opacity-100 transition-opacity';
        closeBtn.setAttribute('aria-label', 'Dismiss notification');
        closeBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
        closeBtn.addEventListener('click', function () { removeToast(toast); });

        toast.appendChild(iconWrapper);
        toast.appendChild(message);
        toast.appendChild(closeBtn);
        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            toast.classList.remove('opacity-0', 'translate-y-2');
          });
        });

        var timer = setTimeout(function () { removeToast(toast); }, TOAST_DURATION);
        toast._fiordTimer = timer;
      }

      function removeToast(toast) {
        clearTimeout(toast._fiordTimer);
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }

      document.querySelectorAll('[data-fiord-toast]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var type = trigger.getAttribute('data-fiord-toast-type') || 'info';
          showToast(type);
        });
      });
    })();
