import React from 'react';
// Trigger HMR
import { motion } from 'framer-motion';
import { GraduationCap, Presentation, Sparkles, BookOpen, BrainCircuit, Accessibility, LineChart, Globe } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LandingPage = () => {
  const { selectRole } = useUser();

  return (
    <div className="min-h-screen bg-[#06080F] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl w-full z-10 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium text-slate-300">Next-Generation AI Education</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">EduPath AI</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            A fully personalized, hyper-accessible AI ecosystem empowering students to learn natively and educators to teach powerfully.
          </motion.p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <motion.button 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => selectRole('student')}
            className="group relative cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-indigo-500/50 rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative h-full bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">I am a Student</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">Experience adaptive learning paths, real-time AI tutoring, native language support, and comprehensive accessibility tools.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <BookOpen className="w-5 h-5 text-indigo-400 mr-3" /> Personalized Quizzes
                </div>
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <BrainCircuit className="w-5 h-5 text-indigo-400 mr-3" /> 24/7 AI Tutor
                </div>
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <Accessibility className="w-5 h-5 text-indigo-400 mr-3" /> Blind/Low Vision Modes
                </div>
              </div>

              <div className="w-full py-4 text-center rounded-xl bg-indigo-500/10 text-indigo-300 font-semibold group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                Continue as Student
              </div>
            </div>
          </motion.button>

          {/* Educator Card */}
          <motion.button 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => selectRole('educator')}
            className="group relative cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-purple-500/50 rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative h-full bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-6">
                <Presentation className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">I am an Educator</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">Upload materials to auto-generate curriculums, transform content for accessibility, and analyze student engagement.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <Sparkles className="w-5 h-5 text-purple-400 mr-3" /> AI Curriculum Generation
                </div>
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <LineChart className="w-5 h-5 text-purple-400 mr-3" /> Classroom Insights
                </div>
                <div className="flex items-center text-sm font-medium text-slate-300">
                  <Globe className="w-5 h-5 text-purple-400 mr-3" /> Auto-Translation
                </div>
              </div>

              <div className="w-full py-4 text-center rounded-xl bg-purple-500/10 text-purple-300 font-semibold group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                Continue as Educator
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
