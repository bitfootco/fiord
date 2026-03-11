(function () {
  var items = document.querySelectorAll('[data-fiord-accordion-item]');

  items.forEach(function (item) {
    var trigger = item.querySelector('[data-fiord-accordion-trigger]');
    var panel = item.querySelector('[data-fiord-accordion-panel]');
    var icon = item.querySelector('[data-fiord-accordion-icon]');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items
      items.forEach(function (otherItem) {
        if (otherItem === item) return;
        var otherTrigger = otherItem.querySelector('[data-fiord-accordion-trigger]');
        var otherPanel = otherItem.querySelector('[data-fiord-accordion-panel]');
        var otherIcon = otherItem.querySelector('[data-fiord-accordion-icon]');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.classList.add('hidden');
        if (otherIcon) otherIcon.textContent = '+';
      });

      // Toggle current item
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.add('hidden');
        if (icon) icon.textContent = '+';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
        if (icon) icon.textContent = '−';
      }
    });
  });
})();
