import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, RefreshCcw, Sparkles } from 'lucide-react';

const insights = [
  { icon: Sparkles, title: 'Retention boost', text: 'You retain visual learning 32% faster after concept maps.' },
  { icon: Brain, title: 'Mastery signal', text: 'You are 68% closer to mastering DSA this month.' },
  { icon: RefreshCcw, title: 'Revision reminder', text: 'Revise tree recursion tonight to keep the branch glowing.' },
  { icon: Lightbulb, title: 'Mentor thought', text: 'Your confidence rises when examples come before definitions.' },
];

const AIInsightsPanel = () => {
  return (
    <section className="ep-card ep-ai-card">
      <div className="ep-card-head">
        <span><Sparkles size={16} /> AI Insights</span>
        <small>Gemini mentor</small>
      </div>
      <div className="ep-insight-list">
        {insights.map((insight, index) => (
          <motion.article
            key={insight.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <insight.icon size={18} />
            <div>
              <strong>{insight.title}</strong>
              <p>{insight.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default AIInsightsPanel;
