import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Play, Star, Sparkles, Target, ArrowRight, BrainCircuit, BookOpen, Clock } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useUser } from '../context/UserContext';
import { useCourses } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import StreakCounter from '../components/gamification/StreakCounter';

const Home = () => {
  const { student } = useStudent();
  const { user } = useUser();
  const navigate = useNavigate();
  const { courses, enrollStudent, getMyEnrollments } = useCourses();

  const [availableCourses, setAvailableCourses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load courses instantly from context/local storage instead of fetching from backend
    const studentId = user?.id || 'student_123';
    
    setAvailableCourses(courses);
    setMyEnrollments(getMyEnrollments(studentId));
    setIsLoading(false);
  }, [courses, user, getMyEnrollments]);

  const handleEnroll = (courseId) => {
    const studentId = user?.id || 'student_123';
    enrollStudent(studentId, courseId);
  };

  const suggestedTopic = "React Hooks";
  const suggestedTopicSlug = "react-hooks";

  const weakTopics = student.weakTopics && student.weakTopics.length > 0 
    ? student.weakTopics 
    : ["Quantum Superposition"]; // Fallback if none

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, {student.name || 'Scholar'}! 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">
            Ready to continue your {student.level || 'beginner'} journey?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 shadow-sm">
            <Trophy className="w-5 h-5" />
            <span className="font-bold text-sm">{student.xp || 0} XP</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => navigate(`/lesson/${suggestedTopicSlug}`)}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-2xl shadow-indigo-500/20 cursor-pointer group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Sparkles className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Recommended Next Step
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-3">{suggestedTopic}</h3>
          <p className="text-indigo-100 mb-8 text-base md:text-lg max-w-lg leading-relaxed">
            Based on your strong progress, it's time to dive into {suggestedTopic}. We've prepared personalized {student.learningStyle}-based explanations.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center shadow-lg">
            <Play className="w-4 h-4 mr-2" fill="currentColor" />
            Start Learning
          </button>
        </div>
      </motion.div>

      {/* My Learning / Enrollments */}
      {myEnrollments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="text-amber-500 w-5 h-5" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">My Active Courses</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEnrollments.map((enr, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-md">
                    {enr.progress}% Complete
                  </span>
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">{enr.courseId?.title || 'Unknown Course'}</h4>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mb-4">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                </div>
                <button 
                  onClick={() => navigate(`/lesson/${enr.courseId?.title.replace(/\s+/g, '-').toLowerCase()}`)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-medium transition-colors text-sm"
                >
                  Resume Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Courses */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-500 w-5 h-5" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Explore AI Courses</h3>
        </div>
        
        {isLoading ? (
          <div className="text-slate-500">Loading courses...</div>
        ) : availableCourses.length === 0 ? (
          <div className="p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-center text-slate-500">
            No courses available yet. Wait for a teacher to publish one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course, idx) => {
              const isEnrolled = myEnrollments.some(e => e.courseId?._id === course._id || e.courseId === course._id);
              return (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-400 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                        {course.difficulty || "Mixed"}
                      </span>
                      <span className="text-xs font-medium text-slate-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {course.duration || "2 Hours"}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">{course.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                  </div>
                  
                  <button 
                    onClick={() => !isEnrolled && handleEnroll(course._id)}
                    disabled={isEnrolled}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                      isEnrolled 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'
                    }`}
                  >
                    {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
