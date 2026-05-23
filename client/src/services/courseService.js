// Helper to load/save raw platform state from localStorage
const STORAGE_KEY = 'edupath_platform_state';

export const getPlatformState = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const setPlatformState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const createCourse = (courseData, educatorId, educatorName) => {
  const state = getPlatformState();
  if (!state) return null;

  const newCourse = {
    courseId: `course_${Date.now()}`,
    ...courseData,
    educatorId,
    educatorName,
    enrolledStudents: [], // Starts empty
    createdAt: new Date().toISOString()
  };

  state.courses.unshift(newCourse);
  
  // Also update educator's published courses
  const eduIndex = state.educators.findIndex(e => e.id === educatorId);
  if (eduIndex !== -1) {
    state.educators[eduIndex].coursesPublished.push(newCourse.courseId);
  }

  setPlatformState(state);
  return newCourse;
};

export const getAllCourses = () => {
  const state = getPlatformState();
  return state ? state.courses : [];
};

export const getEducatorCourses = (educatorId) => {
  const state = getPlatformState();
  if (!state) return [];
  return state.courses.filter(c => c.educatorId === educatorId);
};
