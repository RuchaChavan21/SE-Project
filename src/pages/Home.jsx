import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Play, Star, Sparkles, Target, ArrowRight, BrainCircuit } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import StreakCounter from '../components/gamification/StreakCounter';

const Home = () => {
  const { student } = useStudent();
  const navigate = useNavigate();

  const suggestedTopic = "React Hooks";
  const suggestedTopicSlug = "react-hooks";

  const weakTopics = student.weakTopics && student.weakTopics.length > 0 
    ? student.weakTopics 
    : ["Quantum Superposition"]; // Fallback if none

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, {student.name || 'Scholar'}! 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">
            Ready to continue your {student.level || 'beginner'} journey?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 shadow-sm">
            <Trophy className="w-5 h-5" />
            <span className="font-bold text-sm">{student.xp || 0} XP</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => navigate(`/lesson/${suggestedTopicSlug}`)}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-2xl shadow-indigo-500/20 cursor-pointer group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Sparkles className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Recommended Next Step
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-3">{suggestedTopic}</h3>
          <p className="text-indigo-100 mb-8 text-base md:text-lg max-w-lg leading-relaxed">
            Based on your strong progress, it's time to dive into {suggestedTopic}. We've prepared personalized {student.learningStyle}-based explanations.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center shadow-lg">
            <Play className="w-4 h-4 mr-2" fill="currentColor" />
            Start Learning
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Needs Review Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="text-amber-500 w-5 h-5" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Needs Review</h3>
          </div>
          <div className="grid gap-3">
            {weakTopics.map((topic, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/lesson/${topic.replace(/\s+/g, '-').toLowerCase()}`)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-amber-400 dark:hover:border-amber-600 transition-colors cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">{topic}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review AI simplified concepts</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quiz Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-emerald-500 w-5 h-5" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Daily Challenge</h3>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-3xl p-6 h-[calc(100%-2.5rem)] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800/50 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-current" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Test your knowledge</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Take a quick 3-question quiz to earn up to 50 XP and grow your streak.
              </p>
            </div>
            <button 
              onClick={() => navigate(`/quiz/${suggestedTopicSlug}`)}
              className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              Start Quiz
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
