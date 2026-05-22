import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, File, Video, BrainCircuit } from 'lucide-react';

const UploadDropzone = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startMockUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      startMockUpload(e.target.files[0]);
    }
  };

  const startMockUpload = (file) => {
    setUploading(true);
    // Give brief visual feedback then pass to parent for real upload
    setTimeout(() => {
      setUploading(false);
      onUpload(file);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Upload Educational Content</h2>
        <p className="text-indigo-200">Our AI will process your materials into adaptive learning paths.</p>
      </div>

      <div
        className={`relative group border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ${
          isDragging ? 'border-purple-400 bg-purple-500/10' : 'border-indigo-500/30 bg-slate-900/50 hover:bg-slate-800/50 hover:border-indigo-400/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.docx,.ppt,.txt"
          aria-label="File Upload"
        />
        
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
              {uploading ? (
                <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
              ) : (
                <UploadCloud className="w-10 h-10 text-white" />
              )}
            </div>
          </div>

          <div className="text-center">
            {uploading ? (
              <h3 className="text-xl font-semibold text-white mb-2">Securely uploading...</h3>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white mb-2">Drag & drop your files here</h3>
                <p className="text-indigo-200 mb-6">or click to browse from your computer</p>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="flex items-center px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20">
                    <FileText className="w-4 h-4 mr-1.5" /> PDF, DOCX
                  </span>
                  <span className="flex items-center px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-sm border border-purple-500/20">
                    <Video className="w-4 h-4 mr-1.5" /> Videos
                  </span>
                  <span className="flex items-center px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 text-sm border border-blue-500/20">
                    <File className="w-4 h-4 mr-1.5" /> PPT, Notes
                  </span>
                </div>
              </>
            )}
          </div>
        </label>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Recent Uploads</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Quantum_Physics_Ch1.pdf", status: "Processed", date: "2 hrs ago" },
            { name: "Organic_Chemistry_Intro.docx", status: "Ready", date: "1 day ago" }
          ].map((file, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-slate-400">{file.date}</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-md font-medium">
                {file.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UploadDropzone;
