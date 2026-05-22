import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Atom,
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cloud,
  Code2,
  Cpu,
  Flame,
  Focus,
  GraduationCap,
  Layers3,
  Lock,
  Map,
  MessageCircle,
  Mic,
  Network,
  Orbit,
  PenLine,
  Play,
  Radio,
  Shield,
  Sigma,
  Sparkles,
  StickyNote,
  Target,
  Timer,
  Trophy,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';

const subjects = [
  { name: 'Programming', icon: Code2, mastery: 82, color: 'from-cyan-300 to-blue-500', active: true },
  { name: 'AI/ML', icon: Brain, mastery: 68, color: 'from-fuchsia-300 to-violet-500' },
  { name: 'Mathematics', icon: Sigma, mastery: 74, color: 'from-emerald-300 to-cyan-500' },
  { name: 'Physics', icon: Atom, mastery: 57, color: 'from-sky-300 to-indigo-500' },
  { name: 'DSA', icon: Network, mastery: 72, color: 'from-amber-300 to-pink-500' },
  { name: 'Cloud', icon: Cloud, mastery: 46, color: 'from-blue-200 to-cyan-400' },
  { name: 'Cybersecurity', icon: Shield, mastery: 51, color: 'from-red-300 to-violet-500' },
];

const sessions = [
  { time: '7:00 PM', title: 'Arrays Revision', type: 'Revision', state: 'done' },
  { time: '7:30 PM', title: 'Recursion Focus Lab', type: 'Active', state: 'active' },
  { time: '8:00 PM', title: 'Quiz Challenge', type: 'Challenge', state: 'next' },
  { time: '8:25 PM', title: 'AI Recap Session', type: 'Mentor', state: 'next' },
];

const featureTabs = [
  { name: 'Lectures', icon: BookOpen },
  { name: 'AI Notes', icon: Sparkles },
  { name: 'Personal Notes', icon: PenLine },
  { name: 'Handwritten Notes', icon: StickyNote },
  { name: 'Quizzes', icon: Trophy },
  { name: 'Flashcards', icon: Layers3 },
  { name: 'Revision', icon: Clock3 },
  { name: 'AI Mentor', icon: MessageCircle },
  { name: 'Mind Maps', icon: Map },
];

const topicNodes = [
  { id: 'arrays', label: 'Arrays', x: 13, y: 46, mastery: 94, state: 'mastered' },
  { id: 'linked-lists', label: 'Linked Lists', x: 34, y: 25, mastery: 78, state: 'unlocked' },
  { id: 'recursion', label: 'Recursion', x: 52, y: 50, mastery: 72, state: 'active' },
  { id: 'trees', label: 'Trees', x: 71, y: 28, mastery: 44, state: 'unlocked' },
  { id: 'graphs', label: 'Graphs', x: 86, y: 61, mastery: 18, state: 'locked' },
  { id: 'dp', label: 'Dynamic Programming', x: 61, y: 76, mastery: 31, state: 'locked' },
];

const subtopics = [
  { name: 'Base Cases', progress: 100, confidence: 91, time: '12m', revision: 'Stable' },
  { name: 'Call Stack Trace', progress: 72, confidence: 78, time: '18m', revision: 'Review tomorrow' },
  { name: 'Tree Recursion', progress: 44, confidence: 62, time: '24m', revision: 'Needs examples' },
  { name: 'Backtracking Bridge', progress: 18, confidence: 41, time: '36m', revision: 'Locked after quiz' },
];

const insights = [
  'You improved focus consistency by 18% this week.',
  'Recursion confidence rises fastest after visual call-stack practice.',
  'AI predicts Trees will unlock after one more challenge set.',
];

const CircularProgress = ({ value, size = 92, label, glow = 'cyan' }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="rgba(148, 163, 184, .2)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke={glow === 'violet' ? '#a78bfa' : '#22d3ee'}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="drop-shadow-[0_0_14px_rgba(34,211,238,.75)]"
        />
      </svg>
      <div className="text-center">
        <div className="text-xl font-black text-white">{value}%</div>
        {label && <div className="text-[10px] uppercase tracking-[.18em] text-cyan-100/70">{label}</div>}
      </div>
    </div>
  );
};

