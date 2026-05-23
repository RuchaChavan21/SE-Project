import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, BrainCircuit, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const TopicQuizModal = ({ isOpen, onClose, topic, course, onPass, onFail }) => {
  if (!isOpen) return null;

  // Find quiz data from the course topic
  const topicData = course?.topics?.find(t => t.title.toLowerCase() === topic.toLowerCase()) || {};
  const quizQuestions = topicData.quiz || [
    {
      question: "What is a key concept of " + topic + "?",
      options: ["Concept A", "Concept B", "Concept C", "Concept D"],
      answer: "Concept A",
      explanation: "Concept A is the fundamental building block."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  const handleSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) setScore(s => s + 1);
    
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentQuestion.answer ? 1 : 0);
      const passPercentage = (finalScore / quizQuestions.length) * 100;
      
      if (passPercentage >= 70) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#10b981', '#f59e0b']
        });
        setTimeout(() => onPass(passPercentage), 1500);
      } else {
        setTimeout(() => onFail(passPercentage), 1500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {!isFinished ? (
          <>
            {/* Header */}
            <div className="bg-indigo-600 text-white p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-wide uppercase">Knowledge Check</span>
                </div>
                <div className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {quizQuestions.length}
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold leading-tight">{currentQuestion.question}</h2>
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-800 w-full">
                <motion.div 
                  className="h-full bg-emerald-400" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-3">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isCorrectAnswer = opt === currentQuestion.answer;
                  
                  let stateClass = "border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200";
                  
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      stateClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200";
                    } else if (isSelected && !isCorrectAnswer) {
                      stateClass = "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200";
                    } else {
                      stateClass = "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 opacity-50";
                    }
                  } else if (isSelected) {
                    stateClass = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 ring-2 ring-indigo-500/20";
                  }

                  return (
                    <button
                      key={i}
                      disabled={isSubmitted}
                      onClick={() => setSelectedOption(opt)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-medium flex items-center justify-between group ${stateClass}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isSubmitted && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation area */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                  >
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">Explanation:</span>
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <button 
                onClick={onClose}
                className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Close
              </button>
              
              {!isSubmitted ? (
                <button
                  disabled={!selectedOption}
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20 disabled:shadow-none"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                >
                  {currentIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
             <Sparkles className="w-16 h-16 text-indigo-500 mb-6 animate-pulse" />
             <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Analyzing Results...</h2>
             <p className="text-slate-500 dark:text-slate-400">Our AI is updating your mastery profile.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TopicQuizModal;
