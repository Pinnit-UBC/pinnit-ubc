import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectMongo } from '@/lib/db'; // Adjust path to your DB connection
import User from '@/models/User'; // Adjust path to your User model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the session token from the cookies
    const { session } = req.cookies;

    if (!session) {
      return res.status(401).json({ error: 'No session provided' });
    }

    // Verify the session token
    const decoded = jwt.verify(session, process.env.JWT_SECRET);
    await connectMongo(); // Ensure the database is connected
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Authenticated', user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Error authenticating:', error);
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }
}
