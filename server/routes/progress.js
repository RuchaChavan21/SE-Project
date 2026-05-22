import express from 'express';
import Progress from '../models/Progress.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const progress = await Progress.findOne({ userId: req.user.id });
  res.json(progress || { treeStage: 0, studyMinutes: 0, focusConsistency: 0, quizzesCompleted: 0, topics: [] });
});

router.post('/session', requireAuth, async (req, res) => {
  const { minutes = 0, focusScore = 0, quizCompleted = false } = req.body;
  const progress = await Progress.findOneAndUpdate(
    { userId: req.user.id },
    {
      $inc: { studyMinutes: minutes, quizzesCompleted: quizCompleted ? 1 : 0 },
      $set: { focusConsistency: focusScore },
    },
    { new: true, upsert: true },
  );
  res.json(progress);
});

export default router;
