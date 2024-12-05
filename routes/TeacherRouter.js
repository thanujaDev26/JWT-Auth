const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/TeacherController');
const authToken = require('../middleware/auth');


router.route('/signup')
    .post(teacherController.teacherSignup);

router.route('/login')
    .post(authToken,teacherController.teacherLogin);

router.route('/dashboard')
    .get(authToken, teacherController.getDashboard);

router.route('/refresh')
    .post(teacherController.getToken)

module.exports = router;
