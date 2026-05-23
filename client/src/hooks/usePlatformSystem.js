import { usePlatformState } from '../context/PlatformStateProvider';
import * as courseService from '../services/courseService';
import * as enrollmentService from '../services/enrollmentService';
import * as analyticsService from '../services/analyticsService';

// Unified hook to access platform data and service actions from components
export const usePlatformSystem = () => {
  const { platformData, refreshPlatformState } = usePlatformState();

  const handleCreateCourse = (courseData, educatorId, educatorName) => {
    const newCourse = courseService.createCourse(courseData, educatorId, educatorName);
    refreshPlatformState();
    return newCourse;
  };

  const handleEnrollStudent = (studentId, courseId) => {
    const enrollment = enrollmentService.enrollStudent(studentId, courseId);
    refreshPlatformState();
    return enrollment;
  };

  const handleCompleteTopic = (studentId, courseId, topicTitle, score) => {
    const res = enrollmentService.updateTopicProgress(studentId, courseId, topicTitle, score);
    refreshPlatformState();
    return res;
  };

  return {
    platformData,
    courses: platformData?.courses || [],
    enrollments: platformData?.enrollments || [],
    
    // Actions
    createCourse: handleCreateCourse,
    enrollStudent: handleEnrollStudent,
    completeTopic: handleCompleteTopic,

    // Getters
    getStudentEnrollments: (studentId) => enrollmentService.getStudentEnrollments(studentId),
    getEducatorCourses: (educatorId) => courseService.getEducatorCourses(educatorId),
    getEducatorAnalytics: (educatorId) => analyticsService.getEducatorAnalytics(educatorId),
    getGlobalStats: () => analyticsService.getPlatformGlobalStats()
  };
};
