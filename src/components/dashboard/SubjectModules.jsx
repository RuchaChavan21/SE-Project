import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Atom, Brain, Cloud, Network, Shield, Sigma, Zap } from 'lucide-react';
import ProgressRing from '../ui/ProgressRing';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const icons = { DSA: Network, 'AI/ML': Brain, Mathematics: Sigma, Cloud, Physics: Atom, Cybersecurity: Shield };

const SubjectModules = () => {
  const { subjects, activeSubjectId, setActiveSubject, openTopic } = useLearningOSStore();
  const [expanded, setExpanded] = useState(activeSubjectId);

  return (
    <section className="ep-card ep-subjects-card">
      <div className="ep-card-head">
        <span><Network size={16} /> Subjects & Topics</span>
        <small>Living branches</small>
      </div>
      <div className="ep-subject-list">
        {subjects.map((subject) => {
          const Icon = icons[subject.name] || Zap;
          const isOpen = expanded === subject.id;
          return (
            <article key={subject.id} className={`ep-subject-module ${activeSubjectId === subject.id ? 'active' : ''}`}>
              <button
                onClick={() => {
                  setActiveSubject(subject.id);
                  setExpanded(isOpen ? null : subject.id);
                }}
              >
                <span className="ep-subject-icon" style={{ '--subject-color': subject.color }}>
                  <Icon size={20} />
                </span>
                <div>
                  <strong>{subject.name}</strong>
                  <small>{subject.activeTopic} · {subject.xp.toLocaleString()} XP</small>
                </div>
                <ProgressRing value={subject.mastery} label="" size={54} color={subject.color} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ep-topic-stack"
                  >
                    {subject.topics.map((topic) => (
                      <button key={topic.id} onClick={() => openTopic(topic, subject.id)}>
                        <span className={topic.weak ? 'weak' : ''} />
                        <b>{topic.name}</b>
                        <small>{topic.mastery}% · {topic.eta}</small>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SubjectModules;
