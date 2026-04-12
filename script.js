const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({length: 50}, () => ({
  x: Math.random(), y: Math.random(),
  r: Math.random() * 2.5 + 0.5,
  o: Math.random() * 0.4 + 0.1
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(249,192,27,${s.o})`;
    ctx.fill();
  });
}
draw();

// Проверяем вошёл ли пользователь
const current = JSON.parse(localStorage.getItem('brawlup_current') || 'null');
const navBtn = document.querySelector('.nav-btn');
const heroBtn = document.getElementById('hero-btn');

if (current && current.nickname) {
  // Навбар — имя просто текстом без кнопки
  navBtn.textContent = `⚡ ${current.nickname}`;
  navBtn.style.background = 'transparent';
  navBtn.style.color = '#f9c01b';
  navBtn.style.border = 'none';
  navBtn.style.cursor = 'default';
  navBtn.style.boxShadow = 'none';
  navBtn.style.borderBottom = 'none';
  navBtn.onclick = null;

  // Hero кнопка — красная "Начать пуш"
  heroBtn.textContent = '🏆 Начать пуш';
  heroBtn.style.background = '#e01a1a';
  heroBtn.style.borderColor = '#e01a1a';
  heroBtn.style.borderBottom = '5px solid #7a0000';
  heroBtn.onclick = () => {
    document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
  };
} else {
  navBtn.textContent = 'Войти';
  navBtn.style.background = '#f9c01b';
  navBtn.style.color = '#111';
  navBtn.style.border = '3px solid #f9c01b';
  navBtn.onclick = () => window.location.href = '/pages/sign/index.html';

  heroBtn.textContent = 'Войти';
  heroBtn.onclick = () => window.location.href = '/pages/sign/index.html';
}