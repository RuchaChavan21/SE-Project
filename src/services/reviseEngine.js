export const generateRevisionQuiz = async (notes, topic) => {
  // Simulate network delay for AI processing
  await new Promise(r => setTimeout(r, 2000));

  if (!notes || notes.length === 0) {
    return null;
  }

  // Very basic keyword matching to simulate AI context awareness based ONLY on notes
  const notesText = notes.map(n => n.text.toLowerCase()).join(' ');
  
  const quiz = [];

  // Fake AI logic: we'll generate questions based on what words appear in their notes
  if (notesText.includes('wave') || notesText.includes('collapse')) {
    quiz.push({
      id: 'rev_1',
      question: "According to your notes, what happens to a wave when it is observed?",
      options: [
        "It expands infinitely",
        "It collapses into a single state",
        "It multiplies into parallel universes",
        "It becomes invisible"
      ],
      correctIndex: 1,
      explanation: "Your notes explicitly mention wave collapse upon observation."
    });
  }

  if (notesText.includes('state') || notesText.includes('multiple')) {
    quiz.push({
      id: 'rev_2',
      question: "Based on what you wrote down, a particle in superposition is in:",
      options: [
        "A single definitive state",
        "Multiple states simultaneously until observed",
        "A state of constant motion",
        "Zero energy state"
      ],
      correctIndex: 1,
      explanation: "You noted that superposition involves existing in multiple states at once."
    });
  }

  // Fallback generic questions if specific keywords aren't found, but framed as if from notes
  if (quiz.length === 0) {
    quiz.push({
      id: 'rev_gen_1',
      question: `Reflecting on your notes for ${topic}, what is the core premise?`,
      options: [
        "It's a theoretical concept with no real applications",
        "It forms the basis of quantum mechanics behavior",
        "It's an outdated model",
        "It only applies to macroscopic objects"
      ],
      correctIndex: 1,
      explanation: "Your notes suggest this is a foundational concept."
    });
  }

  // Always add one more to make it feel like a real quiz
  quiz.push({
    id: 'rev_gen_2',
    question: "True or False: Your notes indicate that observation fundamentally changes the system.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Observation is the key trigger in these mechanics, as your highlights implied."
  });

  return {
    summary: `I've analyzed your ${notes.length} note(s) on ${topic}. Let's reinforce the key concepts you captured.`,
    questions: quiz
  };
};
