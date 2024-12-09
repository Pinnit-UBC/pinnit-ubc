import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Invalid token' });
  }

  try {
    await connectMongo();

    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token
    await user.save();

    // Redirect to login page with success message
    return res.redirect(302, '/login?verified=true');
  } catch (error) {
    console.error('Error in email verification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
