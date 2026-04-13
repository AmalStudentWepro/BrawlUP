const fs = require('fs');
const path = require('path');

const DB = path.join('/tmp', 'users.json');

function getUsers() {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB, 'utf-8'));
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, password } = JSON.parse(event.body);

  if (!email || !password)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Заполни все поля!' }) };

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Неверный email или пароль!' }) };

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: `Привет, ${user.nickname}! ⚡`, user: { nickname: user.nickname, email: user.email } })
  };
};