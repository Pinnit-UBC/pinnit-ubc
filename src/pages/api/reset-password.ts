import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, password } = req.body;

  try {
    await connectMongo();

    console.log('Token received:', token); // Debug log
    console.log('Password received for reset:', password); // Debug log

    const user = await User.findOne({
      resetToken: token.trim(),
      resetTokenExpiry: { $gt: Date.now() }, // Check if token is still valid
    });

    console.log('User query result:', user); // Debug log
    if (!user) {
      console.log('Invalid or expired token'); // Debug log
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    console.log('Token in DB:', user.resetToken); // Debug log
    console.log('Expiry in DB:', user.resetTokenExpiry, 'Current time:', Date.now()); // Debug log

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    console.log('Password updated successfully for user:', user.email); // Debug log

    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    console.error('Error in reset password:', error); // Debug log
    res.status(500).json({ message: 'Internal server error' });
  }
}
