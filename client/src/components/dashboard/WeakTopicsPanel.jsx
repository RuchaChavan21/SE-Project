import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WeakTopicsPanel = ({ weakTopics }) => {
  const navigate = useNavigate();
  const topics = weakTopics && weakTopics.length > 0 ? weakTopics : ["Quantum Superposition"];

  return (
    <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Areas to Strengthen</h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
        Our AI noticed you struggled slightly with these topics. Let's review them together!
      </p>

      <div className="space-y-3">
        {topics.map((topic, i) => (
          <div key={i} className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-rose-100 dark:border-rose-800/30">
            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{topic}</span>
            <button 
              onClick={() => navigate(`/lesson/${topic.replace(/\\s+/g, '-').toLowerCase()}`)}
              className="text-xs font-bold px-3 py-1.5 bg-rose-100 dark:bg-rose-900/40 hover:bg-rose-200 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 rounded-lg flex items-center transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Revise
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakTopicsPanel;
