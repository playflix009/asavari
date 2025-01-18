export default function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username आवश्यक आहे.' });
    }

    // Mock Playlist
    const playlist = `
      #EXTM3U
      #EXTINF:-1,Channel 1
      http://example.com/stream1.m3u8
      #EXTINF:-1,Channel 2
      http://example.com/stream2.m3u8
    `;

    return res.status(200).send(playlist);
  } else {
    return res.status(405).json({ error: 'GET method आवश्यक आहे.' });
  }
}
