// --- CANVAS SETUP ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;
const groundY = canvas.height - 40;

// --- SOUNDS ---
const soundDrop = new Audio("https://cdn.pixabay.com/download/audio/2023/02/05/audio_177156.mp3"); // water drop
const soundHit = new Audio("https://cdn.pixabay.com/download/audio/2023/02/05/audio_177157.mp3"); // hit obstacle

// --- DIFFICULTY SETTINGS ---
const difficulties = {
  easy: { speed: 2, obstacleRate: 0.008 },
  normal: { speed: 3, obstacleRate: 0.015 },
  hard: { speed: 4.5, obstacleRate: 0.025 }
};
let currentDifficulty = "normal";

// --- PLAYER ---
let player = { x: 100, y: groundY - 40, size: 40, vy: 0, jumping: false, skinIndex: 0 };
const skins = ["🧍‍♂️", "🧑‍🚀", "🧙‍♂️", "🦸‍♂️"];
let unlockedSkins = [0];

// --- GAME STATE ---
let obstacles = [];
let droplets = [];
let score = 0;
let hits = 0;
let level = 1;
let gravity = 0.8;
let gameSpeed = difficulties[currentDifficulty].speed;

// --- INPUT ---
let keys = { left: false, right: false };

// --- MOBILE BUTTONS ---
document.getElementById("leftBtn").addEventListener("touchstart", () => keys.left = true);
document.getElementById("leftBtn").addEventListener("touchend", () => keys.left = false);
document.getElementById("rightBtn").addEventListener("touchstart", () => keys.right = true);
document.getElementById("rightBtn").addEventListener("touchend", () => keys.right = false);
document.getElementById("jumpBtn").addEventListener("touchstart", jumpPlayer);

// --- KEYBOARD ---
document.addEventListener("keydown", e => {
  if (e.code === "ArrowLeft") keys.left = true;
  if (e.code === "ArrowRight") keys.right = true;
  if (e.code === "Space") jumpPlayer();
});
document.addEventListener("keyup", e => {
  if (e.code === "ArrowLeft") keys.left = false;
  if (e.code === "ArrowRight") keys.right = false;
});

// --- PLAYER ACTIONS ---
function jumpPlayer() {
  if (!player.jumping) {
    player.vy = -12;
    player.jumping = true;
  }
}

// --- CREATE DROPLETS ---
function createDroplet() {
  let x = Math.random() * (canvas.width - 20);
  droplets.push({ x, y: -20, size: 20, emoji: "💧" });
}

// --- CREATE OBSTACLES ---
function createObstacle() {
  const types = ["🪨", "🗑️"];
  const type = types[Math.floor(Math.random() * types.length)];
  obstacles.push({ x: canvas.width + Math.random() * 400 + 300, y: groundY - 40, size: 40, emoji: type });
}

// --- COLLISION CHECK ---
function collides(a, b) {
  return a.x < b.x + b.size &&
         a.x + a.size > b.x &&
         a.y < b.y + b.size &&
         a.y + a.size > b.y;
}

// --- UPDATE GAME STATE ---
function update() {
  // Player left/right
  if (keys.left) player.x -= 5;
  if (keys.right) player.x += 5;
  if (player.x < 0) player.x = 0;
  if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;

  // Player gravity
  player.vy += gravity;
  player.y += player.vy;
  if (player.y + player.size > groundY) {
    player.y = groundY - player.size;
    player.vy = 0;
    player.jumping = false;
  }

  // Obstacles move
  obstacles.forEach((o, i) => {
    o.x -= gameSpeed;
    if (o.x + o.size < 0) obstacles.splice(i, 1);

    if (collides(player, o)) {
      soundHit.play();
      score = Math.max(0, score - 10);
      hits++;
      obstacles.splice(i, 1);
      if (hits >= 3) endGame();
    }
  });

  // Droplets move
  droplets.forEach((d, i) => {
    d.y += gameSpeed;
    if (d.y > canvas.height) droplets.splice(i, 1);

    if (collides(player, d)) {
      soundDrop.play();
      score += 10;
      droplets.splice(i, 1);
    }
  });

  // Spawn new items
  if (Math.random() < 0.02) createDroplet();
  if (Math.random() < difficulties[currentDifficulty].obstacleRate) createObstacle();

  // Level & speed
  level = Math.floor(score / 500) + 1;
  gameSpeed = difficulties[currentDifficulty].speed + level * 0.3;

  // Unlock skins
  skins.forEach((s, idx) => {
    if (level >= 3 * (idx + 1) && !unlockedSkins.includes(idx))
      unlockedSkins.push(idx);
  });

  updateHUD();
}

