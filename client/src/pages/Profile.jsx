import React from 'react';
import { useStudent } from '../context/StudentContext';
import { useUser } from '../context/UserContext';
import { Flame, Trophy, BookOpen, Clock, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import BadgeGrid from '../components/gamification/BadgeGrid';
import NotesSection from '../components/notes/NotesSection';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { student, updateStudent } = useStudent();
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    // Force a reload to return to landing page smoothly
    window.location.href = '/';
  };

  const stats = [
    { label: 'Day Streak', value: student.streak || 0, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { label: 'Total XP', value: student.xp || 0, icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { label: 'Topics', value: student.completedTopics?.length || 0, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: 'Quizzes', value: student.quizHistory?.length || 0, icon: CheckCircle2, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      
      {/* Header Profile Card */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/10 dark:to-violet-500/10" />
        
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-slate-900 bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl">
          {student.name?.charAt(0)?.toUpperCase() || 'S'}
        </div>
        
        <div className="relative flex-1">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{student.name || 'Student'}</h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium capitalize">
              {student.level || 'Beginner'}
            </span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium capitalize">
              {student.language === 'en' ? 'English' : student.language}
            </span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium capitalize">
              {student.learningStyle || 'Examples'} Style
            </span>
          </div>
        </div>
        
        <div className="relative flex md:flex-col gap-2">
          <button className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors" aria-label="Settings">
            <Settings size={20} />
          </button>
          <button onClick={handleSignOut} className="p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-colors" aria-label="Sign out">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center text-center group hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Achievements</h3>
          <span className="text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {student.badges?.length || 0} Unlocked
          </span>
        </div>
        <BadgeGrid unlockedBadges={student.badges || []} />
      </div>

      <NotesSection />

    </div>
  );
};

export default Profile;
