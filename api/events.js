// api/events.js
// Vercel Serverless Function & Local API Handler for Ticketmaster Events

module.exports = async (req, res) => {
  // Helper to send JSON response (compatible with both Vercel and local server.js)
  const sendJson = (statusCode, data) => {
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  // 1. Read API key exclusively from environment variable
  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return sendJson(503, {
      error: 'Ticketmaster API key is not configured. Please set TICKETMASTER_API_KEY in environment variables.'
    });
  }

  // 2. Extract query parameters safely
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const city = (req.query && req.query.city) || urlObj.searchParams.get('city') || '';
  const countryCode = (req.query && req.query.countryCode) || urlObj.searchParams.get('countryCode') || '';

  // 3. Construct Ticketmaster API endpoint
  let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${encodeURIComponent(apiKey)}&city=${encodeURIComponent(city)}&size=12`;
  if (countryCode) {
    apiUrl += `&countryCode=${encodeURIComponent(countryCode)}`;
  }

  // 4. Fetch events data and return response
  try {
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();
    return sendJson(apiRes.status, data);
  } catch (err) {
    return sendJson(500, { error: 'Failed to contact Ticketmaster service' });
  }
};
