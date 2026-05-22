import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import ProgressBar from '../components/onboarding/ProgressBar';
import StepCard from '../components/onboarding/StepCard';
import AnimatedOptionCard from '../components/onboarding/AnimatedOptionCard';
import { 
  ArrowRight, ArrowLeft, BookOpen, Lightbulb, Headphones, 
  Eye, TrendingUp, Activity, Zap, Volume2, 
  Accessibility, Globe, Sparkles, Bot
} from 'lucide-react';

const steps = [
  { id: 'name', title: "What should we call you?" },
  { id: 'language', title: "What language do you prefer?" },
  { id: 'learningStyle', title: "How do you learn best?" },
  { id: 'level', title: "What's your current level?" },
  { id: 'accessibility', title: "Any accessibility preferences?" },
  { id: 'success', title: "All set!" }
];

const languageOptions = [
  { id: 'en', title: 'English', icon: Globe },
  { id: 'hi', title: 'Hindi', icon: Globe },
  { id: 'mr', title: 'Marathi', icon: Globe },
  { id: 'ta', title: 'Tamil', icon: Globe },
  { id: 'te', title: 'Telugu', icon: Globe }
];

const learningStyleOptions = [
  { id: 'reading', title: 'Reading detailed explanations', description: 'In-depth articles and text-based guides', icon: BookOpen },
  { id: 'examples', title: 'Examples & analogies', description: 'Real-world comparisons and practical examples', icon: Lightbulb },
  { id: 'audio', title: 'Audio learning', description: 'Listen to lessons and spoken explanations', icon: Headphones },
  { id: 'visual', title: 'Visual diagrams', description: 'Charts, mind-maps, and visual representations', icon: Eye }
];

const levelOptions = [
  { id: 'beginner', title: 'Beginner', description: 'Just starting out, learning the basics', icon: Activity },
  { id: 'intermediate', title: 'Intermediate', description: 'Have some knowledge, want to dig deeper', icon: TrendingUp },
  { id: 'advanced', title: 'Advanced', description: 'Experienced, looking for expert insights', icon: Zap }
];

const accessibilityOptions = [
  { id: 'none', title: 'None', description: 'Standard experience', icon: Accessibility },
  { id: 'screen_reader', title: 'Screen reader user', description: 'Optimized for VoiceOver, TalkBack, etc.', icon: Volume2 },
  { id: 'low_vision', title: 'Low vision', description: 'High contrast and larger text', icon: Eye },
  { id: 'hard_of_hearing', title: 'Hard of hearing', description: 'Captions and visual cues for audio', icon: EarIconFallback }
];

// Fallback if Ear icon isn't available
function EarIconFallback(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1c0-4 6-4 6-10a4 4 0 1 0-8 0c0 1.6 1.4 2.5 2 3l-1.5 1.5C6.8 11.5 6 10.2 6 8.5z"/>
    </svg>
  );
}

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [formData, setFormData] = useState({
    name: '',
    language: 'en',
    learningStyle: 'examples',
    level: 'beginner',
    accessibilityNeeds: 'none',
  });

  const { completeOnboarding } = useStudent();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === steps.length - 2) {
      // Transitioning to success screen
      setDirection(1);
      setCurrentStep(prev => prev + 1);
      
      // Save and redirect after success animation
      setTimeout(() => {
        completeOnboarding(formData);
        navigate('/');
      }, 3000);
    } else if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    if (currentStep === 0) return formData.name.trim().length > 0;
    return true;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.1, 0.2],
            x: [0, -50, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-violet-400/20 dark:bg-violet-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      {currentStep < steps.length - 1 && (
        <header className="w-full max-w-3xl mx-auto px-6 py-8 relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`p-2 rounded-full transition-colors ${
                currentStep === 0 
                  ? 'opacity-0 cursor-default' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="font-semibold text-sm text-slate-500 dark:text-slate-400">
              Step {currentStep + 1} of {steps.length - 1}
            </div>
            <button
              onClick={() => {
                completeOnboarding(formData);
                navigate('/');
              }}
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
            >
              Skip
            </button>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={steps.length - 1} />
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 relative z-10">
        <div className="w-full relative h-[60vh] md:h-[50vh]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <StepCard stepKey={currentStep} direction={direction}>
              {/* Step 1: Name */}
              {currentStep === 0 && (
                <div className="flex flex-col h-full justify-center space-y-8">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl text-indigo-600 dark:text-indigo-400">
                      <Bot size={32} />
                    </div>
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                      Let's personalize your learning journey
                    </p>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <TypewriterText text="What should we call you?" />
                  </h1>
                  <div className="pt-8">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Enter your name"
                      className="w-full text-2xl p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && isStepValid()) handleNext();
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Language */}
              {currentStep === 1 && (
                <div className="flex flex-col h-full space-y-8 pb-20 overflow-y-auto hide-scrollbar">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Hi {formData.name}, what language do you prefer?
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {languageOptions.map((opt) => (
                      <AnimatedOptionCard
                        key={opt.id}
                        title={opt.title}
                        icon={opt.icon}
                        selected={formData.language === opt.id}
                        onClick={() => updateFormData('language', opt.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Learning Style */}
              {currentStep === 2 && (
                <div className="flex flex-col h-full space-y-8 pb-20 overflow-y-auto hide-scrollbar">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    How do you learn best?
                  </h1>
                  <p className="text-lg text-slate-500 dark:text-slate-400">
                    We'll tailor the curriculum to match your style.
                  </p>
                  <div className="flex flex-col gap-4">
                    {learningStyleOptions.map((opt) => (
                      <AnimatedOptionCard
                        key={opt.id}
                        title={opt.title}
                        description={opt.description}
                        icon={opt.icon}
                        selected={formData.learningStyle === opt.id}
                        onClick={() => updateFormData('learningStyle', opt.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Level */}
              {currentStep === 3 && (
                <div className="flex flex-col h-full space-y-8 pb-20 overflow-y-auto hide-scrollbar">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    What's your current level?
                  </h1>
                  <div className="flex flex-col gap-4">
                    {levelOptions.map((opt) => (
                      <AnimatedOptionCard
                        key={opt.id}
                        title={opt.title}
                        description={opt.description}
                        icon={opt.icon}
                        selected={formData.level === opt.id}
                        onClick={() => updateFormData('level', opt.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Accessibility */}
              {currentStep === 4 && (
                <div className="flex flex-col h-full space-y-8 pb-20 overflow-y-auto hide-scrollbar">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Any accessibility preferences?
                  </h1>
                  <div className="flex flex-col gap-4">
                    {accessibilityOptions.map((opt) => (
                      <AnimatedOptionCard
                        key={opt.id}
                        title={opt.title}
                        description={opt.description}
                        icon={opt.icon}
                        selected={formData.accessibilityNeeds === opt.id}
                        onClick={() => updateFormData('accessibilityNeeds', opt.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Success Screen */}
              {currentStep === 5 && (
                <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/30 relative"
                  >
                    <Sparkles className="text-white w-16 h-16 absolute top-4 right-4" />
                    <Bot className="text-white w-16 h-16" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                      Your AI learning companion is ready ✨
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400">
                      Crafting your personalized curriculum...
                    </p>
                  </motion.div>
                </div>
              )}
            </StepCard>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer / Actions */}
      {currentStep < steps.length - 1 && (
        <footer className="w-full max-w-3xl mx-auto px-6 py-8 relative z-10 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950">
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 ${
              isStepValid()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 2 ? "Complete Setup" : "Continue"}
            <ArrowRight size={24} />
          </button>
        </footer>
      )}

      {/* Hide scrollbar styles for cleaner look */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
