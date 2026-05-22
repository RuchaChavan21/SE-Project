import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles } from 'lucide-react';

const messages = [
  "Analyzing your learning style...",
  "Personalizing explanations...",
  "Adapting difficulty level...",
  "Generating optimal examples..."
];

const LoadingLesson = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-indigo-500/30 dark:bg-indigo-600/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/30 border-4 border-indigo-400 dark:border-indigo-500"
        >
          <BrainCircuit className="w-16 h-16 text-white" />
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-indigo-300"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>

      <div className="h-16">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-medium text-slate-700 dark:text-slate-300"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingLesson;
