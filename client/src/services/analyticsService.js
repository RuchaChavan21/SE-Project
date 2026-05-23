import { getPlatformState } from './courseService';

export const getEducatorAnalytics = (educatorId) => {
  const state = getPlatformState();
  if (!state) return null;

  const educatorCourses = state.courses.filter(c => c.educatorId === educatorId);
  const courseIds = educatorCourses.map(c => c.courseId);

  // Find all enrollments for these courses
  const relatedEnrollments = state.enrollments.filter(e => courseIds.includes(e.courseId));

  const totalStudents = relatedEnrollments.length;
  
  const avgProgress = totalStudents > 0 
    ? Math.round(relatedEnrollments.reduce((acc, curr) => acc + curr.progress, 0) / totalStudents)
    : 0;

  // Fake active students based on last 7 days (simulated by looking at enrolledAt or progress > 0)
  const activeStudents = relatedEnrollments.filter(e => e.progress > 0).length;

  return {
    totalCourses: educatorCourses.length,
    totalStudents,
    avgProgress,
    activeStudents,
    courses: educatorCourses.map(course => ({
      ...course,
      studentCount: course.enrolledStudents.length,
      enrollments: relatedEnrollments.filter(e => e.courseId === course.courseId)
    }))
  };
};

export const getPlatformGlobalStats = () => {
  const state = getPlatformState();
  if (!state) return null;
  return {
    totalUsers: state.students.length + state.educators.length,
    totalCourses: state.courses.length,
    totalEnrollments: state.enrollments.length
  };
};
