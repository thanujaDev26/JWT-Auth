const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');
const authToken = require('../middleware/auth');



router.route('/signup')
    .post(studentController.studentSignup);

router.route('/login')
    .post(studentController.studentLogin);

router.route('/dashboard')
    .get(authToken, studentController.getDashboard);

router.route('/refresh')
    .post(studentController.getToken)

module.exports = router;
