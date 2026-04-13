const SUPABASE_URL = 'https://pzgrevxzkqcwtwarowco.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cfDynypOgRq65NstCNxFdw_YJOIBgER';

exports.handler = async (event) => {
  const email = event.queryStringParameters.email;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${email}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const users = await res.json();

  if (!users.length)
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };

  const user = users[0];
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, registeredAt: user.registeredAt, nickname: user.nickname })
  };
};