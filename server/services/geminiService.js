import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

let genAI = null;
let activeModel = null;

const initializeGemini = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing from environment variables');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
};

const getWorkingGeminiModel = async () => {
  if (activeModel) return activeModel;

  initializeGemini();

  // Task 1 & 2: Fetch and log all available models dynamically
  try {
    if (typeof genAI.listModels === 'function') {
      console.log("[Gemini Service] Fetching models via SDK...");
      const models = await genAI.listModels();
      models.forEach(m => console.log(` - ${m.name}`));
    } else {
      // Fallback to REST API if listModels isn't available in this SDK version
      console.log("[Gemini Service] Fetching models via REST API...");
      const apiKey = process.env.GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const data = await response.json();
      if (data.models) {
        console.log("[Gemini Service] Available Models:");
        data.models.forEach(m => console.log(` - ${m.name}`));
      }
    }
  } catch (err) {
    console.log("[Gemini Service] Could not fetch model list:", err.message);
  }

  // Task 4 & 6: Fallback priority resolver
  const preferredModels = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash"
  ];

  console.log("\n[Gemini Service] Resolving dynamic Gemini model...");
  for (const modelName of preferredModels) {
    try {
      // Task 5: Use correct SDK syntax
      const model = genAI.getGenerativeModel({ model: modelName });
      
      // Test generation to ensure the model is responsive and not exhausted
      await model.generateContent("test");
      
      console.log(`[Gemini Service] Using Gemini model: ${modelName}`);
      activeModel = model;
      return model;
    } catch (err) {
      console.log(`[Gemini Service] Model failed: ${modelName} - ${err.message}`);
    }
  }

  throw new Error("No working Gemini model found. All priority models failed.");
};

export const getGeminiResponse = async (prompt) => {
  try {
    const model = await getWorkingGeminiModel();
    
    console.log(`[Gemini Service] Sending request to model: ${model.model || "active model"}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Some versions of SDK support signal in requestOptions
    const result = await Promise.race([
      model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }, { signal: controller.signal }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("ETIMEDOUT")), 5000))
    ]);

    clearTimeout(timeoutId);
    
    return result.response.text();
  } catch (error) {
    console.error(`[Gemini Service] API Error: ${error.message}`);
    
    // Add compatibility layer for aiService.js rate limit detection
    if (error.message?.includes("quota") || error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("429")) {
      console.error("[Gemini Service] Quota exhausted or rate limit reached.");
      error.response = { status: 429 };
    }

    
    throw error;
  }
};
