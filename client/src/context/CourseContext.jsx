import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('edupath_courses');
    return saved ? JSON.parse(saved) : [
      // Mock Data so demo isn't empty initially
      {
        _id: 'mock_1',
        title: 'Operating Systems',
        description: 'Learn the fundamentals of Process Management, CPU Scheduling, and Deadlocks.',
        teacherId: 'teacher_123',
        teacherName: 'Prof. Sharma',
        difficulty: 'Intermediate',
        duration: '6 Weeks',
        enrolledCount: 142,
        topics: [
          { title: "Process Management", estimatedTime: "45 mins", summary: "Learn about processes." },
          { title: "CPU Scheduling", estimatedTime: "60 mins", summary: "Scheduling algorithms." },
        ],
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [enrollments, setEnrollments] = useState(() => {
    const saved = localStorage.getItem('edupath_enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('edupath_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('edupath_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  const publishCourse = (courseData) => {
    const newCourse = {
      _id: Date.now().toString(),
      ...courseData,
      enrolledCount: 0,
      createdAt: new Date().toISOString()
    };
    setCourses([newCourse, ...courses]);
    return newCourse;
  };

  const enrollStudent = (studentId, courseId) => {
    const exists = enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
    if (!exists) {
      const newEnrollment = {
        _id: Date.now().toString(),
        studentId,
        courseId,
        progress: 0,
        completedTopics: [],
        enrolledAt: new Date().toISOString()
      };
      setEnrollments([...enrollments, newEnrollment]);
    }
  };

  const getMyEnrollments = (studentId) => {
    return enrollments
      .filter(e => e.studentId === studentId)
      .map(e => ({
        ...e,
        course: courses.find(c => c._id === e.courseId)
      }))
      .filter(e => e.course); // ensure course exists
  };

  return (
    <CourseContext.Provider value={{ courses, enrollments, publishCourse, enrollStudent, getMyEnrollments }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
