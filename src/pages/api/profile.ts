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
    console.error('Unauthorized request: No session token found');
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
    }

    if (req.method === 'PUT') {
      const { firstName, lastName, email, ...updateData } = req.body;

      // Update UserProfile fields
      const userProfileUpdate = await UserProfile.findOneAndUpdate(
        { userId },
        { $set: { ...updateData, firstName, lastName } },
        { new: true }
      );

      // Update email in User collection
      if (email) {
        const userUpdate = await User.findByIdAndUpdate(
          userId,
          { $set: { email } },
          { new: true }
        );

        if (!userUpdate) {
          return res.status(404).json({ message: 'Failed to update email in user collection.' });
        }
      }

      if (!userProfileUpdate) {
        return res.status(404).json({ message: 'User profile not found.' });
      }

      return res.status(200).json(userProfileUpdate);
    }

    if (req.method === 'POST') {
      // Handle profile picture upload
      const { file } = req.body;

      if (!file) {
        console.error('No file uploaded');
        return res.status(400).json({ message: 'No file uploaded' });
      }

      try {
        console.log('File upload initiated:', file);

        // Decode Base64 and prepare for upload
        const buffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const fileTypeMatch = file.match(/^data:image\/(\w+);base64,/);
        const fileType = fileTypeMatch ? fileTypeMatch[1] : 'jpg';
        const fileName = `profilepictures/${userId}.${fileType}`;

        console.log('Uploading file to S3:', fileName);

        const uploadResult = await s3
          .upload({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: fileName,
            Body: buffer,
            ContentType: `image/${fileType}`,
            ACL: 'public-read',
          })
          .promise();

        console.log('S3 Upload Result:', uploadResult);

        const cloudfrontUrl = `https://${process.env.CLOUDFRONT_URL}/${fileName}`;
        console.log('CloudFront URL:', cloudfrontUrl);

        const updatedProfile = await UserProfile.findOneAndUpdate(
          { userId },
          { $set: { profilePicture: cloudfrontUrl } },
          { new: true }
        );

        if (!updatedProfile) {
          console.error('Failed to update profile in MongoDB.');
          return res.status(404).json({ message: 'User profile not found' });
        }

        console.log('Profile successfully updated:', updatedProfile);

        return res.status(200).json({
          message: 'Profile picture updated successfully',
          profilePicture: cloudfrontUrl,
        });
      } catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ message: 'Internal server error during file upload' });
      }
    }

    // Default response for unsupported methods
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in profile API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
