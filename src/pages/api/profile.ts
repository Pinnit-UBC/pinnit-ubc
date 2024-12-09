import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import AWS from 'aws-sdk';

// Configure S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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
      const userProfile = await UserProfile.findOne({ userId });

      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      const user = await User.findById(userId).select('email');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const response = {
        ...userProfile.toObject(),
        email: user.email,
      };

      return res.status(200).json(response);
    } else if (req.method === 'POST') {
      const { file } = req.body;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      console.log('File upload initiated for userId:', userId);

      const buffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const fileType = file.split(';')[0].split('/')[1];
      const fileName = `profilepictures/${userId}.${fileType}`;

      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: fileName,
          Body: buffer,
          ContentType: `image/${fileType}`,
        })
        .promise();

      const cloudfrontUrl = `https://${process.env.CLOUDFRONT_URL}/${fileName}`;
      console.log('Image uploaded to CloudFront URL:', cloudfrontUrl);

      const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { $set: { profilePicture: cloudfrontUrl } },
        { new: true, strict: false } // Ensure `profilePicture` is updated
      );

      if (!updatedProfile) {
        console.error('Failed to update profile picture in MongoDB. UserId:', userId);
        return res.status(404).json({ message: 'User profile not found' });
      }

      console.log('Successfully updated profilePicture in MongoDB:', updatedProfile.profilePicture);

      return res.status(200).json({
        message: 'Profile picture updated successfully',
        profilePicture: cloudfrontUrl,
      });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in profile API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
