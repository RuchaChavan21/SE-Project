import React from 'react';
import { motion } from 'framer-motion';
import { Medal, Star, Shield, Award } from 'lucide-react';

const AchievementGrid = ({ badges }) => {
  const defaultBadges = [
    { id: 'first_lesson', title: 'First Steps', icon: <Star className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600', earned: true },
    { id: 'streak_3', title: '3 Day Streak', icon: <Medal className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600', earned: true },
    { id: 'quiz_master', title: 'Quiz Master', icon: <Award className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-600', earned: false },
    { id: 'perfect_score', title: 'Perfection', icon: <Shield className="w-6 h-6" />, color: 'bg-rose-100 text-rose-600', earned: false }
  ];

  // Merge student badges with default to show locked/unlocked state
  const displayBadges = defaultBadges.map(b => ({
    ...b,
    earned: b.earned || badges?.includes(b.id)
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Achievements</h3>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer">View All</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {displayBadges.map((badge, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <motion.div 
              whileHover={{ scale: badge.earned ? 1.1 : 1 }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-all ${
                badge.earned ? badge.color + ' dark:bg-opacity-20' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 grayscale'
              }`}
            >
              {badge.icon}
            </motion.div>
            <span className={`text-[10px] font-bold leading-tight ${badge.earned ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>
              {badge.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementGrid;
