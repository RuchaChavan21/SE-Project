import { getGeminiResponse } from './geminiService.js';
import { getGrokResponse } from './grokService.js';

const isFallbackCondition = (error) => {
  if (!error) return false;
  const msg = error.message?.toLowerCase() || '';
  return (
    error.response?.status === 429 ||
    error.response?.status === 503 ||
    msg.includes("503") ||
    msg.includes("fetch failed") ||
    msg.includes("high demand") ||
    msg.includes("econnreset") ||
    msg.includes("etimedout") ||
    msg.includes("quota") ||
    msg.includes("resource_exhausted") ||
    msg.includes("429")
  );
};

export const generateAIResponse = async (prompt) => {
  const startTime = Date.now();
  
  try {
    console.log(`[AI Gateway] Trying Gemini...`);
    const response = await getGeminiResponse(prompt);
    
    console.log(`[AI Gateway] Response generated via Gemini (Time: ${Date.now() - startTime}ms)`);
    return { provider: 'gemini', response };
  } catch (error) {
    if (isFallbackCondition(error)) {
      console.log(`[AI Gateway] Gemini quota exceeded or failed (${error.message})`);
      console.log(`[AI Gateway] Falling back to Grok...`);
      try {
        const grokStartTime = Date.now();
        const grokResp = await getGrokResponse(prompt);
        console.log(`[AI Gateway] Response generated via Grok (Time: ${Date.now() - grokStartTime}ms)`);
        return { provider: 'grok', response: grokResp };
      } catch (grokError) {
        console.error("[AI Gateway] Both Gemini and Grok providers failed.");
        throw grokError;
      }
    }

    // Unhandled application errors
    throw error;
  }
};
