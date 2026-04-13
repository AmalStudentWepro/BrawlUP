const SUPABASE_URL = 'https://pzgrevxzkqcwtwarowco.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cfDynypOgRq65NstCNxFdw_YJOIBgER';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  const { email, password } = JSON.parse(event.body);

  if (!email || !password)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Заполни все поля!' }) };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${email}&password=eq.${password}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const users = await res.json();

  if (!users.length)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Неверный email или пароль!' }) };

  const user = users[0];
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: `Привет, ${user.nickname}! ⚡`, user: { nickname: user.nickname, email: user.email } })
  };
};