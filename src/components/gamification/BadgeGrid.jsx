import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Target, Flame, MessageCircle, PenLine, Zap, Lock } from 'lucide-react';
import { BADGE_DEFINITIONS } from '../../services/badgeEngine';

const iconMap = {
  Footprints, Target, Flame, MessageCircle, PenLine, Zap
};

const colorMap = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
};

const BadgeGrid = ({ unlockedBadges = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {BADGE_DEFINITIONS.map((badge, idx) => {
        const isUnlocked = unlockedBadges.includes(badge.id);
        const Icon = iconMap[badge.icon] || Target;
        const colorClass = colorMap[badge.color] || colorMap.blue;

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col items-center text-center ${
              isUnlocked 
                ? `${colorClass} shadow-lg hover:-translate-y-1 hover:shadow-xl` 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60 grayscale'
            }`}
          >
            {isUnlocked && (
              <div className="absolute inset-0 bg-white/20 dark:bg-black/10 blur-xl rounded-full scale-150 transform -translate-y-1/2"></div>
            )}
            
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10 ${
              isUnlocked ? 'bg-white/50 dark:bg-black/20 backdrop-blur-sm' : 'bg-slate-200 dark:bg-slate-700'
            }`}>
              {isUnlocked ? <Icon size={24} className="fill-current opacity-80" /> : <Lock size={20} className="text-slate-400" />}
            </div>
            
            <h4 className={`font-bold text-sm relative z-10 ${isUnlocked ? '' : 'text-slate-500 dark:text-slate-400'}`}>
              {badge.name}
            </h4>
            <p className={`text-xs mt-1 relative z-10 ${isUnlocked ? 'opacity-80' : 'text-slate-400 dark:text-slate-500'}`}>
              {badge.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BadgeGrid;
