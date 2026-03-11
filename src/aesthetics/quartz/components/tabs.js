    (function () {
      const tabs = document.querySelectorAll('[data-fiord-tab]');
      const panels = document.querySelectorAll('[data-fiord-panel]');

      const activeTabClasses = [
        'text-[#0891B2]', 'border-[#0891B2]',
        'dark:text-[#06B6D4]', 'dark:border-[#06B6D4]'
      ];
      const inactiveTabClasses = [
        'text-quartz-500', 'border-transparent',
        'hover:text-quartz-700', 'hover:border-quartz-300',
        'dark:text-quartz-400', 'dark:hover:text-quartz-200', 'dark:hover:border-quartz-600'
      ];

      function activateTab(targetTab) {
        tabs.forEach(tab => {
          const isTarget = tab.dataset.fiordTab === targetTab;
          tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
          if (isTarget) {
            inactiveTabClasses.forEach(c => tab.classList.remove(c));
            activeTabClasses.forEach(c => tab.classList.add(c));
          } else {
            activeTabClasses.forEach(c => tab.classList.remove(c));
            inactiveTabClasses.forEach(c => tab.classList.add(c));
          }
        });

        panels.forEach(panel => {
          if (panel.dataset.fiordPanel === targetTab) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', '');
          }
        });
      }

      tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.fiordTab));
      });

      // Keyboard navigation
      tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', e => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const next = tabs[(index + 1) % tabs.length];
            next.focus();
            activateTab(next.dataset.fiordTab);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = tabs[(index - 1 + tabs.length) % tabs.length];
            prev.focus();
            activateTab(prev.dataset.fiordTab);
          }
        });
      });
    })();
