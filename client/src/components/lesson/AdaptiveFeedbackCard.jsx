import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdaptiveFeedbackCard = ({ isPass, score, topic, nextTopic }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border rounded-3xl p-8 text-center mt-8 shadow-sm ${
        isPass 
          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50' 
          : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50'
      }`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        isPass ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-rose-100 dark:bg-rose-900/50'
      }`}>
        {isPass ? (
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        {isPass ? 'Topic Mastered!' : 'Needs Revision'}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
        {isPass 
          ? `Incredible! You scored ${score}% and demonstrated strong understanding of ${topic}. Next topic unlocked.`
          : `You scored ${score}%. It seems some concepts in ${topic} are still a bit unclear. Let's try reviewing the material again.`
        }
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {isPass ? (
          <>
            <button 
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate(`/lesson/${nextTopic?.replace(/\\s+/g, '-').toLowerCase()}`)}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-colors"
            >
              Next Topic
              <ArrowRight size={18} />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors"
            >
              Study Later
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw size={18} />
              Revise Now
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AdaptiveFeedbackCard;
