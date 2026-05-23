import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import mongoose from 'mongoose';

// In-memory mock DB for Hackathon fallback
let mockCourses = [];
let mockEnrollments = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

export const createCourse = async (req, res) => {
  try {
    const { title, description, teacherId, roadmap, topics, difficulty, duration } = req.body;

    if (isDbConnected()) {
      const course = new Course({ title, description, teacherId, roadmap, topics, difficulty, duration });
      await course.save();
      return res.status(201).json({ success: true, data: course });
    } else {
      const mockCourse = { _id: Date.now().toString(), title, description, teacherId, roadmap, topics, difficulty, duration, createdAt: new Date() };
      mockCourses.push(mockCourse);
      return res.status(201).json({ success: true, data: mockCourse });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    if (isDbConnected()) {
      const courses = await Course.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: courses });
    } else {
      return res.json({ success: true, data: mockCourses });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (isDbConnected()) {
      const existing = await Enrollment.findOne({ studentId, courseId });
      if (existing) return res.status(400).json({ success: false, message: "Already enrolled" });

      const enrollment = new Enrollment({ studentId, courseId });
      await enrollment.save();
      return res.status(201).json({ success: true, data: enrollment });
    } else {
      const existing = mockEnrollments.find(e => e.studentId === studentId && e.courseId === courseId);
      if (existing) return res.status(400).json({ success: false, message: "Already enrolled" });

      const mockEnrollment = { _id: Date.now().toString(), studentId, courseId, progress: 0, completedTopics: [], enrolledAt: new Date() };
      mockEnrollments.push(mockEnrollment);
      return res.status(201).json({ success: true, data: mockEnrollment });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentProgress = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (isDbConnected()) {
      const enrollments = await Enrollment.find({ studentId }).populate('courseId');
      return res.json({ success: true, data: enrollments });
    } else {
      const studentEnrollments = mockEnrollments.filter(e => e.studentId === studentId);
      const populated = studentEnrollments.map(e => ({
        ...e,
        courseId: mockCourses.find(c => c._id === e.courseId)
      }));
      return res.json({ success: true, data: populated });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
