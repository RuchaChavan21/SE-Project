import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

const AchievementToast = ({ badgeId, onClose }) => {
  // Normally we would lookup the full badge details from BADGE_DEFINITIONS
  // but for simplicity in the toast we'll just show a generic achievement or pass the full object.
  // Assuming badge is passed or we just say "New Badge Unlocked!"

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm"
      >
        <div className="bg-indigo-600 text-white rounded-2xl p-4 shadow-2xl shadow-indigo-500/40 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shrink-0">
            <Trophy className="text-yellow-300 fill-current" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-indigo-100 uppercase tracking-wider mb-0.5">Achievement Unlocked!</h4>
            <p className="font-semibold text-lg">{badgeId ? badgeId.replace(/_/g, ' ') : 'New Badge!'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-indigo-500 rounded-full transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementToast;
