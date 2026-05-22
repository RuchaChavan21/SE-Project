import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

const XPAnimation = ({ amount, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-[100]"
        >
          <div className="bg-amber-400 text-amber-950 px-6 py-3 rounded-full font-bold text-2xl flex items-center gap-3 shadow-2xl shadow-amber-500/50 border-4 border-amber-300">
            <Trophy className="fill-current" />
            +{amount} XP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XPAnimation;
