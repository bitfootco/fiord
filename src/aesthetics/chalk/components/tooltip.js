    (function () {
      document.querySelectorAll('[data-fiord-tooltip]').forEach(function (trigger) {
        var tooltipId = trigger.getAttribute('data-fiord-tooltip');
        var tooltip = document.getElementById(tooltipId);
        if (!tooltip) return;

        trigger.addEventListener('mouseenter', function () {
          tooltip.style.opacity = '1';
        });

        trigger.addEventListener('mouseleave', function () {
          tooltip.style.opacity = '0';
        });

        trigger.addEventListener('focus', function () {
          tooltip.style.opacity = '1';
        });

        trigger.addEventListener('blur', function () {
          tooltip.style.opacity = '0';
        });
      });
    })();
