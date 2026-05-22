import React from 'react';
import { Bot, Languages, Mic, Sparkles } from 'lucide-react';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const AIMentorDock = () => {
  const { accessibility } = useLearningOSStore();

  return (
    <aside className="ep-mentor-dock" aria-label="AI mentor and accessibility dock">
      <div className="ep-mentor-orb"><Bot size={22} /></div>
      <button title="Voice navigation"><Mic size={18} />{accessibility.voiceNavigation && <span />}</button>
      <button title="Multilingual mode"><Languages size={18} /></button>
      <button title="Gemini AI mentor"><Sparkles size={18} /></button>
    </aside>
  );
};

export default AIMentorDock;
