import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0 },
  completedTopics: { type: Array, default: [] },
  enrolledAt: { type: Date, default: Date.now }
});

export default mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);
