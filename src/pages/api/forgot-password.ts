import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import connectMongo from '@/lib/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    await connectMongo();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Debug logs for token and expiry
    console.log('Generated reset token:', resetToken);
    console.log('Reset token expiry set to:', resetTokenExpiry);

    // Create the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate reset URL
    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    console.log('Reset URL sent to user:', resetUrl); // Debug log for reset URL

    // Send the reset email
    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    res.status(200).json({ message: 'Reset link sent!' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
