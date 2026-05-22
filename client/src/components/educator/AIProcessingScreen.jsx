import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, Loader2, Sparkles, Network } from 'lucide-react';

const LOGS = [
  "Analyzing educational structure...",
  "Extracting core concepts...",
  "Detecting prerequisite concepts...",
  "Building personalized learning graph...",
  "Generating quiz question banks...",
  "Generating accessibility metadata...",
  "Optimizing content for screen readers...",
  "Preparing multilingual support (Hindi, Marathi, Tamil)...",
  "Finalizing adaptive lesson pathways..."
];

const AIProcessingScreen = ({ isProcessing, onComplete }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        if (isProcessing && p > 90) {
          // Hover at 90-95% while waiting for real backend
          return p + Math.random() * 0.5;
        }
        return p + Math.random() * 8;
      });
    }, 400);

    // Logs simulation
    const logInterval = setInterval(() => {
      setCurrentLogIndex(prev => {
        if (prev < LOGS.length - 1) {
          setLogs(current => [...current, LOGS[prev]]);
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isProcessing) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, isProcessing, onComplete]);

  // Jump to 100 when backend finishes
  useEffect(() => {
    if (!isProcessing && progress > 10) {
      setProgress(100);
    }
  }, [isProcessing]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-40 h-40 mb-12"
      >
        <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse delay-75"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-indigo-500/30 border-dashed rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-2 border-purple-500/30 border-dashed rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-16 h-16 text-white animate-bounce" />
        </div>
      </motion.div>

      <div className="text-center mb-10 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-indigo-400" />
          AI Processing Content
        </h2>
        
        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden mb-3 border border-slate-700">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-indigo-300">Extracting Knowledge</span>
          <span className="text-white">{Math.floor(Math.min(progress, 100))}%</span>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="w-full max-w-2xl bg-[#0d1117] border border-slate-800 rounded-xl p-6 shadow-2xl font-mono text-sm overflow-hidden h-64 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0d1117] to-transparent z-10" />
        <div className="flex flex-col justify-end h-full space-y-3">
          <AnimatePresence>
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start text-slate-300"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                <span>{log}</span>
              </motion.div>
            ))}
            {progress < 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center text-indigo-400 font-semibold"
              >
                <Loader2 className="w-4 h-4 animate-spin mr-3" />
                <span>{LOGS[currentLogIndex] || "Finalizing AI Models..."}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0d1117] to-transparent z-10" />
      </div>
    </div>
  );
};

export default AIProcessingScreen;
