import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

function getModel() {
  if (!process.env.GEMINI_API_KEY) return null;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

router.post('/mentor', async (req, res) => {
  const model = getModel();
  if (!model) {
    return res.json({
      insight: 'You are 68% closer to mastering DSA. Revise weak branches before adding new leaves.',
      source: 'local-fallback',
    });
  }

  const result = await model.generateContent([
    'Act as an emotionally intelligent AI learning mentor. Return one concise insight.',
    JSON.stringify(req.body),
  ]);
  return res.json({ insight: result.response.text(), source: 'gemini' });
});

router.post('/quiz', async (req, res) => {
  const model = getModel();
  if (!model) {
    return res.json({
      questions: [
        { prompt: `Explain ${req.body.topic || 'this topic'} in one sentence.`, difficulty: 'adaptive' },
      ],
      source: 'local-fallback',
    });
  }

  const result = await model.generateContent(`Create 3 adaptive quiz questions for ${req.body.topic}. Return concise JSON.`);
  return res.json({ raw: result.response.text(), source: 'gemini' });
});

export default router;
