// src/services/fakeAI.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateContent = (topic, style, level, language, attempt) => {
  const isHindi = language === 'hi';
  const isAudio = style === 'audio';
  const isExamples = style === 'examples';

  // Base structures
  let explanation = '';
  let summary = '';
  let examples = [];
  let keyTerms = [];

  // Very rudimentary mocked content generation based on topic
  const baseTopic = topic ? topic.toLowerCase() : 'unknown topic';
  
  if (baseTopic.includes('superposition') || baseTopic.includes('quantum')) {
    keyTerms = ['Superposition', 'Quantum State', 'Observation'];
    if (attempt === 0) {
      explanation = isHindi 
        ? "क्वांटम सुपरपोजिशन एक सिद्धांत है..." 
        : "Quantum superposition is a fundamental principle of quantum mechanics. It states that, much like waves in classical physics, any two (or more) quantum states can be added together and the result will be another valid quantum state.";
      summary = isHindi ? "कण एक ही समय में कई अवस्थाओं में हो सकते हैं।" : "Particles can exist in multiple states simultaneously until observed.";
      examples = isExamples ? ["Imagine a coin spinning in the air. While it's spinning, it's neither heads nor tails, but a blur of both. This is like a quantum particle in superposition."] : ["A classic example is Schrödinger's cat, a thought experiment where a cat is simultaneously alive and dead until observed."];
    } else {
      // Simpler alternative explanation
      explanation = isHindi
        ? "आसान शब्दों में: जब तक आप देखते नहीं हैं, चीज़ें हर जगह हो सकती हैं।"
        : "Let's simplify this: Superposition just means something doesn't pick a final state until you look at it. Before you look, it's a mix of all possibilities.";
      summary = isHindi ? "देखने से पहले सब कुछ मिश्रित है।" : "Before looking, everything is mixed.";
      examples = ["Think of a magic trick where a card is both red and black until the magician turns it over."];
    }
  } else if (baseTopic.includes('react') || baseTopic.includes('hook')) {
    keyTerms = ['State', 'Effect', 'Component'];
    explanation = isHindi ? "रिएक्ट हुक्स आपको स्टेट का उपयोग करने देते हैं..." : "React Hooks let you use state and other React features without writing a class.";
    summary = isHindi ? "फंक्शन कंपोनेंट्स के लिए हुक्स" : "Functions that let you 'hook into' React state and lifecycle features.";
    examples = ["useState lets you add React state to function components.", "useEffect lets you perform side effects in function components."];
  } else {
    // Generic fallback
    explanation = `Here is a detailed explanation of ${topic} customized for a ${level} level student who prefers ${style} learning.`;
    if (isAudio) explanation = `Let's talk about ${topic}. ` + explanation;
    summary = `Key takeaway for ${topic}: it is important.`;
    examples = [`Example 1 of ${topic}`, `Example 2 of ${topic}`];
    keyTerms = ['Term A', 'Term B'];
  }

  // Adjust for level
  if (level === 'beginner') {
    explanation = explanation.replace(/fundamental principle/g, "basic idea").replace(/simultaneously/g, "at the same time");
  }

  return { explanation, summary, examples, keyTerms };
};

export const fetchLessonContent = async ({ topic, studentProfile, difficulty, language, attempt = 0 }) => {
  // Simulate network delay
  await delay(2000 + Math.random() * 1000);
  
  const content = generateContent(topic, studentProfile?.learningStyle || 'reading', difficulty || studentProfile?.level || 'beginner', language || studentProfile?.language || 'en', attempt);

  return {
    ...content,
    nextTopic: `${topic} Advanced`
  };
};

export const chatWithAI = async (message, topic, studentProfile) => {
  await delay(1500 + Math.random() * 1500);

  const lowerMsg = message.toLowerCase();
  let response = "";

  if (lowerMsg.includes('simplify') || lowerMsg.includes('easier')) {
    response = `Of course, let's break down ${topic} further. Imagine it like building blocks...`;
  } else if (lowerMsg.includes('example')) {
    response = `A great real-world example of ${topic} is how a smartphone processes your touch.`;
  } else {
    response = `That's a great question about ${topic}, ${studentProfile?.name || 'friend'}! Based on your interest, I'd say that understanding this concept unlocks many other doors. What specifically confuses you?`;
  }

  return response;
};
