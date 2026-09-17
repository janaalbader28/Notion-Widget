// Key used to remember the selected mode in localStorage.
const STORAGE_KEY = 'notion-cat-widget-mode';

const catButtons = document.querySelectorAll('.cat-option');

function selectMode(mode, { animate = false } = {}) {
  catButtons.forEach((btn) => {
    const isSelected = btn.dataset.mode === mode;
    btn.setAttribute('aria-pressed', String(isSelected));

    if (isSelected && animate) {
      const ring = btn.querySelector('.ring');
      ring.classList.remove('pop');
      void ring.offsetWidth; // restart the animation even if replaying the same cat
      ring.classList.add('pop');
    }
  });
  localStorage.setItem(STORAGE_KEY, mode);
}

catButtons.forEach((btn) => {
  btn.addEventListener('click', () => selectMode(btn.dataset.mode, { animate: true }));

  btn.querySelector('.ring').addEventListener('animationend', (e) => {
    e.target.classList.remove('pop');
  });
});

// Restore the previously selected cat, if any (no animation on page load).
const savedMode = localStorage.getItem(STORAGE_KEY);
if (savedMode) {
  selectMode(savedMode);
}
