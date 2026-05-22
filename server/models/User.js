import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  rank: { type: String, default: 'Beginner' },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 1 },
  learningStyle: { type: String, default: 'visual' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
