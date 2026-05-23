import React from 'react';
import { motion } from 'framer-motion';
import { Unlock, Sparkles } from 'lucide-react';

const TopicUnlockAnimation = ({ topicName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl text-white shadow-xl shadow-indigo-500/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
      
      <motion.div 
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30"
      >
        <Unlock className="w-8 h-8 text-white" />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white rounded-full blur-xl -z-10"
        />
      </motion.div>
      
      <h3 className="text-xl font-bold mb-1 relative z-10 flex items-center gap-2">
        Topic Unlocked! <Sparkles className="w-5 h-5 text-amber-300" />
      </h3>
      <p className="text-indigo-100 text-sm relative z-10">You can now access "{topicName}"</p>
    </motion.div>
  );
};

export default TopicUnlockAnimation;
