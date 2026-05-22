import { getGeminiResponse } from '../services/geminiService.js';
import { getGrokResponse } from '../services/grokService.js';
import { getMockResponse } from './mockFallback.js';

/**
 * Orchestrates the AI call: Gemini -> Grok -> Mock
 * @param {string} prompt The generated prompt text
 * @param {string} type The type of request (explain, chat, revise, recommend) to guide the mock fallback
 */
export const executeAICall = async (prompt, type) => {
  let responseData = null;
  let provider = '';

  try {
    // 1. Try Gemini (PRIMARY)
    console.log('\n[AI Orchestrator] Attempting Gemini as primary provider...');
    responseData = await getGeminiResponse(prompt);
    provider = 'gemini';
  } catch (geminiError) {
    console.error(`[AI Orchestrator] Gemini failed (${geminiError.message}), switching to Grok...`);
    
    try {
      // 2. Try Grok Fallback
      console.log('[AI Orchestrator] Attempting Grok Fallback...');
      responseData = await getGrokResponse(prompt);
      provider = 'grok';
    } catch (grokError) {
      console.error(`[AI Orchestrator] Grok failed (${grokError.message}). Fallback mock response activated.`);
      
      // 3. Fallback to Mock Data (FAILSAFE)
      responseData = getMockResponse(type);
      provider = 'mock';
    }
  }

  return { provider, data: responseData };
};

/**
 * Utility to safely parse JSON if the provider returned a string that looks like JSON
 */
export const safeJsonParse = (rawText, fallbackObj) => {
  if (typeof rawText !== 'string') return rawText; // Already an object
  
  try {
    // Strip possible markdown blocks e.g., ```json ... ```
    let cleanText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('[JSON Parse Error] Failed to parse AI response:', error.message);
    return fallbackObj;
  }
};
