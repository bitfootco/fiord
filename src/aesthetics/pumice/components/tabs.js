(function () {
  var tabs = document.querySelectorAll('[data-fiord-tab]');
  var panels = document.querySelectorAll('[data-fiord-tab-panel]');

  var activeTabClasses = ['border-[#D4440F]', 'text-[#D4440F]'];
  var inactiveTabClasses = ['border-transparent', 'text-[#78716C]', 'dark:text-[#A8A29E]'];

  function activateTab(targetId) {
    tabs.forEach(function (tab) {
      var isActive = tab.dataset.fiordTab === targetId;
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        activeTabClasses.forEach(function (c) { tab.classList.add(c); });
        inactiveTabClasses.forEach(function (c) { tab.classList.remove(c); });
      } else {
        inactiveTabClasses.forEach(function (c) { tab.classList.add(c); });
        activeTabClasses.forEach(function (c) { tab.classList.remove(c); });
      }
    });

    panels.forEach(function (panel) {
      if (panel.dataset.fiordTabPanel === targetId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.dataset.fiordTab);
    });
  });
})();
