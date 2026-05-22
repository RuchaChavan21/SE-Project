import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

export const getGrokResponse = async (prompt) => {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error('XAI_API_KEY is missing from environment variables');
  }

  console.log(`[Grok Service] Using model: grok-4.20-reasoning...`);

  try {
    const response = await axios.post(
      "https://api.x.ai/v1/responses",
      {
        model: "grok-4.20-reasoning",
        input: prompt
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        timeout: 5000 // 5 second timeout protection
      }
    );

    return response.data.output[0].content[0].text;
  } catch (error) {
    console.error(`[Grok Service] Error: ${error.response?.data?.error?.message || error.message}`);
    throw error;
  }
};
