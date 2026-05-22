import React from 'react';
import { motion } from 'framer-motion';
import { Clock3, Play, Square, Timer, Zap } from 'lucide-react';
import ProgressRing from '../ui/ProgressRing';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const FocusPanel = () => {
  const { focus, startFocus, stopFocus, setFocusMode } = useLearningOSStore();
  const minutes = Math.floor(focus.secondsRemaining / 60);
  const seconds = String(focus.secondsRemaining % 60).padStart(2, '0');

  return (
    <motion.section className={`ep-card ep-focus-card ${focus.active ? 'is-running' : ''}`} layout>
      <div className="ep-card-head">
        <span><Timer size={16} /> Focus Engine</span>
        <small>{focus.sessionsToday} sessions today</small>
      </div>
      <div className="ep-focus-core">
        <ProgressRing value={focus.score} label="Focus" size={132} />
        <div>
          <p className="ep-kicker">{focus.mode} mode</p>
          <h2>{minutes}:{seconds}</h2>
          <p>{focus.concentration} · mastery ETA {focus.masteryEta}</p>
        </div>
      </div>
      <div className="ep-segmented">
        {['Pomodoro', 'Stopwatch'].map((mode) => (
          <button key={mode} onClick={() => setFocusMode(mode)} className={focus.mode === mode ? 'active' : ''}>
            {mode === 'Pomodoro' ? <Clock3 size={15} /> : <Zap size={15} />}
            {mode}
          </button>
        ))}
      </div>
      <button onClick={focus.active ? stopFocus : startFocus} className="ep-primary-action">
        {focus.active ? <Square size={17} /> : <Play size={17} fill="currentColor" />}
        {focus.active ? 'End Focus' : 'Start Learning'}
      </button>
    </motion.section>
  );
};

export default FocusPanel;
