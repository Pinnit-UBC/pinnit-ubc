import { Schema, model, models, Model } from 'mongoose';

interface IUserProfile {
  userId: Schema.Types.ObjectId; // Reference to the User collection
  firstName: string;
  lastName: string;
  yearLevel: string; // Dropdown values
  faculty: string; // Dropdown values
  eventCategories: string[]; // Multi-select
  preferredEventDays: string[]; // Multi-select
  clubsOrganizations: string[]; // Searchable dropdown
}

const userProfileSchema = new Schema<IUserProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  yearLevel: { type: String, required: true },
  faculty: { type: String, required: true },
  eventCategories: [{ type: String }], // Array of strings
  preferredEventDays: [{ type: String }], // Array of strings
  clubsOrganizations: [{ type: String }], // Array of strings
});

const UserProfile: Model<IUserProfile> = models.UserProfile || model<IUserProfile>('UserProfile', userProfileSchema);

export default UserProfile;
