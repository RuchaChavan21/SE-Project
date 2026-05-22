import { 
  buildExplainPrompt, 
  buildChatPrompt, 
  buildRevisePrompt, 
  buildRecommendPrompt 
} from '../services/promptBuilder.js';
import { executeAICall, safeJsonParse } from '../utils/fallbackHandler.js';

export const handleExplain = async (req, res) => {
  try {
    const { topic, studentProfile, difficulty, language } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const prompt = buildExplainPrompt({ topic, studentProfile, difficulty, language });
    const { provider, data } = await executeAICall(prompt, 'explain');
    
    // Attempt to parse JSON. If parsing fails, fall back to a structured object.
    const parsedData = safeJsonParse(data, {
      explanation: data,
      summary: "Could not parse structured summary.",
      keyTerms: [],
      examples: [],
      nextTopic: ""
    });

    res.json({ provider, ...parsedData });

  } catch (error) {
    console.error('[Explain Controller Error]:', error);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
};

export const handleChat = async (req, res) => {
  try {
    const { topic, message, studentProfile } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const prompt = buildChatPrompt({ topic, message, studentProfile });
    const { provider, data } = await executeAICall(prompt, 'chat');

    res.json({ provider, response: data });

  } catch (error) {
    console.error('[Chat Controller Error]:', error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
};

export const handleRevise = async (req, res) => {
  try {
    const { notes, topic, studentProfile } = req.body;

    const prompt = buildRevisePrompt({ notes, topic, studentProfile });
    const { provider, data } = await executeAICall(prompt, 'revise');
    
    const parsedData = safeJsonParse(data, {
      summary: "Could not structure the quiz properly. Here is the raw data.",
      questions: []
    });

    res.json({ provider, ...parsedData });

  } catch (error) {
    console.error('[Revise Controller Error]:', error);
    res.status(500).json({ error: 'Failed to generate revision quiz' });
  }
};

export const handleRecommend = async (req, res) => {
  try {
    const { completedTopics, weakTopics, subject } = req.body;

    const prompt = buildRecommendPrompt({ completedTopics, weakTopics, subject });
    const { provider, data } = await executeAICall(prompt, 'recommend');
    
    const parsedData = safeJsonParse(data, {
      recommendations: ["Error parsing topics"]
    });

    res.json({ provider, ...parsedData });

  } catch (error) {
    console.error('[Recommend Controller Error]:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};
