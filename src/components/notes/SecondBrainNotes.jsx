import React from 'react';
import { FileText, Highlighter, Mic, PenLine, ScanText, Sparkles } from 'lucide-react';

const layers = [
  { icon: Sparkles, title: 'AI Notes', text: 'Gemini summaries and analogy mode.' },
  { icon: PenLine, title: 'Personal Notes', text: 'Your own connected thinking layer.' },
  { icon: ScanText, title: 'Handwritten Notes', text: 'OCR extraction and cleanup.' },
  { icon: Mic, title: 'Voice Notes', text: 'Capture thoughts during revision.' },
  { icon: Highlighter, title: 'Highlight Notes', text: 'Turn highlights into flashcards.' },
];

const SecondBrainNotes = () => (
  <section className="ep-card ep-notes-brain">
    <div className="ep-card-head">
      <span><FileText size={16} /> Second Brain Notes</span>
      <small>Connected graph</small>
    </div>
    <div className="ep-note-graph">
      {layers.map((layer, index) => (
        <article key={layer.title} style={{ '--note-index': index }}>
          <layer.icon size={18} />
          <strong>{layer.title}</strong>
          <p>{layer.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default SecondBrainNotes;
