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
    console.log(`[AI Gateway] Attempting Gemini (Primary)`);
    // Try Gemini once with a fast timeout (5s)
    const response = await getGeminiResponse(prompt);
    
    console.log(`[AI Gateway] Success! Response time: ${Date.now() - startTime}ms. Provider: Gemini`);
    return { provider: 'gemini', response };
  } catch (error) {
    // If it's a fallback condition (timeout, 429, 503, fetch failed)
    if (isFallbackCondition(error)) {
      console.log(`[AI Gateway] Gemini failed (${error.message}). Fast failover activated: Immediately switching to Grok...`);
      try {
        const grokStartTime = Date.now();
        const grokResp = await getGrokResponse(prompt);
        console.log(`[AI Gateway] Success! Response time: ${Date.now() - grokStartTime}ms. Provider: Grok`);
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
