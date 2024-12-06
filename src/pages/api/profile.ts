import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    if (req.method === 'GET') {
      // Fetch the user profile from the `userprofiles` collection
      const userProfile = await UserProfile.findOne({ userId });

      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      // Fetch the user's email from the `users` collection
      const user = await User.findById(userId).select('email');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Combine profile and email data
      const response = {
        ...userProfile.toObject(),
        email: user.email,
      };

      return res.status(200).json(response);
    } else if (req.method === 'PUT') {
      // Handle profile updates
      const updateData = req.body;

      // Update the user's profile in the database
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true } // Return the updated document
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      return res.status(200).json(updatedProfile);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in profile API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
