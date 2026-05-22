import fs from "fs";
import path from "path";
import { generateAIResponse } from "../services/aiService.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

export const uploadContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    console.log(`[Upload] Received file: ${req.file.originalname} (${mimeType})`);

    let extractedText = "";

    // 1. Extract content based on file type
    console.log(`[Upload] Extracting text locally...`);
    if (mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      extractedText = data.text;
    } else {
      // Fallback for simple text files or other extensions handled natively
      extractedText = fs.readFileSync(filePath, 'utf8');
    }
    // --- NEW: TOPIC EXTRACTION LOGIC ---
    console.log(`[Upload] Applying heuristic filtering to extract headings/topics...`);
    const lines = extractedText.split('\n');
    const topics = [];

    for (const line of lines) {
      const trimmed = line.trim();

      // Skip empty lines or very long lines (paragraphs)
      if (!trimmed || trimmed.length > 80) continue;

      // Heuristics for syllabus/roadmap elements
      const isAllCap = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
      const isChapterOrUnit = /^(unit|module|chapter|session)\s*\d+/i.test(trimmed);
      const isNumberedList = /^\d+(\.\d+)*\s+[A-Za-z]/.test(trimmed);
      const isBulletPoint = /^[-*•]\s+[A-Za-z]/.test(trimmed);

      if (isAllCap || isChapterOrUnit || isNumberedList || isBulletPoint) {
        // Clean up leading bullets or numbers for cleaner output
        const cleanTopic = trimmed.replace(/^[-*•\d.]+\s*/, '').trim();
        if (cleanTopic.length > 3 && !topics.includes(cleanTopic)) {
          topics.push(cleanTopic);
        }
      }
    }

    // Fallback if topics array is too small or empty
    let finalTopics = [];
    if (topics.length > 3) {
      finalTopics = topics.slice(0, 50); // limit to max 50 topics
      console.log(`[Upload] Successfully extracted ${finalTopics.length} topics. Generating local roadmap.`);
    } else {
      console.log(`[Upload] Heuristic extraction yielded few results. Generating default roadmap.`);
      finalTopics = [
        "Introduction and Core Concepts",
        "Fundamental Principles",
        "Key Methodologies",
        "Advanced Applications",
        "Case Studies and Review"
      ];
    }

    // 2. Build local JSON template dynamically
    console.log(`[Upload] Generating programmatic roadmap template...`);
    const parsedData = {
      subject: req.file.originalname.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, "") || "Custom Course",
      difficulty: "Mixed",
      topics: finalTopics.map((topic, index) => {
        const difficulty = index < Math.floor(finalTopics.length * 0.3) ? "Beginner" :
          index < Math.floor(finalTopics.length * 0.7) ? "Intermediate" : "Advanced";

        return {
          title: topic,
          summary: `Core learning module focused on ${topic}.`,
          difficulty: difficulty,
          estimatedTime: `${15 + Math.floor(Math.random() * 30)} mins`, // 15-45 mins
          prerequisites: index > 0 ? [finalTopics[index - 1]] : []
        };
      }),
      learningPath: [
        {
          level: "Beginner",
          description: "Foundational concepts and introductory theories.",
          topicsIncluded: Math.ceil(finalTopics.length * 0.3) || 1
        },
        {
          level: "Intermediate",
          description: "Core methodologies and standard implementations.",
          topicsIncluded: Math.ceil(finalTopics.length * 0.4) || 1
        },
        {
          level: "Advanced",
          description: "Complex applications and edge cases.",
          topicsIncluded: Math.floor(finalTopics.length * 0.3) || 1
        }
      ],
      keyConcepts: finalTopics.slice(0, 5),
      recommendedOrder: finalTopics
    };

    // 3. Cleanup local file
    try {
      fs.unlinkSync(filePath);
    } catch (e) { }

    res.json({
      success: true,
      provider: "local",
      data: parsedData
    });

  } catch (error) {
    console.error("[Upload] Error:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) { }
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
