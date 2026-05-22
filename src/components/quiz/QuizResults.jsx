import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, ChevronRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CircularProgress = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-100 dark:text-slate-800"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="text-indigo-600 dark:text-indigo-500"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="text-2xl font-bold text-slate-900 dark:text-slate-100"
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
};

const QuizResults = ({ score, totalQuestions, feedback, onContinue, onRetry }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  React.useEffect(() => {
    if (percentage === 100) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899']
        });
      }, 500);
    }
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 border border-slate-200/50 dark:border-slate-800/50 text-center"
    >
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quiz Complete!</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Here's how you did</p>

      <CircularProgress percentage={percentage} />

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-800/30">
          <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">+{percentage === 100 ? 50 : 20}</div>
          <div className="text-xs text-amber-700/70 dark:text-amber-500/70 uppercase tracking-wider font-semibold">XP Earned</div>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
          <Target className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{score}/{totalQuestions}</div>
          <div className="text-xs text-indigo-700/70 dark:text-indigo-500/70 uppercase tracking-wider font-semibold">Correct</div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8">
        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          <span className="inline-block mr-2 text-indigo-500"><Zap size={18} className="inline fill-current" /></span>
          {feedback}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onContinue}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        >
          Continue Learning
          <ChevronRight size={20} />
        </button>
        {percentage < 100 && (
          <button
            onClick={onRetry}
            className="w-full py-4 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizResults;
