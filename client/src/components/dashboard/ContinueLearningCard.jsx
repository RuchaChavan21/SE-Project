import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContinueLearningCard = ({ enrollment }) => {
  const navigate = useNavigate();

  if (!enrollment) return null;

  const { course, progress } = enrollment;
  const nextTopic = course?.topics?.[Math.floor((progress / 100) * course.topics.length)] || course?.topics?.[0];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl group"
    >
      <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
        <Sparkles className="w-48 h-48 text-indigo-400" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
        <div className="flex-1 w-full text-white">
          <div className="inline-flex items-center bg-indigo-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-indigo-500/30 text-indigo-200">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> AI Adapted for you
          </div>
          
          <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            {course?.title}
          </h3>
          
          <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10 max-w-md">
            <p className="text-sm text-indigo-200 mb-1 font-medium flex items-center">
              <Target className="w-4 h-4 mr-1.5 text-indigo-400" /> Next Lesson
            </p>
            <p className="text-lg font-bold text-white mb-2">{nextTopic?.title || 'Next step'}</p>
            <div className="flex gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {nextTopic?.estimatedTime || '15 mins'}</span>
              <span className="flex items-center px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                Difficulty: {course?.difficulty || 'Adaptive'}
              </span>
            </div>
          </div>

          <button 
            onClick={() => navigate(`/lesson/${course?.title.replace(/\\s+/g, '-').toLowerCase()}`)}
            className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-colors group-hover:shadow-indigo-500/50"
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Continue Learning
          </button>
        </div>

        <div className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-indigo-950 fill-none"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-indigo-400 fill-none transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">{progress}%</span>
            <span className="text-xs font-medium text-indigo-300">Completed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContinueLearningCard;
