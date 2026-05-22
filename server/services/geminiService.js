import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Service to interact with Gemini API using pure HTTP/Axios
 * We use the v1beta endpoint for Gemini 1.5/2.0 Flash
 */
export const getGeminiResponse = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing from environment variables');
  }

  // Use Gemini 1.5 Flash (fast, cost-effective for hackathons)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  };

  const response = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000 // 10 second timeout
  });

  if (response.data && response.data.candidates && response.data.candidates.length > 0) {
    const text = response.data.candidates[0].content.parts[0].text;
    return text;
  } else {
    throw new Error('Invalid response structure from Gemini');
  }
};
