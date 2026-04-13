const fs = require('fs');
const path = require('path');

const DB = path.join('/tmp', 'users.json');

function getUsers() {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB, 'utf-8'));
}

function saveUsers(users) {
  fs.writeFileSync(DB, JSON.stringify(users, null, 2));
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { nickname, email, password } = JSON.parse(event.body);

  if (!nickname || !email || !password)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Заполни все поля!' }) };

  if (password.length < 6)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Пароль минимум 6 символов!' }) };

  const users = getUsers();

  if (users.find(u => u.email === email))
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Email уже занят!' }) };

  users.push({ nickname, email, password, registeredAt: new Date().toISOString() });
  saveUsers(users);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: `Добро пожаловать, ${nickname}! 🎉` })
  };
};