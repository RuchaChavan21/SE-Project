import express from 'express';
import { createCourse, getCourses, enrollStudent, getStudentProgress } from '../controllers/courseController.js';

const router = express.Router();

router.post('/courses', createCourse);
router.get('/courses', getCourses);
router.post('/enroll', enrollStudent);
router.get('/progress/:studentId', getStudentProgress);

export default router;
