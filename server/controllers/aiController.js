import { generateAIResponse } from '../services/aiService.js';

export const testGemini = async (req, res) => {
  try {
    const prompt = req.body?.prompt || "Explain quantum superposition in one simple sentence.";
    
    const { provider, response } = await generateAIResponse(prompt);

    res.json({
      success: true,
      provider,
      response
    });
  } catch (error) {
    console.error("Error in testGemini:", error.message);
    res.status(500).json({
      success: false,
      error: "AI API failed",
      details: error.response?.data || error.message
    });
  }
};
