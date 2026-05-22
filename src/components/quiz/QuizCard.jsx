import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const QuizCard = ({ 
  question, 
  onAnswer, 
  selectedAnswer, 
  isAnswered, 
  isCorrect, 
  direction 
}) => {
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    })
  };

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full max-w-xl mx-auto"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-800/50">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showCorrect = isAnswered && index === question.correctIndex;
              const showWrong = isAnswered && isSelected && !isCorrect;

              let buttonClass = "w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 font-medium text-lg relative overflow-hidden ";
              
              if (!isAnswered) {
                buttonClass += "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300";
              } else if (showCorrect) {
                buttonClass += "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
              } else if (showWrong) {
                buttonClass += "bg-red-50 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-300";
              } else {
                buttonClass += "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-50 text-slate-500";
              }

              return (
                <motion.button
                  key={index}
                  disabled={isAnswered}
                  onClick={() => onAnswer(index)}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                      </motion.div>
                    )}
                    {showWrong && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <XCircle className="text-red-500 dark:text-red-400" size={24} />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                className={`p-5 rounded-2xl ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}
              >
                <p className="font-medium text-sm md:text-base leading-relaxed">
                  <span className="font-bold mr-2">
                    {isCorrect ? 'Awesome! 🎯' : 'Not quite. 🤔'}
                  </span>
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizCard;
