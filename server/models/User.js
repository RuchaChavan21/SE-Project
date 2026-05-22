import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ['teacher', 'student'], required: true },
  preferences: { type: Object }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
