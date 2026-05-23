import React from 'react';
import { MessageSquare, FileText, CheckSquare, Zap } from 'lucide-react';

const RecentActivityFeed = () => {
  const activities = [
    { type: 'note', title: 'Created a Note on CPU Scheduling', time: '2 hours ago', icon: <FileText className="w-4 h-4" />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { type: 'quiz', title: 'Scored 90% in OS Basics Quiz', time: 'Yesterday', icon: <CheckSquare className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { type: 'chat', title: 'Asked AI about Deadlocks', time: 'Yesterday', icon: <MessageSquare className="w-4 h-4" />, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
    { type: 'lesson', title: 'Completed Process Management', time: '2 days ago', icon: <Zap className="w-4 h-4" />, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Recent Activity</h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
        {activities.map((act, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={`flex items-center justify-center w-9 h-9 rounded-full border-4 border-white dark:border-slate-900 z-10 shadow ${act.color}`}>
              {act.icon}
            </div>
            
            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 ml-4 md:ml-0 md:group-even:ml-[2.5rem] md:group-odd:mr-[2.5rem] shadow-sm">
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{act.title}</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
