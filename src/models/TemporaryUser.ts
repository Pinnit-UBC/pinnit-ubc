import mongoose, { Schema, model, models } from 'mongoose';

const TemporaryUserSchema = new Schema({
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  username: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  year_level: { type: String, required: false },
  faculty: { type: String, required: false },
  keywords: { type: [String], default: [] },
  following: { type: [String], default: [] },
  profile_picture: { type: String, default: null },
  verificationToken: { type: String, required: false },
  emailSent: { type: Boolean, default: false }, // Tracks if verification email was sent
});

const TemporaryUser = models.TemporaryUser || model('TemporaryUser', TemporaryUserSchema);

export default TemporaryUser;
