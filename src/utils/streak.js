export const calculateStreak = (lastActiveDateStr, currentStreak) => {
  if (!lastActiveDateStr) return { streak: 1, isNewDay: true };
  
  const lastDate = new Date(lastActiveDateStr);
  const today = new Date();
  
  lastDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  
  const diffTime = Math.abs(today - lastDate);
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 0) return { streak: currentStreak, isNewDay: false };
  if (diffDays === 1) return { streak: currentStreak + 1, isNewDay: true };
  return { streak: 1, isNewDay: true }; // Missed a day
};
