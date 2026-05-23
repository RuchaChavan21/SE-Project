import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, PlayCircle, BookOpen, Clock } from 'lucide-react';

const TopicNode = ({ topic, status, index, isLast, onClick }) => {
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  const statusColors = {
    completed: 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/20',
    current: 'bg-indigo-600 border-indigo-400 text-white shadow-indigo-500/40 animate-[pulse_2s_ease-in-out_infinite]',
    locked: 'bg-slate-800 border-slate-700 text-slate-400'
  };

  return (
    <div className="relative flex items-start gap-4 md:gap-6">
      {/* Connecting Line */}
      {!isLast && (
        <div className={`absolute left-6 md:left-6 top-14 bottom-[-1rem] w-1 rounded-full ${isCompleted ? 'bg-emerald-500/50' : 'bg-slate-800'}`} />
      )}

      {/* Node Icon */}
      <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 shadow-lg ${statusColors[status]}`}>
        {isCompleted && <CheckCircle2 size={24} />}
        {isCurrent && <PlayCircle size={24} className="ml-1" />}
        {isLocked && <Lock size={20} />}
      </div>

      {/* Node Content */}
      <motion.div 
        whileHover={!isLocked ? { scale: 1.02 } : {}}
        onClick={() => !isLocked && onClick(topic)}
        className={`flex-1 mb-8 rounded-2xl border p-5 transition-all ${
          isLocked 
            ? 'bg-slate-900/50 border-slate-800 opacity-70 cursor-not-allowed'
            : isCurrent 
              ? 'bg-indigo-900/20 border-indigo-500/50 cursor-pointer shadow-xl shadow-indigo-500/10'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-500/50'
        }`}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
          <h3 className={`font-bold text-lg ${isLocked ? 'text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
            Module {index + 1}: {topic.title}
          </h3>
          <span className="flex items-center w-max text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
            <Clock size={12} className="mr-1" /> {topic.estimatedTime || '30 mins'}
          </span>
        </div>
        <p className={`text-sm ${isLocked ? 'text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
          {topic.summary}
        </p>
        
        {isCurrent && (
          <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors flex items-center">
            <BookOpen size={16} className="mr-2" /> Start Module
          </button>
        )}
      </motion.div>
    </div>
  );
};

const LearningRoadmap = ({ course, enrollment, onTopicClick }) => {
  const { topics } = course;
  const completedTopics = enrollment?.completedTopics || [];

  return (
    <div className="max-w-3xl mx-auto py-8 px-2 md:px-0">
      {topics.map((topic, idx) => {
        const isCompleted = completedTopics.includes(topic.title);
        // Current is the first topic not completed
        const isCurrent = !isCompleted && (idx === 0 || completedTopics.includes(topics[idx-1].title));
        const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <TopicNode 
              topic={topic} 
              status={status} 
              index={idx} 
              isLast={idx === topics.length - 1} 
              onClick={onTopicClick}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default LearningRoadmap;
