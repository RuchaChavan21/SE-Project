import React from 'react';
import { Volume2, VolumeX, Settings2, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LessonControls = ({ 
  isSpeaking, 
  toggleSpeech, 
  language, 
  setLanguage, 
  difficulty, 
  setDifficulty 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleSpeech}
        className={`p-2.5 rounded-xl border flex items-center gap-2 transition-colors ${
          isSpeaking 
            ? 'bg-indigo-600 border-indigo-600 text-white' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
        }`}
        aria-label="Toggle Text to Speech"
      >
        {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-2">
        <Globe2 size={18} className="text-slate-400 ml-2" />
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent text-slate-700 dark:text-slate-300 py-2.5 px-3 focus:outline-none cursor-pointer text-sm font-medium"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-2">
        <Settings2 size={18} className="text-slate-400 ml-2" />
        <select 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-transparent text-slate-700 dark:text-slate-300 py-2.5 px-3 focus:outline-none cursor-pointer text-sm font-medium"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Moderate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};

export default LessonControls;
