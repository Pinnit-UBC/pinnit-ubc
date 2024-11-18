import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import Session from '@/models/Session';
import crypto from 'crypto';

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    await connectMongo();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week

    await Session.create({ user_id: user._id, session_token: sessionToken, expires_at: expiresAt });

    setCookie('sessionToken', sessionToken, { req, res, httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
