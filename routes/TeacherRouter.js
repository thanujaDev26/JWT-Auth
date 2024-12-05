const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/TeacherController');


router.route('/signup')
    .post(teacherController.teacherSignup);


router.route('/login')
    .post(teacherController.teacherLogin);

module.exports = router;
