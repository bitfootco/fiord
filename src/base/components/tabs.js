    (function () {
      const tabs = document.querySelectorAll('[data-fiord-tab]');
      const panels = document.querySelectorAll('[data-fiord-panel]');

      const activeTabClasses = [
        'text-gray-900', 'border-gray-900',
        'dark:text-gray-100', 'dark:border-gray-100'
      ];
      const inactiveTabClasses = [
        'text-gray-500', 'border-transparent',
        'hover:text-gray-700', 'hover:border-gray-300',
        'dark:text-gray-400', 'dark:hover:text-gray-200', 'dark:hover:border-gray-600'
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
