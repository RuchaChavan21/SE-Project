import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';

const VoiceCommandToast = ({ lastCommand }) => {
  return (
    <AnimatePresence>
      {lastCommand && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div className="bg-slate-900 text-white rounded-full px-5 py-3 shadow-2xl shadow-slate-900/50 flex items-center gap-3 border border-slate-700">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shrink-0">
              <Mic className="text-white w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1 truncate">
              <span className="text-slate-400 text-xs uppercase tracking-wider font-bold block mb-0.5">Command Recognized</span>
              <p className="font-medium text-sm">"{lastCommand}"</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceCommandToast;
