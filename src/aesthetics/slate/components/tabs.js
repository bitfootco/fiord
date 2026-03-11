    (function () {
      const tabs = document.querySelectorAll('[data-fiord-tab]');
      const panels = document.querySelectorAll('[data-fiord-panel]');

      const activeTabClasses = [
        'text-[#3D4FB8]', 'border-[#3D4FB8]',
        'dark:text-[#6B7BE0]', 'dark:border-[#6B7BE0]'
      ];
      const inactiveTabClasses = [
        'text-slate-500', 'border-transparent',
        'hover:text-slate-700', 'hover:border-slate-300',
        'dark:text-slate-400', 'dark:hover:text-slate-200', 'dark:hover:border-slate-600'
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
