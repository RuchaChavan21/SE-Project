/**
 * Generates personalized prompts based on the student profile.
 */

const getContextString = (profile) => {
  if (!profile) return '';
  return `
    Student Profile:
    - Level: ${profile.level || 'beginner'}
    - Preferred Language: ${profile.language === 'en' ? 'English' : profile.language || 'English'}
    - Learning Style: ${profile.learningStyle || 'examples'}
    - Weak Topics: ${(profile.weakTopics || []).join(', ') || 'None'}
  `;
};

export const buildExplainPrompt = ({ topic, studentProfile, difficulty, language }) => {
  const context = getContextString(studentProfile);
  
  return `
    You are an expert AI tutor for EduPath AI.
    ${context}
    
    Task: Explain the concept of "${topic}".
    Language: ${language === 'en' ? 'English' : language || 'English'}
    Target Difficulty: ${difficulty || 'beginner'}

    Instructions:
    - Adapt your tone and complexity to the student's level and learning style.
    - If they are a 'visual' learner, describe things spatially. If 'examples', use strong analogies.
    - If the topic is in their 'Weak Topics', be extra encouraging and break it down carefully.
    
    Return a pure JSON object (no markdown formatting, no backticks, just raw JSON) with this structure:
    {
      "explanation": "Detailed explanation here...",
      "summary": "One sentence summary...",
      "keyTerms": ["term1", "term2", "term3"],
      "examples": ["example 1", "example 2"],
      "nextTopic": "suggested next topic name"
    }
  `;
};

export const buildChatPrompt = ({ topic, message, studentProfile }) => {
  const context = getContextString(studentProfile);

  return `
    You are an expert AI tutor for EduPath AI assisting a student with the topic "${topic}".
    ${context}

    Student's question/message: "${message}"

    Instructions:
    - Answer ONLY about the current topic ("${topic}"). If the question is entirely unrelated, politely guide them back to the topic.
    - Explain simply and clearly, matching their learning style.
    - Keep it concise, friendly, and encouraging.

    Return the raw text response you want to give the student. Do not use JSON here.
  `;
};

export const buildRevisePrompt = ({ notes, topic, studentProfile }) => {
  const notesText = notes ? notes.map(n => n.text).join('\n') : '';
  
  return `
    You are an AI generating a personalized revision quiz.
    Topic: ${topic}
    
    The student has taken the following notes on this topic:
    ---
    ${notesText}
    ---
    
    Instructions:
    - Generate a 3-question multiple choice quiz based strictly on the concepts mentioned in their notes.
    - If their notes are sparse, generate generic questions about ${topic} but frame them as related to the fundamental concepts.
    
    Return a pure JSON object (no markdown formatting, no backticks, just raw JSON) with this structure:
    {
      "summary": "A brief encouraging message about their notes and what they are about to revise.",
      "questions": [
        {
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0,
          "explanation": "Explanation of why this is correct, referencing their notes."
        }
      ]
    }
  `;
};

export const buildRecommendPrompt = ({ completedTopics, weakTopics, subject }) => {
  return `
    You are an AI generating study recommendations.
    Subject Area: ${subject || 'General'}
    Completed Topics: ${(completedTopics || []).join(', ') || 'None'}
    Weak Topics: ${(weakTopics || []).join(', ') || 'None'}

    Return a pure JSON object (no markdown formatting, no backticks) with this structure:
    {
      "recommendations": ["Topic 1", "Topic 2", "Topic 3"]
    }
  `;
};
