import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, X, Save, Mic } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

const NotesPanel = ({ isOpen, onClose, topic }) => {
  const { student, updateStudent } = useStudent();
  const [noteContent, setNoteContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load existing note for topic when opened
  useEffect(() => {
    if (isOpen) {
      setNoteContent(student.notes?.[topic] || '');
      setIsSaved(false);
    }
  }, [isOpen, topic, student.notes]);

  const handleSave = () => {
    const updatedNotes = { ...student.notes, [topic]: noteContent };
    updateStudent({ notes: updatedNotes });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 md:left-6 md:right-auto md:w-96 bg-white dark:bg-slate-900 shadow-2xl md:rounded-t-2xl border-t border-x border-slate-200 dark:border-slate-800 flex flex-col h-[50vh] md:h-[400px] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-amber-50 dark:bg-amber-900/10 text-amber-900 dark:text-amber-100">
            <div className="flex items-center gap-2">
              <PenLine size={20} className="text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold">Notes: {topic}</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-amber-200/50 dark:hover:bg-amber-800/50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Text Area */}
          <div className="flex-1 p-4 relative">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Jot down your thoughts, key takeaways, or doubts..."
              className="w-full h-full resize-none bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button 
              className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors"
              title="Voice to text (coming soon)"
            >
              <Mic size={20} />
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                isSaved 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Save size={18} />
              {isSaved ? 'Saved!' : 'Save Note'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotesPanel;
