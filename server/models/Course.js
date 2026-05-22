import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacherId: { type: String, required: true },
  roadmap: { type: Array },
  topics: { type: Array },
  difficulty: { type: String },
  duration: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
