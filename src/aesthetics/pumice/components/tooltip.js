(function () {
  var activeTooltip = null;

  function createTooltip(text) {
    var el = document.createElement('div');
    el.setAttribute('role', 'tooltip');
    el.style.cssText = [
      'position:fixed',
      'z-index:9999',
      'padding:4px 10px',
      'background:#1C1816',
      'color:#fff',
      'font-family:DM Sans,ui-sans-serif,system-ui,sans-serif',
      'font-size:12px',
      'line-height:1.5',
      'border-radius:8px',
      'pointer-events:none',
      'white-space:nowrap',
      'opacity:0',
      'transition:opacity 150ms ease',
    ].join(';');
    el.textContent = text;
    document.body.appendChild(el);
    // Trigger opacity transition
    requestAnimationFrame(() => { el.style.opacity = '1'; });
    return el;
  }

  function positionTooltip(tooltip, trigger, position) {
    var tr = trigger.getBoundingClientRect();
    var tt = tooltip.getBoundingClientRect();
    var gap = 8;
    var top, left;

    if (position === 'bottom') {
      top = tr.bottom + gap;
      left = tr.left + tr.width / 2 - tt.width / 2;
    } else if (position === 'right') {
      top = tr.top + tr.height / 2 - tt.height / 2;
      left = tr.right + gap;
    } else {
      // default: top
      top = tr.top - tt.height - gap;
      left = tr.left + tr.width / 2 - tt.width / 2;
    }

    // Clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tt.width - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tt.height - 8));

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function removeTooltip() {
    if (activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
    }
  }

  document.querySelectorAll('[data-fiord-tooltip]').forEach((trigger) => {
    trigger.addEventListener('mouseenter', () => {
      var text = trigger.getAttribute('data-fiord-tooltip');
      var position = trigger.getAttribute('data-fiord-tooltip-position') || 'top';
      if (!text) return;
      activeTooltip = createTooltip(text);
      // Position after paint so dimensions are known
      requestAnimationFrame(() => {
        positionTooltip(activeTooltip, trigger, position);
      });
    });

    trigger.addEventListener('mouseleave', removeTooltip);
    trigger.addEventListener('focus', () => {
      var text = trigger.getAttribute('data-fiord-tooltip');
      var position = trigger.getAttribute('data-fiord-tooltip-position') || 'top';
      if (!text) return;
      activeTooltip = createTooltip(text);
      requestAnimationFrame(() => {
        positionTooltip(activeTooltip, trigger, position);
      });
    });
    trigger.addEventListener('blur', removeTooltip);
  });
})();
