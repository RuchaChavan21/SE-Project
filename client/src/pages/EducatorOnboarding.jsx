import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { BrainCircuit, BookOpen, GraduationCap, ChevronRight, CheckCircle2, Target } from 'lucide-react';

const EducatorOnboarding = () => {
  const { educatorProfile, updateEducatorProfile } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    subjects: [],
    grades: [],
    goals: []
  });

  const subjectsList = ["Physics", "Chemistry", "Biology", "Mathematics", "History", "Computer Science", "Languages"];
  const gradesList = ["6–12", "College", "Competitive Exams"];
  const goalsList = [
    "Personalized teaching", 
    "Quiz generation", 
    "Student analytics", 
    "Accessibility support", 
    "Adaptive learning paths"
  ];

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const list = prev[field];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...list, value] };
      }
    });
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleComplete = () => {
    updateEducatorProfile({
      ...formData,
      dashboardReady: true
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-white">What should students call you?</h2>
            <input 
              type="text" 
              placeholder="e.g. Professor Smith" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              autoFocus
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Which institution are you part of?</h2>
            <input 
              type="text" 
              placeholder="School, College, or Organization" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
              autoFocus
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">What subjects do you teach?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {subjectsList.map(subject => (
                <button
                  key={subject}
                  onClick={() => toggleSelection('subjects', subject)}
                  className={`p-4 rounded-xl text-left border transition-all ${formData.subjects.includes(subject) ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                >
                  <BookOpen className={`w-5 h-5 mb-2 ${formData.subjects.includes(subject) ? 'text-purple-400' : 'text-slate-500'}`} />
                  <span className="font-medium">{subject}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Which grades do you teach?</h2>
            <div className="flex flex-col gap-4">
              {gradesList.map(grade => (
                <button
                  key={grade}
                  onClick={() => toggleSelection('grades', grade)}
                  className={`p-5 rounded-xl text-left border flex items-center justify-between transition-all ${formData.grades.includes(grade) ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                >
                  <div className="flex items-center">
                    <GraduationCap className={`w-6 h-6 mr-4 ${formData.grades.includes(grade) ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="text-lg font-medium">{grade}</span>
                  </div>
                  {formData.grades.includes(grade) && <CheckCircle2 className="w-6 h-6 text-indigo-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">What would you like AI to help with?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalsList.map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleSelection('goals', goal)}
                  className={`p-5 rounded-xl text-left border flex items-center transition-all ${formData.goals.includes(goal) ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                >
                  <Target className={`w-5 h-5 mr-3 shrink-0 ${formData.goals.includes(goal) ? 'text-pink-400' : 'text-slate-500'}`} />
                  <span className="font-medium">{goal}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-full h-full flex items-center justify-center shadow-2xl">
                <BrainCircuit className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Your AI Educator Workspace is Ready ✨</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto">We've personalized your dashboard and prepared the AI assistant for your classes.</p>
            <button 
              onClick={handleComplete}
              className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl text-lg hover:scale-105 transition-transform"
            >
              Enter Workspace
            </button>
          </motion.div>
        );
      default: return null;
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return formData.institution.trim().length > 0;
    if (step === 3) return formData.subjects.length > 0;
    if (step === 4) return formData.grades.length > 0;
    if (step === 5) return formData.goals.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#06080F] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        {step < 6 && (
          <div className="mb-12">
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
            <p className="text-slate-400 text-sm mt-3 font-medium">Step {step} of 5</p>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Navigation */}
        {step < 6 && (
          <div className="mt-12 flex justify-between">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-slate-300 font-medium hover:text-white transition-colors"
              >
                Back
              </button>
            ) : <div />}
            
            <button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 bg-purple-600 disabled:opacity-50 hover:bg-purple-500 text-white font-medium rounded-xl transition-all flex items-center"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorOnboarding;
