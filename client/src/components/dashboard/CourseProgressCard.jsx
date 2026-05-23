import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseProgressCard = ({ enrollment }) => {
  const navigate = useNavigate();
  const { course, progress, completedTopics } = enrollment;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between shadow-sm group"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/60 transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg">
            {progress}% Done
          </span>
        </div>
        
        <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
          {course?.title || 'Unknown Course'}
        </h4>
        
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-5">
          <span className="flex items-center"><Target className="w-3.5 h-3.5 mr-1" /> {completedTopics?.length || 0}/{course?.topics?.length || 0} Topics</span>
          <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {course?.duration || 'Ongoing'}</span>
        </div>
        
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full"
          />
        </div>
      </div>
      
      <button 
        onClick={() => navigate(`/lesson/${course?.title.replace(/\\s+/g, '-').toLowerCase()}`)}
        className="w-full py-2.5 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default CourseProgressCard;
