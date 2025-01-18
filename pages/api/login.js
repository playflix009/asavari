export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, deviceId } = req.body;

    if (!username || !password || !deviceId) {
      return res.status(400).json({ error: 'सर्व फील्ड आवश्यक आहेत.' });
    }

    // Mock Database
    const users = {}; // इथे तुम्ही Database जोडू शकता.

    const user = users[username];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'चुकीचा Username किंवा Password.' });
    }

    // Check Device Limit
    if (user.device && user.device !== deviceId) {
      return res.status(403).json({ error: 'Device limit reached.' });
    }

    // Update Device
    users[username].device = deviceId;
    return res.status(200).json({ message: 'Login यशस्वी.', username });
  } else {
    return res.status(405).json({ error: 'POST method आवश्यक आहे.' });
  }
}
