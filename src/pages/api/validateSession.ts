import connectMongo from '@/lib/db';
import Session from '@/models/Session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    const sessionToken = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

    if (!sessionToken) {
      return res.status(401).json({ error: 'Session token missing' });
    }

    const session = await Session.findOne({ session_token: sessionToken });

    if (!session || new Date() > new Date(session.expires_at)) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    return res.status(200).json({ message: 'Session valid' });
  } catch (error) {
    console.error('Error validating session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
