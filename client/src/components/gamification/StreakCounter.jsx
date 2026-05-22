import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { calculateStreak } from '../../utils/streak';

const StreakCounter = () => {
  const { student, updateStudent } = useStudent();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Only check streak logic on initial mount
    const checkDailyStreak = () => {
      const result = calculateStreak(student.lastActiveDate, student.streak || 0);
      
      if (result.isNewDay) {
        updateStudent({
          streak: result.streak,
          lastActiveDate: new Date().toISOString()
        });
        
        // Show celebration popup for maintaining/growing streak
        if (result.streak > 1) {
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        }
      }
    };

    checkDailyStreak();
    // We purposefully ignore dependencies here to only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 shadow-sm relative group cursor-pointer">
        <Flame className={`w-5 h-5 ${student.streak > 0 ? 'fill-current animate-pulse' : ''}`} />
        <span className="font-bold text-sm">{student.streak || 0}</span>
        
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          {student.streak} day streak! Keep it up 🔥
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Flame className="w-8 h-8 fill-current text-yellow-300" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">{student.streak} Day Streak!</p>
              <p className="text-sm opacity-90">+10 XP Earned</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StreakCounter;