const Home = () => {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState('AI Mentor');
  const [selectedTopic, setSelectedTopic] = useState(topicNodes[2]);

  const displayName = student.name || 'Kasturi';
  const xp = student.xp || 18420;
  const streak = student.streak || 12;
  const particles = useMemo(() => Array.from({ length: 28 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    top: `${(index * 19) % 100}%`,
    delay: (index % 7) * 0.35,
  })), []);

  return (
    <div className={`edupulse-shell ${focusMode ? 'focus-active' : ''}`}>
      <div className="edupulse-aurora" />
      <div className="edupulse-grid" />
      <div className="particle-field" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={{ left: particle.left, top: particle.top, animationDelay: `${particle.delay}s` }}
          />
        ))}
      </div>

      <section className="universe-layout">
        <aside className="subject-dock" aria-label="EduPulse AI subjects">
          <div className="brand-orb">
            <Orbit className="h-6 w-6" />
          </div>
          <button className="companion-core" aria-label="AI companion">
            <Cpu className="h-5 w-5" />
          </button>
          <div className="subject-list">
            {subjects.map((subject) => (
              <motion.button
                key={subject.name}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`subject-icon ${subject.active ? 'is-active' : ''}`}
                aria-label={`${subject.name} mastery ${subject.mastery}%`}
              >
                <span className={`subject-glow bg-gradient-to-br ${subject.color}`} />
                <subject.icon className="relative z-10 h-5 w-5" />
                <svg viewBox="0 0 48 48" className="completion-ring">
                  <circle cx="24" cy="24" r="20" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    style={{ strokeDashoffset: 126 - (126 * subject.mastery) / 100 }}
                  />
                </svg>
                <span className="subject-tooltip">
                  {subject.name}
                  <b>{subject.mastery}%</b>
                </span>
              </motion.button>
            ))}
          </div>
          <button onClick={() => setFocusMode((value) => !value)} className="focus-orb" aria-label="Toggle focus mode">
            <Focus className="h-5 w-5" />
          </button>
          <div className="avatar-stack">
            <div className="streak-flame"><Flame className="h-4 w-4" />{streak}</div>
            <div className="profile-orb">{displayName.slice(0, 1).toUpperCase()}</div>
            <div className="xp-chip">Lv 18</div>
          </div>
        </aside>

        <main className="learning-universe">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-console"
          >
            <div>
              <span className="signal-pill"><Radio className="h-3.5 w-3.5" /> Neural path synchronized</span>
              <h1>Good evening, {displayName}.</h1>
              <p>You are <strong>72% closer</strong> to mastering Data Structures. The next high-leverage move is Recursion.</p>
            </div>
            <div className="hero-actions">
              <button onClick={() => setFocusMode(true)} className="start-learning">
                <Play className="h-5 w-5 fill-current" />
                Start Learning
              </button>
              <CircularProgress value={72} label="Journey" />
            </div>
          </motion.header>

          <section className="mission-strip">
            <div>
              <span>Daily focus mission</span>
              <strong>Trace 6 recursive calls, finish 1 quiz burst, generate AI recap.</strong>
            </div>
            <div className="timer-core"><Timer className="h-4 w-4" /> 28:40 focus window</div>
          </section>

          <div className="center-grid">
            <section className="active-topic-panel">
              <div className="panel-heading">
                <span><Zap className="h-4 w-4" /> Active learning node</span>
                <button onClick={() => navigate('/lesson/react-hooks')}>Resume where left off <ChevronRight className="h-4 w-4" /></button>
              </div>
              <div className="topic-core">
                <div className="topic-aura">
                  <CircularProgress value={selectedTopic.mastery} size={138} label="Mastery" glow="violet" />
                </div>
                <div>
                  <p className="eyebrow">Current topic</p>
                  <h2>{selectedTopic.label}</h2>
                  <div className="metrics-row">
                    <span><Clock3 className="h-4 w-4" /> 46m to mastery</span>
                    <span><Focus className="h-4 w-4" /> 91 focus</span>
                    <span><Activity className="h-4 w-4" /> 84 confidence</span>
                  </div>
                  <p className="revision-state">Revision status: call-stack patterns need one spaced repeat tonight.</p>
                </div>
              </div>
              <button onClick={() => setFocusMode(true)} className="continue-button">Continue Learning</button>
            </section>

            <section className="timeline-panel">
              <div className="panel-heading">
                <span><Clock3 className="h-4 w-4" /> AI study flow</span>
                <small>ETA 8:35 PM</small>
              </div>
              <div className="session-list">
                {sessions.map((session) => (
                  <motion.div
                    key={session.title}
                    whileHover={{ x: 4 }}
                    className={`session-item ${session.state}`}
                  >
                    <time>{session.time}</time>
                    <div>
                      <strong>{session.title}</strong>
                      <span>{session.type}</span>
                    </div>
                    {session.state === 'active' ? <span className="live-dot" /> : <CheckCircle2 className="h-4 w-4" />}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <section className="feature-ring-panel">
            <div className="panel-heading">
              <span><Layers3 className="h-4 w-4" /> Modules attached to Recursion</span>
              <small>{activeTab} online</small>
            </div>
            <div className="feature-tabs">
              {featureTabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={activeTab === tab.name ? 'active' : ''}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="context-content">
              <Sparkles className="h-5 w-5" />
              <span>{activeTab} is tuned to your Recursion node: AI will surface examples, weak patterns, and a quick review path.</span>
            </div>
          </section>

          <section className="knowledge-graph-panel">
            <div className="panel-heading">
              <span><Network className="h-4 w-4" /> Data Structures knowledge graph</span>
              <small>Constellation growth: Explorer</small>
            </div>
            <div className="graph-stage">
              <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M13 46 C22 38, 26 30, 34 25" />
                <path d="M34 25 C42 35, 44 45, 52 50" />
                <path d="M52 50 C60 38, 64 31, 71 28" />
                <path d="M71 28 C78 38, 80 51, 86 61" />
                <path d="M52 50 C54 62, 56 71, 61 76" />
              </svg>
              {topicNodes.map((node) => (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: node.state === 'locked' ? 1 : 1.12 }}
                  onClick={() => node.state !== 'locked' && setSelectedTopic(node)}
                  className={`graph-node ${node.state} ${selectedTopic.id === node.id ? 'selected' : ''}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.state === 'locked' ? <Lock className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                  <span>{node.label}</span>
                  <b>{node.mastery}%</b>
                </motion.button>
              ))}
            </div>
          </section>

          <AnimatePresence>
            {focusMode && (
              <motion.section
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="immersive-topic-view"
              >
                <button onClick={() => setFocusMode(false)} className="exit-focus">Exit focus</button>
                <div className="deep-focus-header">
                  <span><Focus className="h-4 w-4" /> Deep focus realm</span>
                  <h2>{selectedTopic.label}</h2>
                  <p>Distractions reduced. Ambient learning path active. AI Mentor is watching for confusion signals.</p>
                </div>
                <div className="subtopic-grid">
                  {subtopics.map((item) => (
                    <div key={item.name} className="subtopic-card">
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.time} estimated</span>
                      </div>
                      <div className="subtopic-bar"><span style={{ width: `${item.progress}%` }} /></div>
                      <p>{item.progress}% complete · {item.confidence}% confidence · {item.revision}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        <aside className="intelligence-panel">
          <section className="ai-card companion">
            <div className="companion-avatar"><Sparkles className="h-6 w-6" /></div>
            <div>
              <span>EduPulse AI</span>
              <strong>Your recall curve is warm. Learn now, revise once at 10:00 PM.</strong>
            </div>
          </section>

          <section className="ai-card">
            <div className="panel-heading">
              <span><Activity className="h-4 w-4" /> Focus analytics</span>
            </div>
            <div className="analytics-stack">
              <div><span>Concentration</span><b>91</b></div>
              <div><span>Consistency</span><b>+18%</b></div>
              <div><span>Revision risk</span><b>Low</b></div>
            </div>
          </section>

          <section className="ai-card">
            <div className="panel-heading">
              <span><Target className="h-4 w-4" /> Weak areas</span>
            </div>
            <div className="weak-list">
              <span>Tree recursion</span>
              <span>Stack memory</span>
              <span>Base-case design</span>
            </div>
          </section>

          <section className="ai-card">
            <div className="panel-heading">
              <span><Brain className="h-4 w-4" /> AI insights</span>
            </div>
            {insights.map((insight) => <p key={insight}>{insight}</p>)}
          </section>

          <section className="ai-card notes-brain">
            <div className="panel-heading">
              <span><StickyNote className="h-4 w-4" /> Second brain</span>
              <small>5 layers</small>
            </div>
            <div className="note-cloud">
              <span>AI Notes</span>
              <span>Personal</span>
              <span>Handwritten</span>
              <span><Mic className="h-3 w-3" /> Voice</span>
              <span>Highlights</span>
            </div>
            <button>Generate flashcards <ChevronRight className="h-4 w-4" /></button>
          </section>

          <section className="ai-card xp-card">
            <div>
              <span><BadgeCheck className="h-4 w-4" /> Mastery level</span>
              <strong>Strategist</strong>
            </div>
            <div className="xp-line"><span style={{ width: `${Math.min(88, xp / 250)}%` }} /></div>
            <small>{xp.toLocaleString()} XP · Elite Scholar path unlocked soon</small>
          </section>
        </aside>
      </section>
    </div>
  );
};

export default Home;
