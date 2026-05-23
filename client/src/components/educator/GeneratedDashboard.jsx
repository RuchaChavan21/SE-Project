import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Network, Accessibility, Globe, Clock, Target, Languages, Award, ChevronRight, CheckCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { usePlatformSystem } from '../../hooks/usePlatformSystem';

const GeneratedDashboard = ({ data, onBack }) => {
  const { user, educatorProfile } = useUser();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Fallback to empty states if data is missing
  const safeData = data || {
    subject: "Unknown Subject",
    difficulty: "Unknown",
    topics: [],
    learningPath: [],
    keyConcepts: [],
    recommendedOrder: []
  };

  const totalTime = safeData.topics.reduce((acc, curr) => {
    const mins = parseInt(curr.estimatedTime) || 0;
    return acc + mins;
  }, 0);

  const formattedTime = totalTime > 60 
    ? `${(totalTime / 60).toFixed(1)} Hours` 
    : `${totalTime || 0} Mins`;

  const { createCourse } = usePlatformSystem();

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      createCourse({
        title: safeData.subject,
        description: `Auto-generated course for ${safeData.subject}`,
        roadmap: safeData.learningPath,
        topics: safeData.topics,
        difficulty: safeData.difficulty,
        duration: formattedTime
      }, user?.id || 'teacher_123', educatorProfile?.name || 'Prof. AI');

      setIsPublished(true);
      setTimeout(() => {
        onBack(); // go back to dashboard
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Error publishing course.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto space-y-8 pb-12"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{safeData.subject} Module Generated ✨</h1>
          <p className="text-indigo-200">AI Learning Readiness: <span className="font-bold text-emerald-400">100%</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700">
            Cancel
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing || isPublished}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center ${isPublished ? 'bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
          >
            {isPublished ? <><CheckCircle className="w-4 h-4 mr-2" /> Published!</> : isPublishing ? 'Publishing...' : 'Publish Course'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: <BookOpen className="text-blue-400"/>, label: "Total Topics", value: `${safeData.topics.length} Modules` },
          { icon: <Clock className="text-purple-400"/>, label: "Est. Learning Time", value: formattedTime },
          { icon: <Globe className="text-emerald-400"/>, label: "Languages", value: "4 Supported" },
          { icon: <Accessibility className="text-amber-400"/>, label: "Accessibility", value: "A11y Ready" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-slate-800 rounded-xl">{stat.icon}</div>
              <div>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Extracted Topics */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-indigo-400" />
            Extracted Topics
          </h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 max-h-[400px] overflow-y-auto">
            {safeData.topics.map((topic, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex flex-col p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-colors cursor-default gap-2"
              >
                <div className="flex justify-between items-start">
                  <span className="text-slate-200 font-bold">{topic.title}</span>
                  <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">{topic.estimatedTime}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{topic.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Adaptive Learning Paths */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Network className="w-5 h-5 mr-2 text-purple-400" />
            Adaptive Learning Pathways
          </h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-hidden relative min-h-[400px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />
            
            <div className="space-y-6 relative z-10">
              {safeData.learningPath.map((path, i) => {
                const colorMatches = [
                  "from-blue-500 to-cyan-500",
                  "from-indigo-500 to-purple-500",
                  "from-purple-500 to-pink-500",
                  "from-pink-500 to-rose-500"
                ];
                const color = colorMatches[i % colorMatches.length];

                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`mt-1 w-3 h-3 rounded-full bg-gradient-to-r ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)] shrink-0`} />
                    <div className="flex-1 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-1">{path.level} Path</h4>
                      <p className="text-sm text-slate-400">{path.description}</p>
                      <div className="mt-3 flex gap-2">
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 font-medium border border-slate-700">{path.topicsIncluded} Topics</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Multilingual Support */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Languages className="w-5 h-5 mr-2 text-emerald-400" />
            Multilingual Support Generated
          </h3>
          <div className="flex flex-wrap gap-3">
            {['English', 'Hindi', 'Marathi', 'Tamil'].map((lang, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                {lang}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">AI has fully translated text and generated localized audio scripts.</p>
        </div>

        {/* Accessibility Readiness */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Accessibility className="w-5 h-5 mr-2 text-amber-400" />
            Accessibility Optimizations
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mr-2" />
              Image alt-text and descriptions generated
            </li>
            <li className="flex items-center text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mr-2" />
              Audio-first narration formatted
            </li>
            <li className="flex items-center text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-amber-400 mr-2" />
              Screen-reader ARIA tags applied to quizzes
            </li>
          </ul>
        </div>
      </div>

    </motion.div>
  );
};

export default GeneratedDashboard;
