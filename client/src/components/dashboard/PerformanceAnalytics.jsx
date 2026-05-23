import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Trophy, CheckCircle, Clock } from 'lucide-react';

const PerformanceAnalytics = ({ student, enrollments }) => {
  const stats = [
    { label: "Avg Score", value: "92%", icon: <BarChart3 className="w-4 h-4" />, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Total XP", value: student.xp || 0, icon: <Trophy className="w-4 h-4" />, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { label: "Topics Done", value: student.completedTopics?.length || 0, icon: <CheckCircle className="w-4 h-4" />, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "Hours Learnt", value: "14.5", icon: <Clock className="w-4 h-4" />, color: "text-violet-600", bg: "bg-violet-100 dark:bg-violet-900/30" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
        >
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{stat.value}</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default PerformanceAnalytics;
