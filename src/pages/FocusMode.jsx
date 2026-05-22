import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Focus, Waves } from 'lucide-react';
import AmbientBackground from '../components/animations/AmbientBackground';
import { useLearningOSStore } from '../store/useLearningOSStore';

const FocusMode = () => {
  const navigate = useNavigate();
  const { activeTopic } = useLearningOSStore();

  return (
    <div className="ep-focus-page">
      <AmbientBackground />
      <button className="ep-back-button" onClick={() => navigate('/')}><ArrowLeft size={17} /> Dashboard</button>
      <div className="ep-focus-mission standalone">
        <span><Focus size={18} /> Deep work atmosphere</span>
        <h1>{activeTopic.name}</h1>
        <p>Ambient music visualization, breathing animation, dimmed distractions, and glowing content space are active.</p>
        <button><Waves size={17} /> Begin guided session</button>
      </div>
    </div>
  );
};

export default FocusMode;
