import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, BookOpen } from 'lucide-react';

const TypewriterText = ({ text, onComplete, speed = 15 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <span>{displayed}</span>;
};

const ExplanationCard = ({ 
  content, 
  onExplainDifferently 
}) => {
  const [isTyping, setIsTyping] = useState(true);

  // Re-trigger typing when content changes
  useEffect(() => {
    setIsTyping(true);
  }, [content]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/50 dark:border-slate-800/50 mb-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-32 bg-indigo-400/5 dark:bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />
      
      <div className="relative z-10 space-y-6">
        {/* Key Terms */}
        {content?.keyTerms?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {content.keyTerms.map((term, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-indigo-100 dark:border-indigo-800/50">
                <BookOpen size={14} />
                {term}
              </span>
            ))}
          </motion.div>
        )}

        {/* Explanation */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
            {isTyping ? (
              <TypewriterText text={content.explanation} onComplete={() => setIsTyping(false)} />
            ) : (
              content.explanation
            )}
          </p>
        </div>

        {/* Examples / Summary */}
        <AnimatePresence>
          {!isTyping && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              {content.examples?.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                  <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    <Sparkles size={18} className="text-amber-500" />
                    Example
                  </h4>
                  <ul className="space-y-2">
                    {content.examples.map((ex, idx) => (
                      <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.summary && (
                <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl p-5 border border-indigo-100/50 dark:border-indigo-800/30">
                  <p className="text-indigo-900 dark:text-indigo-100 font-medium">
                    <span className="font-bold mr-2">💡 Key Takeaway:</span>
                    {content.summary}
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={onExplainDifferently}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition-colors"
                >
                  <RefreshCw size={16} />
                  Explain differently
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExplanationCard;
