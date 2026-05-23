import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStudent } from '../context/StudentContext';
import { useUser } from '../context/UserContext';
import { usePlatformSystem } from '../hooks/usePlatformSystem';
import StreakCounter from '../components/gamification/StreakCounter';

// Import all newly created dashboard components
import ContinueLearningCard from '../components/dashboard/ContinueLearningCard';
import CourseProgressCard from '../components/dashboard/CourseProgressCard';
import LearningRoadmapPreview from '../components/dashboard/LearningRoadmapPreview';
import AIRecommendations from '../components/dashboard/AIRecommendations';
import PerformanceAnalytics from '../components/dashboard/PerformanceAnalytics';
import WeakTopicsPanel from '../components/dashboard/WeakTopicsPanel';
import AchievementGrid from '../components/dashboard/AchievementGrid';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import { Eye, Volume2, Type, Contrast, Trophy } from 'lucide-react';

const StudentDashboard = () => {
  const { student, updateStudent } = useStudent();
  const { user } = useUser();
  const { getStudentEnrollments } = usePlatformSystem();

  const [myEnrollments, setMyEnrollments] = useState([]);
  const [activeEnrollment, setActiveEnrollment] = useState(null);

  useEffect(() => {
    const studentId = user?.id || 'student_456'; // Use our fake student from state
    const enrolls = getStudentEnrollments(studentId);
    setMyEnrollments(enrolls);
    if (enrolls.length > 0) {
      // Pick the first enrollment or the one with lowest progress for "Continue Learning"
      setActiveEnrollment(enrolls[0]);
    }
  }, [user, getStudentEnrollments]);

  // Accessibility quick actions toggles
  const toggleBlindMode = () => updateStudent({ blindMode: !student.blindMode });
  const toggleVoiceNav = () => updateStudent({ voiceNav: !student.voiceNav });
  const toggleHighContrast = () => updateStudent({ highContrast: !student.highContrast });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* 1. TOP HERO SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
            Good Evening, {student.name || 'Scholar'} <span className="ml-2 animate-waving-hand">👋</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">
            Ready to continue your AI-powered learning journey?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 shadow-sm font-bold text-sm">
            <Trophy className="w-5 h-5" />
            {student.xp || 0} XP
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md">
            Lvl {Math.floor((student.xp || 0) / 100) + 1}
          </div>
        </div>
      </div>

      {/* Accessibility Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={toggleBlindMode} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border transition-colors ${student.blindMode ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'}`}>
          <Eye className="w-4 h-4" /> Blind Mode
        </button>
        <button onClick={toggleVoiceNav} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border transition-colors ${student.voiceNav ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'}`}>
          <Volume2 className="w-4 h-4" /> Voice Nav
        </button>
        <button onClick={toggleHighContrast} className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border transition-colors ${student.highContrast ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'}`}>
          <Contrast className="w-4 h-4" /> High Contrast
        </button>
      </div>

      {/* 2. CONTINUE LEARNING CARD */}
      {activeEnrollment ? (
        <ContinueLearningCard enrollment={activeEnrollment} />
      ) : (
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-300 dark:border-slate-700 text-center">
          <h3 className="text-xl font-bold mb-2">No Active Courses</h3>
          <p className="text-slate-500 mb-4">Enroll in a course to start your learning journey!</p>
        </div>
      )}

      {/* 3. PERFORMANCE ANALYTICS */}
      <PerformanceAnalytics student={student} enrollments={myEnrollments} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* MY COURSES */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Enrolled Courses</h3>
            {myEnrollments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myEnrollments.map((enr, i) => (
                  <CourseProgressCard key={i} enrollment={enr} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">You are not enrolled in any courses yet.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeakTopicsPanel weakTopics={student.weakTopics} />
            <AIRecommendations student={student} />
          </div>

          <RecentActivityFeed />

        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-8">
          <LearningRoadmapPreview enrollment={activeEnrollment} />
          <AchievementGrid badges={student.badges} />
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
