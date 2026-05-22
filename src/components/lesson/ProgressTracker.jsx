import React from 'react';
import { motion } from 'framer-motion';

const ProgressTracker = ({ progress, text }) => {
  return (
    <div className="px-4 py-2 flex items-center gap-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="flex-1">
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
          {Math.round(progress)}%
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline-block whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
};

export default ProgressTracker;
