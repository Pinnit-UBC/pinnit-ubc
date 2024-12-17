import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import connectMongo from '@/lib/db';
import TemporaryUser from '@/models/TemporaryUser';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

export default async function userRegistration(req: NextApiRequest, res: NextApiResponse) {
  console.log('API hit:', req.method);

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Connecting to MongoDB...');
    await connectMongo();

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      year_level,
      faculty,
      keywords,
      following,
    } = req.body;

    console.log('Request body:', req.body);

    if (!email || !password || !first_name || !last_name || !username || !year_level) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(409).json({ error: 'User already exists' });
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a secure verification token and hash it
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(verificationToken, 10);
    console.log('Verification token generated and hashed');

    console.log('Creating temporary user...');
    const tempUser = await TemporaryUser.create({
      email,
      password: hashedPassword,
      verificationToken: hashedToken,
      first_name,    // Use snake_case
      last_name,
      username,
      year_level,
      faculty,
      keywords: keywords || [],
      following: following || [],
      profile_picture: null, // Default to null
    });

    console.log('Temporary user created:', tempUser);

    console.log('Preparing to send verification email...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/api/verify-email?token=${verificationToken}`;
    console.log('Verification link:', verificationLink);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Click the link to verify your email: ${verificationLink}`,
    });

    console.log('Verification email sent successfully!');
    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
