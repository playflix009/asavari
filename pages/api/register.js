export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username आणि Password आवश्यक आहे.' });
    }

    // Mock Database
    const users = {}; // इथे तुम्ही Database जोडू शकता.
    if (users[username]) {
      return res.status(400).json({ error: 'Username आधीच अस्तित्वात आहे.' });
    }

    // User Registration
    users[username] = { password, device: null };
    return res.status(200).json({ message: 'User नोंदणीकृत झाला.', username });
  } else {
    return res.status(405).json({ error: 'POST method आवश्यक आहे.' });
  }
}
