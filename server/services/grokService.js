import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Service to interact with xAI Grok API (OpenAI compatible endpoint format)
 */
export const getGrokResponse = async (prompt) => {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error('GROK_API_KEY is missing from environment variables');
  }

  const url = 'https://api.x.ai/v1/chat/completions';

  const payload = {
    messages: [
      { role: "system", content: "You are a helpful educational AI tutor." },
      { role: "user", content: prompt }
    ],
    model: "grok-beta",
    stream: false,
    temperature: 0.7
  };

  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    timeout: 10000 // 10 second timeout
  });

  if (response.data && response.data.choices && response.data.choices.length > 0) {
    return response.data.choices[0].message.content;
  } else {
    throw new Error('Invalid response structure from Grok');
  }
};
