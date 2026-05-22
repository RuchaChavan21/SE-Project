import mongoose from 'mongoose';

const TopicProgressSchema = new mongoose.Schema({
  topicId: String,
  mastery: Number,
  confidence: Number,
  revisionStrength: Number,
  lastStudiedAt: Date,
});

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  treeStage: { type: Number, default: 0 },
  studyMinutes: { type: Number, default: 0 },
  focusConsistency: { type: Number, default: 0 },
  quizzesCompleted: { type: Number, default: 0 },
  topics: [TopicProgressSchema],
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
