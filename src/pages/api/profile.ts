import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import UserProfile from '@/models/UserProfile'; // MongoDB user profiles model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.cookies.session; // Get session token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the session token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // Connect to MongoDB and fetch the user's profile
    await connectMongo();
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(profile); // Send the user profile back
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
