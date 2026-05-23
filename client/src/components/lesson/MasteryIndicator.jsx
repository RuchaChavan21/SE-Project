import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MasteryIndicator = ({ score, threshold = 70 }) => {
  const isMastered = score >= threshold;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border ${
        isMastered 
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' 
          : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50'
      }`}
    >
      {isMastered ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          Mastered
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4" />
          Needs Review
        </>
      )}
      <span className="ml-1 opacity-70">({Math.round(score)}%)</span>
    </motion.div>
  );
};

export default MasteryIndicator;
