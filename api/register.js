import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'users.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const users = fs.existsSync(usersFilePath)
            ? JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
            : {};

        if (users[username]) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        users[username] = { password, device: null };

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
