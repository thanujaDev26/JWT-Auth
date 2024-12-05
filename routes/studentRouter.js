const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');

// Student Signup
router.post('/signup', studentController.studentSignup);

// Student Login
router.post('/login', studentController.studentLogin);

module.exports = router;
