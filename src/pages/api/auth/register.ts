import bcrypt from 'bcrypt';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    yearLevel,
    faculty,
    eventCategories,
    preferredEventDays,
    clubsOrganizations,
  } = req.body;

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    await connectMongo();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user with unverified status
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, isVerified: false });

    // Create user profile
    await UserProfile.create({
      userId: user._id,
      firstName,
      lastName,
      yearLevel,
      faculty,
      eventCategories,
      preferredEventDays,
      clubsOrganizations,
    });

    // Generate email verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Thank you for registering! Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
    });

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
