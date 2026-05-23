import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';

const AIRecommendations = ({ student }) => {
  const recommendations = [
    {
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      title: "Learning Style Match",
      desc: `You perform 30% better with ${student.learningStyle} explanations. We've adjusted your upcoming lessons.`,
      color: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800/50"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      title: "Fast Learner",
      desc: "You're progressing faster than 85% of students in your cohort. Keep the momentum going!",
      color: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800/50"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
          AI Insights <Sparkles className="w-4 h-4 ml-2 text-indigo-500" />
        </h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-2xl border ${rec.border} ${rec.color} flex gap-4`}
          >
            <div className="flex-shrink-0 mt-0.5">{rec.icon}</div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{rec.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rec.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
