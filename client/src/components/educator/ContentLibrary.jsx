import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Clock, BrainCircuit, PlayCircle } from 'lucide-react';

const ContentLibrary = ({ onUploadNew }) => {
  const libraryFiles = [
    { name: "Thermodynamics Intro", topics: 3, readiness: "92%", engagement: "High", date: "2 days ago", type: "pdf" },
    { name: "Organic Chemistry 101", topics: 5, readiness: "88%", engagement: "Medium", date: "5 days ago", type: "docx" }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryFiles.map((file, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-slate-500">{file.date}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">{file.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><BrainCircuit className="w-4 h-4 mr-2"/> Topics Extracted</span>
                <span className="text-white font-medium">{file.topics}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Users className="w-4 h-4 mr-2"/> Engagement Est.</span>
                <span className="text-white font-medium">{file.engagement}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center"><Clock className="w-4 h-4 mr-2"/> AI Readiness</span>
                <span className="text-emerald-400 font-bold">{file.readiness}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContentLibrary;
