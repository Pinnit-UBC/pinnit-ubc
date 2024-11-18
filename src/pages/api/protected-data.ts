import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db';
import Session from '@/models/Session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionToken = req.cookies.sessionToken;

  await connectMongo();

  const session = await Session.findOne({ session_token: sessionToken });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.status(200).json({ data: 'This is protected data' });
}