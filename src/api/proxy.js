export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  
  // Определяем target URL
  const targetUrl = body.InstitutionId
    ? 'https://edu.e-yakutia.ru/Modules/INSTITUTIONSEARCHMODULE/Api/GetInstitution'
    : 'https://edu.e-yakutia.ru/Modules/INSTITUTIONSEARCHMODULE/Api/GetInstitutions';

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message 
    });
  }
}