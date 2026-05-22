import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, X, ChevronRight } from 'lucide-react';
import { generateRevisionQuiz } from '../../services/reviseEngine';
import QuizCard from '../quiz/QuizCard';
import QuizResults from '../quiz/QuizResults';

const RevisionGenerator = ({ notes, topic, onClose }) => {
  const [state, setState] = useState('generating'); // generating, empty, ready, playing, results
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const init = async () => {
      const data = await generateRevisionQuiz(notes, topic);
      if (!data) {
        setState('empty');
      } else {
        setQuizData(data);
        setState('ready');
      }
    };
    init();
  }, [notes, topic]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    const isCorrect = index === quizData.questions[currentIndex].correctIndex;
    if (isCorrect) setScore(prev => prev + 1);

    if (navigator.vibrate) {
      navigator.vibrate(isCorrect ? [50, 50, 50] : [200]);
    }

    setTimeout(() => {
      if (currentIndex < quizData.questions.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setState('results');
      }
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-50 dark:bg-slate-950 flex flex-col h-full overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[100px]"
        />
      </div>

      <header className="relative z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="font-bold text-slate-900 dark:text-slate-100">AI Revision</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <X size={20} className="text-slate-500" />
        </button>
      </header>

      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {state === 'generating' && (
            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-emerald-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Analyzing your notes...</h3>
              <p className="text-slate-500">Creating a custom quiz based strictly on what you wrote.</p>
            </motion.div>
          )}

          {state === 'empty' && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No Notes Found</h3>
              <p className="text-slate-500 mb-6">You need to take some notes before we can generate a revision quiz!</p>
              <button onClick={onClose} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium">Go Back</button>
            </motion.div>
          )}

          {state === 'ready' && (
            <motion.div key="ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Revision Ready ✨</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">{quizData.summary}</p>
              <button onClick={() => setState('playing')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                Start Revision Quiz <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {state === 'playing' && quizData && (
            <motion.div key="playing" className="w-full flex flex-col h-full justify-center">
              <div className="w-full max-w-xl mx-auto mb-8">
                <div className="flex justify-between text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">
                  <span>Question {currentIndex + 1} of {quizData.questions.length}</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-emerald-500 rounded-full" initial={{ width: `${(currentIndex / quizData.questions.length) * 100}%` }} animate={{ width: `${((currentIndex + 1) / quizData.questions.length) * 100}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>
              <QuizCard
                question={quizData.questions[currentIndex]}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                isCorrect={selectedAnswer === quizData.questions[currentIndex].correctIndex}
                direction={direction}
              />
            </motion.div>
          )}

          {state === 'results' && (
            <motion.div key="results" className="w-full">
              <QuizResults
                score={score}
                totalQuestions={quizData.questions.length}
                feedback="Fantastic! Reviewing your own notes is scientifically proven to increase retention."
                onContinue={onClose}
                onRetry={() => {
                  setScore(0);
                  setCurrentIndex(0);
                  setState('playing');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RevisionGenerator;