// --- DRAW ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Ground
  ctx.fillStyle = "black";
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
  // Player
  ctx.font = `${player.size}px Arial`;
  ctx.fillText(skins[player.skinIndex], player.x, player.y + player.size);
  // Droplets
  droplets.forEach(d => ctx.fillText(d.emoji, d.x, d.y + d.size));
  // Obstacles
  obstacles.forEach(o => ctx.fillText(o.emoji, o.x, o.y + o.size));
}

// --- HUD UPDATE ---
function updateHUD() {
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("lives").textContent = "❤️".repeat(3 - hits);
  document.getElementById("level").textContent = `Level: ${level}`;
}

// --- TOAST ---
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1000);
}

// --- GAME LOOP ---
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// --- START GAME ---
function startGame() {
  document.getElementById("mainMenu").classList.add("hidden");
  document.getElementById("difficultyMenu")?.classList.add("hidden");
  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("gameSection")?.classList.remove("hidden");

  score = 0; hits = 0; level = 1;
  obstacles = []; droplets = [];
  player.x = 100; player.y = groundY - player.size;

  loop();
}

// --- END GAME ---
function endGame() {
  document.getElementById("gameSection")?.classList.add("hidden");
  document.getElementById("gameOver").classList.remove("hidden");
  document.getElementById("finalScoreText").textContent = `Final Score: ${score}`;
  const best = Math.max(score, localStorage.getItem("bestScore") || 0);
  localStorage.setItem("bestScore", best);
  document.getElementById("bestScoreText").textContent = `Highest Score: ${best}`;
}

// --- CHARACTER LIST ---
function refreshCharacterList() {
  const list = document.getElementById("charList");
  list.innerHTML = "";
  skins.forEach((skin, i) => {
    const el = document.createElement("div");
    el.className = "char-skin" + (unlockedSkins.includes(i) ? "" : " locked");
    el.textContent = skin;
    if (unlockedSkins.includes(i)) {
      el.addEventListener("click", () => {
        player.skinIndex = i;
        showToast(`Selected ${skin}`);
      });
    }
    list.appendChild(el);
  });
}

// --- BUTTONS ---
// Main Menu Buttons
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("playAgainBtn").addEventListener("click", startGame);
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("mainMenu").classList.remove("hidden");
});

// How to Play
document.getElementById("howBtn").addEventListener("click", () => {
  document.getElementById("mainMenu").classList.add("hidden");
  document.getElementById("howMenu").classList.remove("hidden");
});
document.getElementById("howBack").addEventListener("click", () => {
  document.getElementById("howMenu").classList.add("hidden");
  document.getElementById("mainMenu").classList.remove("hidden");
});

// About
document.getElementById("aboutBtn").addEventListener("click", () => {
  document.getElementById("mainMenu").classList.add("hidden");
  document.getElementById("aboutMenu").classList.remove("hidden");
});
document.getElementById("aboutBack").addEventListener("click", () => {
  document.getElementById("aboutMenu").classList.add("hidden");
  document.getElementById("mainMenu").classList.remove("hidden");
});

// Character Select
document.getElementById("charsBtn").addEventListener("click", () => {
  document.getElementById("mainMenu").classList.add("hidden");
  refreshCharacterList();
  document.getElementById("charMenu").classList.remove("hidden");
});
document.getElementById("charBack").addEventListener("click", () => {
  document.getElementById("charMenu").classList.add("hidden");
  document.getElementById("mainMenu").classList.remove("hidden");
});
