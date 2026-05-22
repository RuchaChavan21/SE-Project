import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { generateQuiz, generateAIFeedback } from '../services/quizEngine';
import { checkBadges } from '../services/badgeEngine';

import QuizCard from '../components/quiz/QuizCard';
import QuizResults from '../components/quiz/QuizResults';
import XPAnimation from '../components/gamification/XPAnimation';
import AchievementToast from '../components/gamification/AchievementToast';
import StreakCounter from '../components/gamification/StreakCounter';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, updateStudent } = useStudent();

  const rawTopic = id ? decodeURIComponent(id.replace(/-/g, ' ')) : 'Quantum Superposition';
  const topic = rawTopic.replace(/\b\w/g, l => l.toUpperCase());

  // Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('loading'); // loading, ready, playing, results
  
  // Interaction State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [direction, setDirection] = useState(1);
  
  // Gamification State
  const [xpEarned, setXpEarned] = useState(0);
  const [newBadges, setNewBadges] = useState([]);
  const [activeBadgeToast, setActiveBadgeToast] = useState(null);
  const [aiFeedback, setAiFeedback] = useState('');

  // Load Quiz
  useEffect(() => {
    const initQuiz = async () => {
      setQuizState('loading');
      try {
        const q = await generateQuiz(topic, student.level || 'beginner');
        setQuestions(q);
        setQuizState('ready');
      } catch (e) {
        console.error("Failed to generate quiz", e);
      }
    };
    initQuiz();
  }, [topic, student.level]);

  // Handle Ready Countdown
  useEffect(() => {
    if (quizState === 'ready') {
      const timer = setTimeout(() => {
        setQuizState('playing');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [quizState]);

  // Handle Answer
  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    const isCorrect = index === questions[currentIndex].correctIndex;
    if (isCorrect) setScore(prev => prev + 1);

    // Vibrate on mobile
    if (navigator.vibrate) {
      navigator.vibrate(isCorrect ? [50, 50, 50] : [200]);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        finishQuiz(score + (isCorrect ? 1 : 0));
      }
    }, 2500);
  };

  const finishQuiz = (finalScore) => {
    const percentage = Math.round((finalScore / questions.length) * 100);
    const feedback = generateAIFeedback(percentage, topic, student);
    setAiFeedback(feedback);

    let xp = 20; // base pass
    if (percentage === 100) xp = 50; // perfect score
    setXpEarned(xp);

    // Update Student Profile
    const updatedHistory = [...(student.quizHistory || []), { topic, score: percentage, date: new Date().toISOString() }];
    const updatedWeakTopics = [...(student.weakTopics || [])];
    
    if (percentage < 60 && !updatedWeakTopics.includes(topic)) {
      updatedWeakTopics.push(topic);
    } else if (percentage >= 80) {
      const index = updatedWeakTopics.indexOf(topic);
      if (index > -1) updatedWeakTopics.splice(index, 1);
    }

    const updatedProfile = {
      ...student,
      xp: (student.xp || 0) + xp,
      quizHistory: updatedHistory,
      weakTopics: updatedWeakTopics,
    };

    // Check Badges
    const unlocked = checkBadges(updatedProfile);
    if (unlocked.length > 0) {
      setNewBadges(unlocked);
      updatedProfile.badges = [...(student.badges || []), ...unlocked];
    }

    updateStudent(updatedProfile);
    setQuizState('results');
  };

  // Show sequential badge toasts
  useEffect(() => {
    if (newBadges.length > 0 && !activeBadgeToast && quizState === 'results') {
      setActiveBadgeToast(newBadges[0]);
    }
  }, [newBadges, activeBadgeToast, quizState]);

  const handleCloseToast = () => {
    setNewBadges(prev => prev.slice(1));
    setActiveBadgeToast(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative font-sans overflow-hidden">
      
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-500/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-500/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 md:p-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
        <div className="flex gap-4">
          <StreakCounter />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {quizState === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"
              />
              <p className="text-slate-500 font-medium">Generating quiz questions...</p>
            </motion.div>
          )}

          {quizState === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BrainCircuit className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Ready?</h1>
              <p className="text-xl text-slate-500 dark:text-slate-400">Let's test your understanding of {topic} 🚀</p>
            </motion.div>
          )}

          {quizState === 'playing' && questions.length > 0 && (
            <motion.div key="playing" className="w-full flex flex-col h-full justify-center">
              {/* Progress Bar */}
              <div className="w-full max-w-xl mx-auto mb-8">
                <div className="flex justify-between text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
                    initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
                    animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <QuizCard
                question={questions[currentIndex]}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                isCorrect={selectedAnswer === questions[currentIndex].correctIndex}
                direction={direction}
              />
            </motion.div>
          )}

          {quizState === 'results' && (
            <motion.div key="results" className="w-full">
              <QuizResults
                score={score}
                totalQuestions={questions.length}
                feedback={aiFeedback}
                onContinue={() => navigate('/')}
                onRetry={() => {
                  setScore(0);
                  setCurrentIndex(0);
                  setQuizState('playing');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gamification Overlays */}
      {xpEarned > 0 && quizState === 'results' && (
        <XPAnimation amount={xpEarned} onComplete={() => setXpEarned(0)} />
      )}

      {activeBadgeToast && (
        <AchievementToast badgeId={activeBadgeToast} onClose={handleCloseToast} />
      )}

    </div>
  );
};

export default Quiz;
