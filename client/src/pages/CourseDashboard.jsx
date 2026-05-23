import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlatformSystem } from '../hooks/usePlatformSystem';
import { useUser } from '../context/UserContext';
import LearningRoadmap from '../components/learning/LearningRoadmap';
import { ChevronLeft, Trophy, Star, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, getStudentEnrollments } = usePlatformSystem();
  const { user } = useUser();
  const studentId = user?.id || 'student_456';

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);

  useEffect(() => {
    const c = courses.find(c => c._id === id);
    if (c) {
      setCourse(c);
      const enr = getStudentEnrollments(studentId).find(e => e.courseId === id);
      setEnrollment(enr);
    } else {
      navigate('/'); // Course not found
    }
  }, [id, courses, getStudentEnrollments, studentId, navigate]);

  if (!course || !enrollment) return null;

  const handleTopicClick = (topic) => {
    // We navigate to the lesson and pass the courseId so Lesson can mark it complete.
    // For now we'll pass state to the route or we can just navigate.
    navigate(`/lesson/${topic.title.replace(/\s+/g, '-').toLowerCase()}`, { state: { courseId: course._id, topicTitle: topic.title } });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      {/* Header */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-slate-500 hover:text-indigo-500 transition-colors"
      >
        <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {course.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">
              {course.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end shrink-0 w-full md:w-auto">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              {enrollment.progress}% Complete
            </div>
            <div className="w-full md:w-48 bg-slate-200 dark:bg-slate-800 rounded-full h-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${enrollment.progress}%` }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
              />
            </div>
            <div className="text-sm text-slate-500 mt-2 font-medium">
              {enrollment.completedTopics.length} / {course.topics.length} Topics
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-indigo-500 w-6 h-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Learning Roadmap</h2>
          </div>
          <LearningRoadmap 
            course={course} 
            enrollment={enrollment} 
            onTopicClick={handleTopicClick} 
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800/30 rounded-3xl p-6">
             <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/50 rounded-2xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Course Rewards</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Complete this course to earn the <span className="font-bold text-amber-600 dark:text-amber-400">Master</span> badge and +500 XP.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
