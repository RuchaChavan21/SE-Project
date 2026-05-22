import express from 'express';
import { testGemini } from '../controllers/aiController.js';

const router = express.Router();

// Temporary Gemini test endpoint
router.post('/chat', testGemini);

export default router;
