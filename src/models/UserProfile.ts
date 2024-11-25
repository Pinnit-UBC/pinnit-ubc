import { Schema, model, models, Model } from 'mongoose';

interface IUserProfile {
  userId: Schema.Types.ObjectId; // Reference to the User collection
  firstName: string;
  lastName: string;
  username: string; // Added username field
  yearLevel: string; // Dropdown values
  faculty: string; // Dropdown values
  keywords: string[]; // Unified interests and hobbies
  following: string[]; // Array of followed clubs
}

const userProfileSchema = new Schema<IUserProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  yearLevel: { type: String, required: true },
  faculty: { type: String, required: true },
  keywords: [{ type: String, required: true }], // Unified array of strings
  following: [{ type: String, default: [] }], // Added following as an array with default empty
});

const UserProfile: Model<IUserProfile> = models.UserProfile || model<IUserProfile>('UserProfile', userProfileSchema);

export default UserProfile;
