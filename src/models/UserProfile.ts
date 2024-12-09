import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  yearLevel: string;
  faculty: string;
  keywords: string[];
  following: string[];
  profilePicture?: string; // Add this field
}

const UserProfileSchema = new Schema<IUserProfile>({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  yearLevel: { type: String, required: true },
  faculty: { type: String, required: true },
  keywords: { type: [String], default: [] },
  following: { type: [String], default: [] },
  profilePicture: { type: String, default: '' }, // Default to an empty string
});

const UserProfile = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;
