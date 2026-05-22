import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine } from 'lucide-react';
import useNotes from '../../hooks/useNotes';

const HighlightToolbar = ({ topic }) => {
  const [selection, setSelection] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const { addNote } = useNotes(topic);

  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      if (sel && sel.toString().trim().length > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Calculate position above selection
        setSelection({
          text: sel.toString().trim(),
          top: rect.top + window.scrollY - 50,
          left: rect.left + window.scrollX + (rect.width / 2) - 60
        });
      } else {
        // Debounce clearing to allow clicking the button
        setTimeout(() => {
          const currentSel = window.getSelection();
          if (!currentSel || currentSel.toString().trim() === '') {
            setSelection(null);
          }
        }, 150);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleSaveHighlight = () => {
    if (selection && selection.text) {
      addNote({ type: 'highlight', text: selection.text });
      setSelection(null);
      window.getSelection().removeAllRanges();
      
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  return (
    <>
      <AnimatePresence>
        {selection && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-[200]"
            style={{ top: selection.top, left: Math.max(10, selection.left) }}
          >
            <button
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent losing selection before click fires
                handleSaveHighlight();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl shadow-2xl border border-slate-700 hover:bg-slate-800 transition-colors font-medium text-sm whitespace-nowrap"
            >
              <PenLine size={16} className="text-amber-400" />
              Save as Note
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-slate-800 rotate-45 border-r border-b border-slate-700"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2"
          >
            <PenLine size={18} className="text-amber-400" /> Highlight Saved!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HighlightToolbar;
