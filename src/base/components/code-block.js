    document.querySelectorAll('[aria-label="Copy code"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const block = btn.closest('[data-fiord-code]') || btn.closest('.rounded-lg');
        const rows = block ? block.querySelectorAll('tbody tr td:last-child') : [];
        const text = Array.from(rows).map(td => td.textContent).join('\n').trim();
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            const original = btn.innerHTML;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.innerHTML = original; }, 2000);
          });
        }
      });
    });
