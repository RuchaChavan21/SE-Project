import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, BrainCircuit, Mic } from 'lucide-react';
import useNotes from '../../hooks/useNotes';
import NoteCard from './NoteCard';
import VoiceNoteButton from './VoiceNoteButton';
import RevisionGenerator from './RevisionGenerator';

const NotesPanel = ({ isOpen, onClose, topic }) => {
  const { notes, addNote, deleteNote, editNote } = useNotes(topic);
  const [newNoteText, setNewNoteText] = useState('');
  const [showRevision, setShowRevision] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      addNote({ type: 'text', text: newNoteText });
      setNewNoteText('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && !showRevision && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[100] md:right-0 md:left-auto md:w-[400px] md:h-[calc(100vh-2rem)] md:top-4 md:bottom-4 md:rounded-3xl bg-slate-50 dark:bg-slate-900 shadow-2xl rounded-t-3xl border border-slate-200 dark:border-slate-800 flex flex-col h-[85vh] md:mr-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-3xl md:rounded-t-3xl">
              <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>📝</span> My Notes
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowRevision(true)}
                  disabled={notes.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl font-bold text-sm hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <BrainCircuit size={16} /> Revise
                </button>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {notes.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-4">
                  <div className="text-4xl mb-4 opacity-50">📝</div>
                  <p>Your notebook is empty.</p>
                  <p className="text-sm mt-1">Capture thoughts, save highlights, or record voice notes.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {notes.map(note => (
                    <NoteCard key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-b-3xl md:rounded-b-3xl">
              <div className="flex gap-2 mb-2">
                <button 
                  onClick={() => setIsVoiceMode(false)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${!isVoiceMode ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  Type Note
                </button>
                <button 
                  onClick={() => setIsVoiceMode(true)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${isVoiceMode ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  Voice Note
                </button>
              </div>

              {isVoiceMode ? (
                <div className="py-4">
                  <VoiceNoteButton onNoteCaptured={(note) => { addNote(note); setIsVoiceMode(false); }} />
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Jot something down..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-[80px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddNote();
                      }
                    }}
                  />
                  <button 
                    onClick={handleAddNote}
                    disabled={!newNoteText.trim()}
                    className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}

      {showRevision && (
        <RevisionGenerator notes={notes} topic={topic} onClose={() => setShowRevision(false)} />
      )}
    </AnimatePresence>
  );
};

export default NotesPanel;
