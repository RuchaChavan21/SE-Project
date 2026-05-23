import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Clock, BrainCircuit, PlayCircle, BarChart3, TrendingUp } from 'lucide-react';
import { usePlatformSystem } from '../../hooks/usePlatformSystem';
import { useUser } from '../../context/UserContext';

const ContentLibrary = ({ onUploadNew }) => {
  const { user } = useUser();
  const { getEducatorAnalytics } = usePlatformSystem();
  
  const educatorId = user?.id || 'teacher_123';
  const analytics = getEducatorAnalytics(educatorId);

  // If no analytics (e.g. state issues), fallback to empty
  const libraryFiles = analytics?.courses || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">My Content Library</h2>
          <p className="text-slate-400">Manage your uploaded materials and generated learning paths.</p>
        </div>
        <button 
          onClick={onUploadNew}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center"
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          Process New Content
        </button>
      </div>

      {/* Analytics Overview Panels */}
      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
            <BarChart3 className="w-5 h-5 text-indigo-400 mb-2" />
            <span className="text-2xl font-bold text-white">{analytics.totalCourses}</span>
            <span className="text-xs text-slate-500">Published</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
            <Users className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-white">{analytics.totalStudents}</span>
            <span className="text-xs text-slate-500">Total Students</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-400 mb-2" />
            <span className="text-2xl font-bold text-white">{analytics.avgProgress}%</span>
            <span className="text-xs text-slate-500">Avg Completion</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-rose-400 mb-2" />
            <span className="text-2xl font-bold text-white">{analytics.activeStudents}</span>
            <span className="text-xs text-slate-500">Active Learners</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryFiles.map((file, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
            {/* Fake progress backdrop for visual appeal */}
            <div className="absolute bottom-0 left-0 h-1 bg-indigo-500/50" style={{ width: `${Math.random() * 40 + 20}%` }} />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                {new Date(file.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors relative z-10">{file.title}</h3>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><BrainCircuit className="w-4 h-4 mr-2"/> Topics</span>
                <span className="text-white font-medium">{file.topics?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Users className="w-4 h-4 mr-2"/> Enrolled</span>
                <span className="text-white font-medium">{file.studentCount || 0} students</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Clock className="w-4 h-4 mr-2"/> Duration</span>
                <span className="text-emerald-400 font-bold">{file.estimatedDuration || "N/A"}</span>
              </div>
            </div>
          </div>
        ))}
        {libraryFiles.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-3xl">
            No courses uploaded yet. Process a PDF to get started!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentLibrary;
