import { Schema, model, models, Model } from 'mongoose';

interface IUserProfile {
  userId: Schema.Types.ObjectId; // Reference to the User collection
  firstName: string;
  lastName: string;
  username: string;
  yearLevel: string;
  faculty: string;
  keywords: string[];
  following: string[];
}

const userProfileSchema = new Schema<IUserProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  yearLevel: { type: String, required: true },
  faculty: { type: String, required: true },
  keywords: [{ type: String, required: true }],
  following: [{ type: String, default: [] }],
});

const UserProfile: Model<IUserProfile> = models.UserProfile || model<IUserProfile>('UserProfile', userProfileSchema);

export default UserProfile;
