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

document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('brawlup_current');
  window.location.href = '/index.html';
});

// Ошибка при нажатии на начать пуш
document.querySelector('.btn-push').addEventListener('click', () => {
  const existing = document.getElementById('push-error');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'push-error';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn .3s ease;
  `;

  overlay.innerHTML = `
    <div style="
      background: #0d0000; border: 2px solid #e01a1a;
      border-top: 5px solid #e01a1a; border-radius: 16px;
      padding: 60px 48px; max-width: 600px; width: 90%;
      text-align: center; font-family: 'Nunito', sans-serif;
      position: relative; animation: scaleIn .3s ease;
    ">
      <div style="font-size: 64px; margin-bottom: 24px;">🚫</div>

      <div style="
        font-size: 28px; font-weight: 900; color: #e01a1a;
        text-transform: uppercase; letter-spacing: 3px;
        text-shadow: 0 3px 0 #7a0000; margin-bottom: 16px;
      ">Пуш недоступен!</div>

      <div style="
        width: 60px; height: 3px; background: #e01a1a;
        margin: 0 auto 24px; border-radius: 2px;
      "></div>

      <div style="
        font-size: 15px; font-weight: 800; color: #ff8888;
        letter-spacing: 1px; line-height: 1.7; margin-bottom: 12px;
      ">Сервер перегружен — все слоты заняты!</div>

      <div style="
        font-size: 12px; font-weight: 800; color: #5a2020;
        letter-spacing: 1px; text-transform: uppercase; margin-bottom: 36px;
      ">Попробуй снова через несколько минут</div>

      <button onclick="document.getElementById('push-error').remove()" style="
        background: #e01a1a; color: #fff; border: none;
        padding: 14px 48px; font-size: 13px; font-weight: 900;
        letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
        border-radius: 8px; border-bottom: 4px solid #7a0000;
        font-family: 'Nunito', sans-serif;
      " onmouseover="this.style.transform='scale(1.04)'"
         onmouseout="this.style.transform='scale(1)'">
        Понятно
      </button>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
});