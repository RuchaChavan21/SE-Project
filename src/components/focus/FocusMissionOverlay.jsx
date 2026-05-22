import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Focus, Waves, X } from 'lucide-react';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const FocusMissionOverlay = () => {
  const { focus, stopFocus, activeTopic } = useLearningOSStore();

  return (
    <AnimatePresence>
      {focus.active && (
        <motion.div
          className="ep-focus-overlay"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
        >
          <button className="ep-focus-close" onClick={stopFocus} aria-label="Exit focus mode"><X size={18} /></button>
          <div className="ep-focus-visualizer">
            {Array.from({ length: 24 }, (_, index) => <span key={index} style={{ animationDelay: `${index * 0.05}s` }} />)}
          </div>
          <div className="ep-focus-mission">
            <span><Focus size={18} /> Mission entered</span>
            <h2>{activeTopic.name}</h2>
            <p>Distractions dimmed. Ambient rhythm active. EduPulse AI is monitoring confidence and pacing.</p>
            <button onClick={stopFocus}><Waves size={17} /> Complete session</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FocusMissionOverlay;
