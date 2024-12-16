import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import connectMongo from '@/lib/db';
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(409).json({ error: 'User already exists' });
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    console.log('Creating user...');
    const user = await User.create({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    console.log('Creating user profile...');
    await UserProfile.create({
      userId: user._id,
      firstName: first_name,
      lastName: last_name,
      username,
      yearLevel: year_level,
      faculty,
      keywords,
      following,
    });

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

    console.log('User registered successfully!');
    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
