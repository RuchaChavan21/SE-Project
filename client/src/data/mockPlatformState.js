export const defaultPlatformState = {
  courses: [
    {
      courseId: 'mock_1',
      title: 'Operating Systems',
      subject: 'Computer Science',
      educatorId: 'teacher_123',
      educatorName: 'Prof. Sharma',
      description: 'Learn the fundamentals of Process Management, CPU Scheduling, and Deadlocks.',
      difficulty: 'Intermediate',
      estimatedDuration: '6 Weeks',
      enrolledStudents: ['student_456', 'student_789'], // Fake students to simulate ecosystem
      createdAt: new Date().toISOString(),
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
        }
      ]
    }
  ],
  enrollments: [
    {
      enrollmentId: 'enr_456',
      studentId: 'student_456',
      courseId: 'mock_1',
      progress: 50,
      completedTopics: ['Process Management'],
      quizScores: { 'Process Management': 100 },
      enrolledAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      enrollmentId: 'enr_789',
      studentId: 'student_789',
      courseId: 'mock_1',
      progress: 0,
      completedTopics: [],
      quizScores: {},
      enrolledAt: new Date(Date.now() - 186400000).toISOString()
    }
  ],
  educators: [
    {
      id: 'teacher_123',
      name: 'Prof. Sharma',
      department: 'Computer Science',
      coursesPublished: ['mock_1']
    }
  ],
  students: [
    { id: 'student_456', name: 'Alex Johnson', level: 'intermediate' },
    { id: 'student_789', name: 'Maria Garcia', level: 'beginner' }
  ]
};
