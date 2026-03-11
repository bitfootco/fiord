(function () {
  var STYLES = {
    success: {
      bg: '#F0FDF4',
      border: '#BBF7D0',
      icon: '#15803D',
      text: '#14532D',
      iconPath: 'M5 13l4 4L19 7',
    },
    warning: {
      bg: '#FFFBEB',
      border: '#FDE68A',
      icon: '#B45309',
      text: '#78350F',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    error: {
      bg: '#FEF0EC',
      border: '#FECDB9',
      icon: '#D4440F',
      text: '#7C1D06',
      iconPath: 'M6 18L18 6M6 6l12 12',
    },
  };

  function showToast(type, message) {
    var container = document.getElementById('fiord-toast-container');
    if (!container) return;

    var s = STYLES[type] || STYLES.success;

    var toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.style.cssText = [
      'display:flex',
      'align-items:flex-start',
      'gap:12px',
      'padding:14px 16px',
      'border-radius:12px',
      'border:1px solid ' + s.border,
      'background:' + s.bg,
      'max-width:320px',
      'pointer-events:auto',
      'opacity:0',
      'transform:translateY(8px)',
      'transition:opacity 200ms ease,transform 200ms ease',
      'box-shadow:0 2px 4px rgba(28,24,20,0.05),0 6px 12px -2px rgba(28,24,20,0.08)',
    ].join(';');

    toast.innerHTML =
      '<svg style="flex-shrink:0;width:18px;height:18px;color:' + s.icon + '" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="' + s.iconPath + '"/>' +
      '</svg>' +
      '<p style="flex:1;font-family:DM Sans,ui-sans-serif,system-ui,sans-serif;font-size:13px;line-height:1.5;color:' + s.text + ';margin:0">' + message + '</p>' +
      '<button aria-label="Dismiss" style="flex-shrink:0;background:none;border:none;cursor:pointer;padding:0;color:' + s.icon + ';line-height:1;font-size:16px">&#x2715;</button>';

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    function removeToast() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => { toast.remove(); }, 200);
    }

    // Auto-dismiss after 4s
    var timer = setTimeout(removeToast, 4000);

    // Manual close
    toast.querySelector('button').addEventListener('click', () => {
      clearTimeout(timer);
      removeToast();
    });
  }

  document.querySelectorAll('[data-fiord-toast-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      var type = btn.getAttribute('data-fiord-toast-type') || 'success';
      var message = btn.getAttribute('data-fiord-toast-message') || 'Done.';
      showToast(type, message);
    });
  });
})();
