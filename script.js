// Minimal game UI wiring
// This file replaces an accidental CSS overwrite. It adds event listeners for the main menu
// buttons and provides tiny stubs for starting the game and showing the game over screen.

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const mainMenu = document.getElementById('mainMenu');
  const howMenu = document.getElementById('howMenu');
  const aboutMenu = document.getElementById('aboutMenu');
  const charMenu = document.getElementById('charMenu');
  const gameOver = document.getElementById('gameOver');
  const toast = document.getElementById('toast');

  function showOverlay() { if (overlay) overlay.classList.remove('hidden'); }
  function hideOverlay() { if (overlay) overlay.classList.add('hidden'); }

  function hideAllMenus() {
    [mainMenu, howMenu, aboutMenu, charMenu, gameOver].forEach(m => {
      if (m) m.classList.add('hidden');
    });
    hideOverlay();
  }

  function showMenu(menu) {
    hideAllMenus();
    if (menu) {
      menu.classList.remove('hidden');
      showOverlay();
    }
  }

  // Wire buttons
  const startBtn = document.getElementById('startBtn');
  const howBtn = document.getElementById('howBtn');
  const aboutBtn = document.getElementById('aboutBtn');
  const charsBtn = document.getElementById('charsBtn');
  const howBack = document.getElementById('howBack');
  const aboutBack = document.getElementById('aboutBack');
  const charBack = document.getElementById('charBack');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const menuBtn = document.getElementById('menuBtn');
  const openCharSelectBtn = document.getElementById('openCharSelectBtn');

  function startGame() {
    hideAllMenus();
    console.log('Game started (stub).');
    // If the original game exposed an init function, call it
    if (typeof window.initGame === 'function') window.initGame();
  }

  function showGameOver(score = 0, best = 0) {
    const finalScoreText = document.getElementById('finalScoreText');
    const bestScoreText = document.getElementById('bestScoreText');
    if (finalScoreText) finalScoreText.textContent = `Final Score: ${score}`;
    if (bestScoreText) bestScoreText.textContent = `Highest Score: ${best}`;
    showMenu(gameOver);
  }

  function showToast(msg, time = 2000) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), time);
  }

  if (startBtn) startBtn.addEventListener('click', startGame);
  if (howBtn) howBtn.addEventListener('click', () => showMenu(howMenu));
  if (aboutBtn) aboutBtn.addEventListener('click', () => showMenu(aboutMenu));
  if (charsBtn) charsBtn.addEventListener('click', () => showMenu(charMenu));
  if (howBack) howBack.addEventListener('click', () => showMenu(mainMenu));
  if (aboutBack) aboutBack.addEventListener('click', () => showMenu(mainMenu));
  if (charBack) charBack.addEventListener('click', () => showMenu(mainMenu));

  if (playAgainBtn) playAgainBtn.addEventListener('click', startGame);
  if (menuBtn) menuBtn.addEventListener('click', () => showMenu(mainMenu));
  if (openCharSelectBtn) openCharSelectBtn.addEventListener('click', () => showMenu(charMenu));

  // Mobile controls (stubs) — adapt to existing input handlers if available
  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');
  const jumpBtn = document.getElementById('jumpBtn');
  if (leftBtn) {
    leftBtn.addEventListener('touchstart', () => console.log('move left start'));
    leftBtn.addEventListener('touchend', () => console.log('move left end'));
  }
  if (rightBtn) {
    rightBtn.addEventListener('touchstart', () => console.log('move right start'));
    rightBtn.addEventListener('touchend', () => console.log('move right end'));
  }
  if (jumpBtn) jumpBtn.addEventListener('click', () => console.log('jump'));

  // Keyboard stubs
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      console.log('jump (space)');
    }
    if (e.code === 'ArrowLeft') console.log('move left (keydown)');
    if (e.code === 'ArrowRight') console.log('move right (keydown)');
    if (e.key === 'Escape') showMenu(mainMenu);
  });

  if (overlay) overlay.addEventListener('click', hideAllMenus);

  // expose a couple of helpers for other scripts
  window.showGameOver = showGameOver;
  window.showToast = showToast;

  // show main menu on load
  showMenu(mainMenu);
});
