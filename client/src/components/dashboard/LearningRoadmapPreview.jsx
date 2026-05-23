import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock, Map } from 'lucide-react';

const LearningRoadmapPreview = ({ enrollment }) => {
  if (!enrollment || !enrollment.course) return null;

  const { course, completedTopics } = enrollment;
  
  // Show up to 4 topics for the mini roadmap
  const topicsToShow = course.topics?.slice(0, 4) || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
          <Map className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Learning Path</h3>
      </div>

      <div className="relative flex-1 flex flex-col justify-center">
        {/* Connecting Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
        
        <div className="space-y-6">
          {topicsToShow.map((topic, index) => {
            const isCompleted = completedTopics?.includes(topic.title);
            const isCurrent = !isCompleted && (index === 0 || completedTopics?.includes(topicsToShow[index - 1]?.title));
            const isLocked = !isCompleted && !isCurrent;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-4 ${isLocked ? 'opacity-50' : ''}`}
              >
                <div className="relative z-10 flex-shrink-0 bg-white dark:bg-slate-900 py-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 fill-emerald-100 dark:fill-emerald-900/20" />
                  ) : isCurrent ? (
                    <div className="relative flex items-center justify-center w-8 h-8">
                      <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20" />
                      <Circle className="w-8 h-8 text-indigo-500 fill-indigo-100 dark:fill-indigo-900/30 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${
                    isCompleted ? 'text-slate-700 dark:text-slate-300' :
                    isCurrent ? 'text-indigo-600 dark:text-indigo-400' :
                    'text-slate-500 dark:text-slate-500'
                  }`}>
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                    {topic.estimatedTime || '20 mins'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmapPreview;
