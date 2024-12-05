const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/TeacherController');

// Teacher Signup
router.post('/signup', teacherController.teacherSignup);

// Teacher Login
router.post('/login', teacherController.teacherLogin);

module.exports = router;
