import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import connectMongo from '@/lib/db';
import TemporaryUser from '@/models/TemporaryUser';
import User from '@/models/User';

// Configure S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
      profile_picture, // Base64 encoded image
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

    let profilePictureUrl = null;

    // Upload profile picture to S3
    if (profile_picture) {
      try {
        console.log('Uploading profile picture to S3...');
        const buffer = Buffer.from(profile_picture.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const fileTypeMatch = profile_picture.match(/^data:image\/(\w+);base64,/);
        const fileType = fileTypeMatch ? fileTypeMatch[1] : 'jpg';
        const fileName = `profilepictures/${username}_${Date.now()}.${fileType}`;

        const uploadResult = await s3
          .upload({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: fileName,
            Body: buffer,
            ContentType: `image/${fileType}`,
          })
          .promise();

        profilePictureUrl = uploadResult.Location;
        console.log('Profile picture uploaded to:', profilePictureUrl);
      } catch (s3Error) {
        console.error('Error uploading profile picture to S3:', s3Error);
        return res.status(500).json({ error: 'Failed to upload profile picture to S3' });
      }
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(verificationToken, 10);

    console.log('Creating temporary user...');
    const tempUser = await TemporaryUser.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      year_level,
      faculty,
      keywords: keywords || [],
      following: following || [],
      profile_picture: profilePictureUrl,
      verificationToken: hashedToken,
    });

    console.log('Temporary user created:', tempUser);

    // Send verification email
    const verificationLink = `${process.env.BASE_URL}/api/verify-email?token=${verificationToken}`;
    console.log('Verification link:', verificationLink);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        text: `Click the following link to verify your email: ${verificationLink}`,
      });
      console.log('Verification email sent successfully!');
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    res.status(201).json({
      message: 'User registered successfully. Please verify your email.',
      profile_picture: profilePictureUrl,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
