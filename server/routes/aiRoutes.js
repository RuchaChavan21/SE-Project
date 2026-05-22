import express from 'express';
import { handleExplain, handleChat, handleRevise, handleRecommend } from '../controllers/aiController.js';

const router = express.Router();

// Generate educational explanation for a topic
router.post('/explain', handleExplain);

// AI Chat Tutor
router.post('/chat', handleChat);

// Generate revision quiz from notes
router.post('/revise', handleRevise);

// Get topic recommendations
router.post('/recommend', handleRecommend);

export default router;
