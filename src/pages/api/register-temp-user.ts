import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/lib/db';
import TemporaryUser from '@/models/TemporaryUser';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow all origins and handle preflight requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('API Endpoint Hit: /api/register-temp-user');
  console.log('Request Method:', req.method);

  try {
    await connectMongo();
    console.log('Connected to MongoDB');

    if (req.method === 'POST') {
      const { email, ...data } = req.body;

      // Check if email exists
      if (!email) {
        console.error('Email is required but missing');
        return res.status(400).json({ message: 'Email is required' });
      }

      console.log('Received data for temporary user:', { email, ...data });

      // Check if the user already exists
      let user = await TemporaryUser.findOne({ email });

      if (user) {
        if (user.verificationToken) {
          // User already has a token; reuse it
          console.log('User already exists and has a verification token. Reusing token.');
        } else {
          // If no token exists, generate one and update the user
          const newToken = crypto.randomBytes(32).toString('hex');
          user.verificationToken = newToken;
          await user.save();
          console.log('Generated new token for existing user.');
        }
      } else {
        // New user: create a new entry with a token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user = await TemporaryUser.create({ email, verificationToken, ...data });
        console.log('New temporary user created with verification token.');
      }

      // Send verification email (only if it’s the first email or reused)
      const verificationLink = `${process.env.BASE_URL}/api/verify-email?token=${user.verificationToken}`;
      console.log('Verification link:', verificationLink);

      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use the appropriate email service
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `
          <p>Hello,</p>
          <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
          <a href="${verificationLink}">Verify Email</a>
        `,
      };

      // Ensure email is sent only once
      if (!user.emailSent) {
        await transporter.sendMail(mailOptions);
        user.emailSent = true; // Mark email as sent
        await user.save();
        console.log('Verification email sent to:', email);
      } else {
        console.log('Verification email already sent previously. No new email sent.');
      }

      return res.status(200).json({
        message: 'Temporary user data saved successfully. Verification email sent if needed.',
        user,
      });
    } else {
      // Handle unsupported methods
      console.warn('Unsupported request method:', req.method);
      return res.setHeader('Allow', ['POST']).status(405).json({
        message: `Method ${req.method} not allowed. Use POST instead.`,
      });
    }
  } catch (error) {
    console.error('Error in register-temp-user API:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
