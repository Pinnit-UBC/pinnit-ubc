import { Schema, model, models, Model } from 'mongoose';

// Define the interface for the session
interface ISession {
  session_token: string;
  user_id: string; // or mongoose.Types.ObjectId if you're using ObjectId
  expires_at: Date;
}

// Define the session schema
const sessionSchema = new Schema<ISession>({
  session_token: { type: String, required: true },
  user_id: { type: String, required: true }, // Use String if ObjectId isn't compatible in edge environments
  expires_at: { type: Date, required: true },
});

// Use models.Session if it exists, otherwise define it
const Session = (models && models.Session) || model<ISession>('Session', sessionSchema);

export default Session;
