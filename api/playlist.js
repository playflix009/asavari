import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'users.json');
const m3uFilePath = path.join(process.cwd(), 'channels.m3u');

export default function handler(req, res) {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const users = fs.existsSync(usersFilePath)
            ? JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
            : {};

        const user = users[username];
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const device = req.headers['user-agent'];
        if (user.device && user.device !== device) {
            const blockedMessage = `
#EXTM3U
#EXTINF:-1, Device Limit Exceeded
http://example.com/error
            `.trim();
            res.setHeader('Content-Type', 'application/x-mpegurl');
            return res.status(403).send(blockedMessage);
        }

        users[username].device = device;
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        const m3uData = fs.readFileSync(m3uFilePath, 'utf-8');
        res.setHeader('Content-Type', 'application/x-mpegurl');
        res.status(200).send(m3uData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
