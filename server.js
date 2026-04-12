const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const DB = './users.json';

function getUsers() {
  return JSON.parse(fs.readFileSync(DB, 'utf-8'));
}
function saveUsers(users) {
  fs.writeFileSync(DB, JSON.stringify(users, null, 2));
}

app.post('/api/register', (req, res) => {
  const { nickname, email, password } = req.body;

  if (!nickname || !email || !password)
    return res.json({ ok: false, message: 'Заполни все поля!' });
  if (password.length < 6)
    return res.json({ ok: false, message: 'Пароль минимум 6 символов!' });

  const users = getUsers();
  if (users.find(u => u.email === email))
    return res.json({ ok: false, message: 'Email уже занят!' });

  users.push({ nickname, email, password, registeredAt: new Date().toISOString() });
  saveUsers(users);

  console.log('✅ Новый пользователь:', nickname, email);
  res.json({ ok: true, message: `Добро пожаловать, ${nickname}! 🎉` });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ ok: false, message: 'Заполни все поля!' });

    const users = getUsers();
    console.log('📋 Текущие пользователи:', users);
    console.log('🔍 Ищем email:', email);
    if (users.find(u => u.email === email))
      return res.json({ ok: false, message: 'Email уже занят!' });

  if (!user)
    return res.json({ ok: false, message: 'Неверный email или пароль!' });

  res.json({ ok: true, message: `Привет, ${user.nickname}! ⚡`, user: { nickname: user.nickname, email: user.email } });
});

app.listen(3000, () => console.log('🚀 Сервер запущен на http://localhost:3000'));