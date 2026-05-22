export const generateQuiz = async (topic, difficulty) => {
  // Simulate network delay for AI generation
  await new Promise(r => setTimeout(r, 1500));
  
  const baseTopic = topic ? topic.replace(/-/g, ' ').toLowerCase() : 'the topic';

  // Basic mocked questions. In a real app, this would be an API call to Gemini.
  return [
    {
      id: 1,
      type: 'multiple_choice',
      question: `What is the primary concept behind ${baseTopic}?`,
      options: [
        `It is the foundational building block of ${baseTopic}.`,
        'It is an outdated method no longer used.',
        'It only applies to advanced theoretical physics.',
        'It is a type of data structure.'
      ],
      correctIndex: 0,
      explanation: `The core idea is exactly that: it forms the foundation. Everything else builds upon this primary concept.`
    },
    {
      id: 2,
      type: 'true_false',
      question: `${baseTopic} is exclusively used by experts and has no beginner applications.`,
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: `False! While it can get complex, the basics of ${baseTopic} are highly accessible and useful for beginners.`
    },
    {
      id: 3,
      type: 'multiple_choice',
      question: `If you were to explain ${baseTopic} to a friend, which analogy works best?`,
      options: [
        'Like a car without an engine.',
        'Like building a house starting from the roof.',
        'Like a recipe where every step depends on the previous one.',
        'Like painting with your eyes closed.'
      ],
      correctIndex: 2,
      explanation: `The recipe analogy works best because it emphasizes the structured, dependent nature of the concept.`
    }
  ];
};

export const generateAIFeedback = (score, topic, profile) => {
  const cleanTopic = topic ? topic.replace(/-/g, ' ') : 'this topic';
  
  if (score === 100) {
    return `Excellent work! You've mastered ${cleanTopic} perfectly. Your preference for ${profile.learningStyle || 'visual'} learning is really paying off. Keep this momentum going!`;
  }
  if (score >= 66) {
    return `Great job! You have a solid grasp of ${cleanTopic}. There's just a little bit of room for improvement, but you are definitely on the right track.`;
  }
  return `Don't worry! ${cleanTopic} can be tricky. I've noted this in your profile, and we'll focus on providing more ${profile.learningStyle || 'examples'}-based explanations to help you solidify these concepts next time.`;
};
