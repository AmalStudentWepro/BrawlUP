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

function switchTab(tab) {
  document.getElementById('form-login').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('form-register').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
}

document.getElementById('tab-login').addEventListener('click', () => switchTab('login'));
document.getElementById('tab-register').addEventListener('click', () => switchTab('register'));

function showMessage(text, isError = false) {
  let msg = document.getElementById('msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'msg';
    msg.style.cssText = `
      margin-top: 16px; padding: 12px 16px; border-radius: 8px;
      font-size: 12px; font-weight: 900; letter-spacing: 1px;
      text-transform: uppercase; text-align: center;
    `;
    document.querySelector('.form-card').appendChild(msg);
  }
  msg.style.background = isError ? '#2a0000' : '#1a2a00';
  msg.style.border = isError ? '2px solid #e01a1a' : '2px solid #5a9a00';
  msg.style.color = isError ? '#ff5555' : '#aaff55';
  msg.textContent = text;
}

document.getElementById('tab-login').addEventListener('click', () => switchTab('login'));
document.getElementById('tab-register').addEventListener('click', () => switchTab('register'));

// Вход
document.querySelector('.btn-login').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    showMessage('Заполни все поля!', true);
    return;
  }

  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  showMessage(data.message, !data.ok);

  if (data.ok) {
    localStorage.setItem('brawlup_current', JSON.stringify(data.user));
    setTimeout(() => window.location.href = '/index.html', 1500);
  }
});

// Регистрация
document.querySelector('.btn-register').addEventListener('click', async () => {
  const nickname = document.getElementById('nickname').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();

  if (!nickname || !email || !password) {
    showMessage('Заполни все поля!', true);
    return;
  }

  const res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, email, password })
  });

  const data = await res.json();
  showMessage(data.message, !data.ok);

  if (data.ok) {
    localStorage.setItem('brawlup_current', JSON.stringify({ nickname, email }));
    setTimeout(() => window.location.href = '/index.html', 1500);
  }
});