import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Highlighter, Mic, Trash2, Check, Volume2, Copy } from 'lucide-react';
import useSpeech from '../../hooks/useSpeech';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const [copied, setCopied] = useState(false);
  const { speak, stop, isSpeaking } = useSpeech();

  const handleSave = () => {
    onEdit(note.id, editedText);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(note.text);
    }
  };

  const getIcon = () => {
    switch (note.type) {
      case 'highlight': return <Highlighter className="text-amber-500 w-4 h-4" />;
      case 'voice': return <Mic className="text-red-500 w-4 h-4" />;
      default: return <Edit2 className="text-indigo-500 w-4 h-4" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
            {getIcon()}
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {note.type || 'text'}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <textarea
              className="w-full bg-slate-50 dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none min-h-[80px]"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1">
                <Check size={14} /> Save
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
              {note.text}
            </p>
            <div className="flex items-center justify-end gap-1 border-t border-slate-100 dark:border-slate-700 pt-3">
              <button onClick={handleSpeak} className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 animate-pulse' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`} aria-label="Read aloud">
                <Volume2 size={16} />
              </button>
              <button onClick={handleCopy} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" aria-label="Copy note">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
              <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" aria-label="Edit note">
                <Edit2 size={16} />
              </button>
              <button onClick={() => onDelete(note.id)} className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-lg transition-colors" aria-label="Delete note">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoteCard;
