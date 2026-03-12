    (function () {
      var tabs = document.querySelectorAll('[data-fiord-tab]');
      var panels = document.querySelectorAll('[data-fiord-panel]');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var targetId = tab.getAttribute('data-fiord-tab');

          // Update tab states
          tabs.forEach(function (t) {
            var isActive = t.getAttribute('data-fiord-tab') === targetId;
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive) {
              t.classList.add('text-[#1C1B18]', 'dark:text-[#EDEAE3]', 'border-[#1A5C45]', 'dark:border-[#24785C]', 'font-medium');
              t.classList.remove('text-[#6B6860]', 'dark:text-[#9B9690]', 'border-transparent');
            } else {
              t.classList.remove('text-[#1C1B18]', 'dark:text-[#EDEAE3]', 'border-[#1A5C45]', 'dark:border-[#24785C]', 'font-medium');
              t.classList.add('text-[#6B6860]', 'dark:text-[#9B9690]', 'border-transparent');
            }
          });

          // Update panel visibility
          panels.forEach(function (panel) {
            if (panel.getAttribute('data-fiord-panel') === targetId) {
              panel.classList.remove('hidden');
            } else {
              panel.classList.add('hidden');
            }
          });
        });
      });
    })();
