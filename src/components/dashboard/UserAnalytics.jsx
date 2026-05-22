import React from 'react';
import { Activity, Flame, Gauge, LineChart, Trophy } from 'lucide-react';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const UserAnalytics = () => {
  const { user, tree } = useLearningOSStore();
  const bars = [38, 58, 44, 72, 66, 84, 91];

  return (
    <section className="ep-card ep-analytics-card">
      <div className="ep-card-head">
        <span><Activity size={16} /> Self Analytics</span>
        <small>No comparisons</small>
      </div>
      <div className="ep-stat-grid">
        <div><Gauge size={18} /><span>Consistency</span><strong>{tree.consistency}%</strong></div>
        <div><Trophy size={18} /><span>Rank</span><strong>{user.rank}</strong></div>
        <div><Flame size={18} /><span>Streak</span><strong>{user.streak} days</strong></div>
        <div><LineChart size={18} /><span>Revision</span><strong>{tree.revisionStrength}%</strong></div>
      </div>
      <div className="ep-xp-graph" aria-label="XP growth graph">
        {bars.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
      </div>
      <p className="ep-analytics-note">Focus trend is climbing. Your tree glow increased after 3 consistent sessions.</p>
    </section>
  );
};

export default UserAnalytics;
