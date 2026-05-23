import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('edupath_courses');
    return saved ? JSON.parse(saved) : [
      // Mock Data with New Curriculum Structure
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
          { 
            title: "Process Management", 
            estimatedTime: "45 mins", 
            summary: "Learn about processes.",
            xp: 20,
            quiz: [
              {
                question: "What is a process in an operating system?",
                options: ["A program in execution", "A hardware component", "A type of memory", "A file system structure"],
                answer: "A program in execution",
                explanation: "A process is basically a program that is currently running."
              },
              {
                question: "Which of the following is responsible for process creation?",
                options: ["Memory Manager", "Process Scheduler", "File System", "I/O Manager"],
                answer: "Process Scheduler",
                explanation: "The Process Scheduler determines when and how processes are created and executed."
              }
            ]
          },
          { 
            title: "CPU Scheduling", 
            estimatedTime: "60 mins", 
            summary: "Scheduling algorithms.",
            xp: 30,
            quiz: [
              {
                question: "What is the main objective of multiprogramming?",
                options: ["To maximize CPU utilization", "To minimize memory usage", "To increase disk speed", "To manage network traffic"],
                answer: "To maximize CPU utilization",
                explanation: "Multiprogramming keeps multiple jobs in memory so the CPU always has something to execute."
              }
            ]
          },
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
        quizScores: {}, // Record scores per topic
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

  const completeTopic = (studentId, courseId, topicTitle, score = null) => {
    setEnrollments(prev => prev.map(e => {
      if (e.studentId === studentId && e.courseId === courseId) {
        const updatedScores = { ...e.quizScores };
        if (score !== null) {
          updatedScores[topicTitle] = score;
        }

        if (!e.completedTopics.includes(topicTitle)) {
          const updatedTopics = [...e.completedTopics, topicTitle];
          const course = courses.find(c => c._id === courseId);
          const totalTopics = course ? course.topics.length : 1;
          const progress = Math.round((updatedTopics.length / totalTopics) * 100);
          return { ...e, completedTopics: updatedTopics, progress, quizScores: updatedScores };
        } else {
          return { ...e, quizScores: updatedScores };
        }
      }
      return e;
    }));
  };

  return (
    <CourseContext.Provider value={{ courses, enrollments, publishCourse, enrollStudent, getMyEnrollments, completeTopic }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
