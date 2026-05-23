import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, PenLine, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { usePlatformSystem } from '../hooks/usePlatformSystem';
import { fetchLessonContent } from '../services/fakeAI';
import useSpeech from '../hooks/useSpeech';

import LoadingLesson from '../components/lesson/LoadingLesson';
import LessonHeader from '../components/lesson/LessonHeader';
import LessonControls from '../components/lesson/LessonControls';
import ProgressTracker from '../components/lesson/ProgressTracker';
import ExplanationCard from '../components/lesson/ExplanationCard';
import AIChatPanel from '../components/lesson/AIChatPanel';
import NotesPanel from '../components/notes/NotesPanel';
import HighlightToolbar from '../components/notes/HighlightToolbar';
import ImageDescriptionCard from '../components/accessibility/ImageDescriptionCard';
import TopicQuizModal from '../components/lesson/TopicQuizModal';
import AdaptiveFeedbackCard from '../components/lesson/AdaptiveFeedbackCard';

import confetti from 'canvas-confetti';

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, updateStudent } = useStudent();
  const { courses, completeTopic, getStudentEnrollments } = usePlatformSystem();
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  // Clean topic string from ID
  const rawTopic = id ? decodeURIComponent(id.replace(/-/g, ' ')) : 'Quantum Superposition';
  // Capitalize first letter of each word
  const topic = rawTopic.replace(/\b\w/g, l => l.toUpperCase());

  // Lesson State
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [progress, setProgress] = useState(10); // Start at 10% after loading
  const [isCompleted, setIsCompleted] = useState(false);
  const [explainAttempt, setExplainAttempt] = useState(0);

  // Settings State
  const [language, setLanguage] = useState(student.language || 'en');
  const [difficulty, setDifficulty] = useState(student.level || 'beginner');
  const [showSimplerMsg, setShowSimplerMsg] = useState(false);

  // Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Panels State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Load Content
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      stop(); // Stop any ongoing speech
      try {
        const result = await fetchLessonContent({
          topic,
          studentProfile: student,
          difficulty,
          language,
          attempt: explainAttempt
        });
        setContent(result);
        setProgress(explainAttempt > 0 ? 50 : 30); 

        // Auto TTS
        if (student.autoTTS || student.blindMode) {
          let textToRead = result.explanation;
          if (result.examples?.length) textToRead += " For example: " + result.examples.join(". ");
          speak(textToRead, language === 'en' ? 'en-US' : language);
        }
      } catch (error) {
        console.error("Failed to load lesson:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, language, difficulty, explainAttempt]);

  // Handle Explain Differently
  const handleExplainDifferently = () => {
    stop(); // stop TTS
    if (explainAttempt === 1) {
      // Auto drop difficulty
      if (difficulty === 'advanced') setDifficulty('intermediate');
      else if (difficulty === 'intermediate') setDifficulty('beginner');
      
      setShowSimplerMsg(true);
      setTimeout(() => setShowSimplerMsg(false), 4000);
      
      // Add to weak topics if struggling
      if (!student.weakTopics?.includes(topic)) {
        updateStudent({ weakTopics: [...(student.weakTopics || []), topic] });
      }
    }
    setExplainAttempt(prev => prev + 1);
  };

  // TTS Toggle
  const toggleSpeech = () => {
    if (isSpeaking) {
      stop();
    } else if (content) {
      // Build full text to read
      let textToRead = content.explanation;
      if (content.examples?.length) {
        textToRead += " For example: " + content.examples.join(". ");
      }
      if (content.summary) {
        textToRead += " Key takeaway: " + content.summary;
      }
      speak(textToRead, language === 'en' ? 'en-US' : language);
    }
  };

  // Stop speech on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  // Open Quiz Modal
  const handleReadyForQuiz = () => {
    stop();
    setIsQuizOpen(true);
  };

  const handleQuizPass = (score) => {
    setIsQuizOpen(false);
    setProgress(100);
    setIsCompleted(true);
    setQuizResult({ passed: true, score });
    
    // Update Profile
    updateStudent({
      xp: (student.xp || 0) + 20 + Math.round(score / 10), // Base XP + bonus
      completedTopics: [...new Set([...(student.completedTopics || []), topic])]
    });

    // Update Course Progress
    const studentId = student.id || 'student_456';
    const myEnrollments = getStudentEnrollments(studentId);
    
    // Naively update all enrollments containing this topic for demo purposes
    // In a real app we would know exactly which course we're in
    myEnrollments.forEach(enr => {
      completeTopic(studentId, enr.courseId, topic, score);
    });
  };

  const handleQuizFail = (score) => {
    setIsQuizOpen(false);
    setIsCompleted(true);
    setQuizResult({ passed: false, score });

    updateStudent({
      weakTopics: [...new Set([...(student.weakTopics || []), topic])]
    });
  };

  if (isLoading) {
    return <LoadingLesson />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative pb-24 md:pb-0 font-sans">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-500/20 rounded-full blur-[120px]"
        />
      </div>

      <LessonHeader topic={topic} profile={student} />
      <HighlightToolbar topic={id || 'quantum-superposition'} />
      
      <ProgressTracker 
        progress={progress} 
        text={isCompleted ? "Completed!" : "Learning in progress"} 
      />

      <div className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 py-6 relative z-10">
        <LessonControls 
          isSpeaking={isSpeaking} 
          toggleSpeech={toggleSpeech}
          language={language}
          setLanguage={setLanguage}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />

        {/* Simpler Message Toast */}
        <AnimatePresence>
          {showSimplerMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-4 py-3 rounded-2xl mb-6 flex items-center gap-2 border border-green-200 dark:border-green-800/50 shadow-sm"
            >
              <span>Let's try a simpler explanation 😊</span>
            </motion.div>
          )}
        </AnimatePresence>

        {content && (
          <>
            <ExplanationCard 
              content={content} 
              onExplainDifferently={handleExplainDifferently} 
            />
            {/* Mocked Image Description specifically for this topic or generic */}
            <ImageDescriptionCard 
              altText={`Diagram illustrating ${topic}`}
              fakeDescription={`This is an interactive diagram showing the core components of ${topic}. It highlights the main relationships visually.`}
            />
          </>
        )}

        <AnimatePresence>
          {!isCompleted ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={handleReadyForQuiz}
                className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Take Topic Quiz
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          ) : (
            quizResult && (
              <AdaptiveFeedbackCard 
                isPass={quizResult.passed} 
                score={Math.round(quizResult.score)} 
                topic={topic}
                nextTopic={content.nextTopic}
              />
            )
          )}
        </AnimatePresence>

      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/40 relative group"
          aria-label="Ask AI"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask AI Assistant
          </span>
        </motion.button>
      </div>

      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNotesOpen(true)}
          className="w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-amber-500/40 relative group"
          aria-label="Take Notes"
        >
          <PenLine size={24} />
          <span className="absolute left-full ml-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Take Notes
          </span>
        </motion.button>
      </div>

      {/* Panels Overlay */}
      <AnimatePresence>
        {(isChatOpen || isNotesOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsChatOpen(false); setIsNotesOpen(false); }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <AIChatPanel 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        topic={topic}
        profile={student}
      />
      <NotesPanel 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
        topic={topic}
      />

      {/* Quiz Modal */}
      <TopicQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        topic={topic}
        course={courses?.[0]} // Pass the first course or current course for demo
        onPass={handleQuizPass}
        onFail={handleQuizFail}
      />
    </div>
  );
};

export default Lesson;
