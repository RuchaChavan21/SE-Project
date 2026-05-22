import React from 'react';
import { motion } from 'framer-motion';

const ProgressRing = ({ value, label, size = 112, color = '#22d3ee' }) => {
  const radius = 45;
  const circumference = Math.PI * 2 * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="ep-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} className="ep-ring-track" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          className="ep-ring-value"
          style={{ stroke: color }}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default ProgressRing;
