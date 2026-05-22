import React from 'react';
import useNotes from '../../hooks/useNotes';
import { BookOpen, PenLine, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotesSection = () => {
  const { getAllNotes, getTotalNoteCount } = useNotes();
  const navigate = useNavigate();
  const allNotes = getAllNotes();
  const totalCount = getTotalNoteCount();

  const topics = Object.keys(allNotes).filter(topic => allNotes[topic].length > 0);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <PenLine className="text-indigo-500" /> My Notes
        </h3>
        <span className="text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {totalCount} Total
        </span>
      </div>

      {topics.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 text-center">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">No notes yet</h4>
          <p className="text-slate-500 text-sm">Start a lesson and highlight text or open the notes panel to jot things down.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map(topic => {
            const count = allNotes[topic].length;
            return (
              <div 
                key={topic}
                onClick={() => navigate(`/lesson/${topic}`)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 capitalize">
                    {topic.replace(/-/g, ' ')}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{count} note{count !== 1 ? 's' : ''}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-1">
                    {allNotes[topic].slice(0, 3).map((note, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs text-slate-500">
                        {note.type === 'voice' ? '🎤' : note.type === 'highlight' ? '✨' : '📝'}
                      </div>
                    ))}
                    {count > 3 && (
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-slate-500">
                        +{count - 3}
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                    <ChevronRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotesSection;
