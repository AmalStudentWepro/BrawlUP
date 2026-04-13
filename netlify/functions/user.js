const fs = require('fs');
const path = require('path');

const DB = path.join('/tmp', 'users.json');

function getUsers() {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB, 'utf-8'));
}

exports.handler = async (event) => {
  const email = event.queryStringParameters.email;
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user)
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, registeredAt: user.registeredAt, nickname: user.nickname })
  };
};