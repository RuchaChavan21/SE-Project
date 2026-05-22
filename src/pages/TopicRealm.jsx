import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ArrowLeft, BookOpen, Brain, Layers3, MessageCircle, PenLine, Sparkles, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AmbientBackground from '../components/animations/AmbientBackground';
import SecondBrainNotes from '../components/notes/SecondBrainNotes';
import { useLearningOSStore } from '../store/useLearningOSStore';

const modules = [
  { icon: BookOpen, title: 'AI Lectures', text: 'Personalized explanation with analogy, beginner, and exam modes.' },
  { icon: Trophy, title: 'Adaptive Quiz', text: 'Difficulty shifts based on confidence and weak-topic history.' },
  { icon: Layers3, title: 'Flashcards', text: 'Spaced repetition cards generated from notes and mistakes.' },
  { icon: PenLine, title: 'Personal Notes', text: 'Write, connect, highlight, and convert notes into review paths.' },
  { icon: MessageCircle, title: 'AI Mentor', text: 'Ask Gemini for hints, examples, and revision recommendations.' },
  { icon: Brain, title: 'Mastery Stats', text: 'Focus analytics, revision health, and confidence evolution.' },
];

const TopicRealm = () => {
  const navigate = useNavigate();
  const { activeTopic, startFocus } = useLearningOSStore();

  useEffect(() => {
    gsap.fromTo('.ep-realm-module', { y: 26, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: 'back.out(1.4)' });
  }, [activeTopic.id]);

  return (
    <div className="ep-topic-realm">
      <AmbientBackground />
      <button className="ep-back-button" onClick={() => navigate('/')}><ArrowLeft size={17} /> Dashboard</button>
      <section className="ep-realm-hero">
        <span><Sparkles size={18} /> Topic Realm</span>
        <h1>{activeTopic.name}</h1>
        <p>The UI has folded into a focused learning realm. Every module is tuned to your weak areas, confidence, and revision rhythm.</p>
        <button onClick={startFocus}>Enter Focus Mission</button>
      </section>
      <section className="ep-realm-grid">
        {modules.map((module) => (
          <article key={module.title} className="ep-card ep-realm-module">
            <module.icon size={22} />
            <strong>{module.title}</strong>
            <p>{module.text}</p>
          </article>
        ))}
      </section>
      <SecondBrainNotes />
    </div>
  );
};

export default TopicRealm;
