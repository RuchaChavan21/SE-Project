import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, saveProfile } from '../utils/localStorage';

const StudentContext = createContext();

const defaultStudent = {
  isOnboarded: false,
  name: "",
  language: "en",
  level: "beginner",
  learningStyle: "examples",
  accessibilityNeeds: "none",
  blindMode: false,
  xp: 0,
  streak: 1,
  badges: [],
  completedTopics: [],
  weakTopics: [],
  quizHistory: [],
  notes: {},
  questionsAsked: 0,
  lastActiveDate: null,
  fontSize: "medium",
  highContrast: false,
  autoTTS: false,
  voiceNav: false
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const saved = getProfile();
    return saved ? saved : defaultStudent;
  });

  useEffect(() => {
    saveProfile(student);
  }, [student]);

  const updateStudent = (data) => {
    setStudent(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = (data) => {
    let accessSettings = {};
    if (data.accessibilityNeeds === 'screen_reader' || data.accessibilityNeeds === 'low_vision') {
      accessSettings = {
        blindMode: true,
        highContrast: true,
        autoTTS: true,
        voiceNav: true,
        fontSize: 'xl'
      };
    }
    setStudent(prev => ({ ...prev, ...data, ...accessSettings, isOnboarded: true }));
  };

  return (
    <StudentContext.Provider value={{ student, updateStudent, completeOnboarding }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
