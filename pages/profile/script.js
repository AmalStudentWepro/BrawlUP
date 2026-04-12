const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({length: 40}, () => ({
  x: Math.random(), y: Math.random(),
  r: Math.random() * 2 + 0.5,
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

// Загружаем данные пользователя
const current = JSON.parse(localStorage.getItem('brawlup_current') || 'null');

if (!current) {
  window.location.href = '/pages/sign/index.html';
}

document.getElementById('nav-name').textContent = `⚡ ${current.nickname}`;
document.getElementById('avatar').textContent = current.nickname.charAt(0);
document.getElementById('profile-name').textContent = current.nickname;
document.getElementById('profile-email').textContent = current.email;
document.getElementById('row-nickname').textContent = current.nickname;
document.getElementById('row-email').textContent = current.email;

// Дата регистрации — берём с сервера
fetch(`http://localhost:3000/api/user?email=${current.email}`)
  .then(r => r.json())
  .then(data => {
    if (data.registeredAt) {
      const date = new Date(data.registeredAt);
      document.getElementById('row-date').textContent = date.toLocaleDateString('ru-RU');
    }
  })
  .catch(() => {
    document.getElementById('row-date').textContent = 'Недавно';
  });

// Выход
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('brawlup_current');
  window.location.href = '/index.html';
});
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#f9c01b" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="#f9c01b" stroke-width="2"/>
      <circle cx="12" cy="12" r="1.5" fill="#f9c01b"/>
    </svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#f9c01b" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="#f9c01b" stroke-width="2"/>
      <circle cx="12" cy="12" r="1.5" fill="#f9c01b"/>
      <line x1="3" y1="3" x2="21" y2="21" stroke="#f9c01b" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }
}