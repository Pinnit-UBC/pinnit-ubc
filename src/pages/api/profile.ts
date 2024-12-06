import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import UserProfile from '@/models/UserProfile'; // User profiles collection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    return res.status(401).json({ message: 'Unauthorized. No session token found.' });
  }

  try {
    // Verify JWT and extract `userId`
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    // Connect to MongoDB
    await connectMongo();

    // Fetch the user profile from the `userprofiles` collection
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Send user profile data
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error in profile API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
