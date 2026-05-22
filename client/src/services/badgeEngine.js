export const BADGE_DEFINITIONS = [
  { id: 'first_step', name: 'First Step', description: 'Complete your first lesson', icon: 'Footprints', color: 'blue' },
  { id: 'quiz_ace', name: 'Quiz Ace', description: 'Get 100% on a quiz', icon: 'Target', color: 'red' },
  { id: 'on_fire', name: 'On Fire', description: 'Reach a 5-day streak', icon: 'Flame', color: 'orange' },
  { id: 'curious_mind', name: 'Curious Mind', description: 'Ask the AI 5 questions', icon: 'MessageCircle', color: 'purple' },
  { id: 'note_taker', name: 'Note Taker', description: 'Save 3 notes', icon: 'PenLine', color: 'yellow' },
  { id: 'fast_learner', name: 'Fast Learner', description: 'Complete 5 topics', icon: 'Zap', color: 'green' }
];

export const checkBadges = (profile) => {
  const unlocked = new Set(profile.badges || []);
  const newBadges = [];

  if (!unlocked.has('first_step') && profile.completedTopics?.length >= 1) newBadges.push('first_step');
  if (!unlocked.has('quiz_ace') && profile.quizHistory?.some(q => q.score === 100)) newBadges.push('quiz_ace');
  if (!unlocked.has('on_fire') && profile.streak >= 5) newBadges.push('on_fire');
  if (!unlocked.has('fast_learner') && profile.completedTopics?.length >= 5) newBadges.push('fast_learner');
  
  const totalNotes = Object.values(profile.notes || {}).reduce((acc, notesList) => acc + notesList.length, 0);
  if (!unlocked.has('note_taker') && totalNotes >= 10) newBadges.push('note_taker');
  
  if (!unlocked.has('curious_mind') && profile.questionsAsked >= 5) newBadges.push('curious_mind');

  return newBadges;
};
