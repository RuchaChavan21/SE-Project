import { getPlatformState, setPlatformState } from './courseService';

export const enrollStudent = (studentId, courseId) => {
  const state = getPlatformState();
  if (!state) return null;

  // Check if already enrolled
  const exists = state.enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
  if (exists) return exists;

  const newEnrollment = {
    enrollmentId: `enr_${Date.now()}`,
    studentId,
    courseId,
    progress: 0,
    completedTopics: [],
    quizScores: {},
    enrolledAt: new Date().toISOString()
  };

  state.enrollments.push(newEnrollment);

  // Add student to course's enrolled list (simulating backend ecosystem)
  const courseIndex = state.courses.findIndex(c => c.courseId === courseId);
  if (courseIndex !== -1 && !state.courses[courseIndex].enrolledStudents.includes(studentId)) {
    state.courses[courseIndex].enrolledStudents.push(studentId);
  }

  setPlatformState(state);
  return newEnrollment;
};

export const getStudentEnrollments = (studentId) => {
  const state = getPlatformState();
  if (!state) return [];
  
  return state.enrollments
    .filter(e => e.studentId === studentId)
    .map(e => ({
      ...e,
      course: state.courses.find(c => c.courseId === e.courseId)
    }))
    .filter(e => e.course);
};

export const updateTopicProgress = (studentId, courseId, topicTitle, score = null) => {
  const state = getPlatformState();
  if (!state) return;

  const enrIndex = state.enrollments.findIndex(e => e.studentId === studentId && e.courseId === courseId);
  if (enrIndex !== -1) {
    const enrollment = state.enrollments[enrIndex];
    const course = state.courses.find(c => c.courseId === courseId);
    
    if (score !== null) {
      enrollment.quizScores[topicTitle] = score;
    }

    if (!enrollment.completedTopics.includes(topicTitle)) {
      enrollment.completedTopics.push(topicTitle);
      const totalTopics = course ? course.topics.length : 1;
      enrollment.progress = Math.round((enrollment.completedTopics.length / totalTopics) * 100);
    }
    
    setPlatformState(state);
    return enrollment;
  }
};
