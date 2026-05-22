import React, { useState } from 'react';
import { Camera, RefreshCw, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../../hooks/useSpeech';
import { useStudent } from '../../context/StudentContext';

const ImageDescriptionCard = ({ imageUrl, altText, fakeDescription }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState(null);
  const { speak, isSpeaking, stop } = useSpeech();
  const { student } = useStudent();

  const handleDescribe = () => {
    if (description) {
      if (isSpeaking) stop();
      else speak(description, student.language === 'en' ? 'en-US' : student.language);
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setDescription(fakeDescription);
      
      // Auto-read immediately after generating, especially in blind mode
      if (student.blindMode || student.autoTTS) {
        speak(fakeDescription, student.language === 'en' ? 'en-US' : student.language);
      }
    }, 2000);
  };

  // In blind mode, we might auto-describe on mount, but to prevent spam, we rely on user action or autoTTS settings in the parent.
  React.useEffect(() => {
    if (student.blindMode && !description && !isGenerating) {
      handleDescribe();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student.blindMode]);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 my-6">
      <div className="relative">
        {/* Placeholder for actual image */}
        <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
          <span className="text-sm px-4 text-center">{altText || 'Image content'}</span>
        </div>
        
        <button
          onClick={handleDescribe}
          className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 font-medium text-sm flex items-center gap-2 hover:bg-white dark:hover:bg-slate-900 transition-colors focus:ring-2 focus:ring-indigo-500"
          aria-label={description ? "Read image description" : "Generate image description"}
        >
          {isGenerating ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : description ? (
            <Volume2 size={16} className={isSpeaking ? 'animate-pulse text-indigo-500' : ''} />
          ) : (
            <Camera size={16} />
          )}
          {isGenerating ? 'Analyzing...' : description ? 'Read Aloud' : 'Describe Image'}
        </button>
      </div>

      <AnimatePresence>
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
            role="region"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg shrink-0 mt-0.5">
                <Camera size={16} className="text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">AI Image Description</h4>
                <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageDescriptionCard;
