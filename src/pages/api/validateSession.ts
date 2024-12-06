import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    return res.status(401).json({ message: 'No session token provided' });
  }

  try {
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET!);
    await connectMongo(); // Ensure DB connection

    const user = await User.findById((decoded as any).userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Session valid', user });
  } catch (error) {
    console.error('Session validation error:', error);
    return res.status(401).json({ message: 'Invalid or expired session token' });
  }
}
