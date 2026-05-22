import React from 'react';

const AmbientBackground = () => {
  return (
    <div className="ep-ambient" aria-hidden="true">
      <div className="ep-mesh" />
      <div className="ep-wave ep-wave-one" />
      <div className="ep-wave ep-wave-two" />
      {Array.from({ length: 46 }, (_, index) => (
        <span
          key={index}
          className="ep-star"
          style={{
            left: `${(index * 23) % 100}%`,
            top: `${(index * 41) % 100}%`,
            animationDelay: `${(index % 9) * 0.32}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;
