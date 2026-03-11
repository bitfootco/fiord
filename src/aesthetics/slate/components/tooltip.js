    (function () {
      var activeTooltip = null;

      function createTooltip(text) {
        var el = document.createElement('div');
        el.setAttribute('role', 'tooltip');
        el.className = [
          'fixed z-[9999] px-2.5 py-1.5 text-xs font-medium',
          'text-white bg-slate-900 dark:bg-slate-700 rounded-md shadow-sm',
          'pointer-events-none whitespace-nowrap',
          'transition-opacity duration-150'
        ].join(' ');
        el.textContent = text;
        document.body.appendChild(el);
        return el;
      }

      function positionTooltip(tooltip, trigger) {
        var rect = trigger.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();
        var gap = 8;

        var top = rect.top - tooltipRect.height - gap;
        var left = rect.left + rect.width / 2 - tooltipRect.width / 2;

        // Flip to below if not enough space above
        if (top < gap) {
          top = rect.bottom + gap;
        }

        // Keep within horizontal bounds
        left = Math.max(gap, Math.min(left, window.innerWidth - tooltipRect.width - gap));

        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
      }

      function showTooltip(trigger) {
        var text = trigger.getAttribute('data-fiord-tooltip');
        if (!text) return;
        var tooltip = createTooltip(text);
        activeTooltip = tooltip;
        // Position after render
        requestAnimationFrame(function () {
          positionTooltip(tooltip, trigger);
        });
        trigger._fiordTooltip = tooltip;
      }

      function hideTooltip(trigger) {
        if (trigger._fiordTooltip) {
          trigger._fiordTooltip.remove();
          trigger._fiordTooltip = null;
        }
        activeTooltip = null;
      }

      document.querySelectorAll('[data-fiord-tooltip]').forEach(function (trigger) {
        trigger.addEventListener('mouseenter', function () { showTooltip(trigger); });
        trigger.addEventListener('mouseleave', function () { hideTooltip(trigger); });
        trigger.addEventListener('focus', function () { showTooltip(trigger); });
        trigger.addEventListener('blur', function () { hideTooltip(trigger); });
      });

      // Clean up on scroll/resize
      window.addEventListener('scroll', function () {
        if (activeTooltip) activeTooltip.remove();
        activeTooltip = null;
      }, { passive: true });
    })();
