import React, { useEffect } from 'react';
import gsap from 'gsap';
import AmbientBackground from '../components/animations/AmbientBackground';
import FocusPanel from '../components/dashboard/FocusPanel';
import AIInsightsPanel from '../components/dashboard/AIInsightsPanel';
import SubjectModules from '../components/dashboard/SubjectModules';
import UserAnalytics from '../components/dashboard/UserAnalytics';
import LivingKnowledgeTree from '../components/tree/LivingKnowledgeTree';
import AIMentorDock from '../components/ai/AIMentorDock';
import FocusMissionOverlay from '../components/focus/FocusMissionOverlay';
import SecondBrainNotes from '../components/notes/SecondBrainNotes';
import { useLearningOSStore } from '../store/useLearningOSStore';

const Dashboard = () => {
  const { user } = useLearningOSStore();

  useEffect(() => {
    gsap.fromTo('.ep-card', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'power3.out' });
  }, []);

  return (
    <div className="edupulse-os">
      <AmbientBackground />
      <AIMentorDock />
      <header className="ep-os-header">
        <div>
          <span>EduPulse AI Learning Operating System</span>
          <h1>Hey {user.name}, your knowledge tree is alive.</h1>
        </div>
        <div className="ep-os-profile">
          <strong>{user.rank}</strong>
          <small>{user.xp.toLocaleString()} XP · {user.streak} day streak</small>
        </div>
      </header>
      <main className="ep-dashboard-grid">
        <FocusPanel />
        <AIInsightsPanel />
        <SubjectModules />
        <UserAnalytics />
        <LivingKnowledgeTree />
        <SecondBrainNotes />
      </main>
      <FocusMissionOverlay />
    </div>
  );
};

export default Dashboard;
