import React from 'react';
import { ArrowLeft, User, Flame, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LessonHeader = ({ topic, profile }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="font-semibold text-lg md:text-xl text-slate-900 dark:text-slate-100 truncate max-w-[150px] sm:max-w-[300px]">
          {topic}
        </h1>
      </div>
      
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
          <Flame className="w-4 h-4 fill-current" />
          <span className="font-bold text-sm">{profile?.streak || 0}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <Trophy className="w-4 h-4" />
          <span className="font-bold text-sm">{profile?.xp || 0} XP</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-800">
          <User className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;
