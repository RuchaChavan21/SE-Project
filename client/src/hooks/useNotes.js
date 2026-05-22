import { useStudent } from '../context/StudentContext';
import { checkBadges } from '../services/badgeEngine';
import confetti from 'canvas-confetti';

const useNotes = (topicSlug) => {
  const { student, updateStudent } = useStudent();
  
  const topicNotes = student.notes?.[topicSlug] || [];

  const addNote = (noteObj) => {
    const newNote = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      topicSlug,
      ...noteObj
    };

    const updatedNotes = {
      ...student.notes,
      [topicSlug]: [newNote, ...(student.notes?.[topicSlug] || [])]
    };

    const updatedProfile = {
      ...student,
      notes: updatedNotes,
      xp: (student.xp || 0) + 2 // Small XP reward for taking a note
    };

    // Check Badges
    const unlocked = checkBadges(updatedProfile);
    if (unlocked.length > 0) {
      updatedProfile.badges = [...(student.badges || []), ...unlocked];
      
      // Fire confetti if a badge unlocks
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899']
      });

      // Dispatch global event for toast
      window.dispatchEvent(new CustomEvent('badge_unlocked', { detail: unlocked[0] }));
    }

    updateStudent(updatedProfile);
  };

  const deleteNote = (noteId) => {
    const updatedNotesList = topicNotes.filter(n => n.id !== noteId);
    updateStudent({
      notes: {
        ...student.notes,
        [topicSlug]: updatedNotesList
      }
    });
  };

  const editNote = (noteId, newText) => {
    const updatedNotesList = topicNotes.map(n => 
      n.id === noteId ? { ...n, text: newText } : n
    );
    updateStudent({
      notes: {
        ...student.notes,
        [topicSlug]: updatedNotesList
      }
    });
  };

  const getAllNotes = () => {
    return student.notes || {};
  };

  const getTotalNoteCount = () => {
    let count = 0;
    Object.values(student.notes || {}).forEach(arr => { count += arr.length; });
    return count;
  };

  return {
    notes: topicNotes,
    addNote,
    deleteNote,
    editNote,
    getAllNotes,
    getTotalNoteCount
  };
};

export default useNotes;
