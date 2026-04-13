const SUPABASE_URL = 'https://pzgrevxzkqcwtwarowco.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cfDynypOgRq65NstCNxFdw_YJOIBgER';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  const { nickname, email, password } = JSON.parse(event.body);

  if (!nickname || !email || !password)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Заполни все поля!' }) };

  if (password.length < 6)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Пароль минимум 6 символов!' }) };

  // Проверяем есть ли уже такой email
  const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${email}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const existing = await checkRes.json();

  if (existing.length > 0)
    return { statusCode: 200, body: JSON.stringify({ ok: false, message: 'Email уже занят!' }) };

  // Добавляем пользователя
  await fetch(`${SUPABASE_URL}/rest/v1/users`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ nickname, email, password, registeredAt: new Date().toISOString() })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: `Добро пожаловать, ${nickname}! 🎉` })
  };
};