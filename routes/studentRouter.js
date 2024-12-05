const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');
const authToken = require('../middleware/auth');

router.route('/signup')
    .post(studentController.studentSignup);

router.route('/login')
    .post(authToken,studentController.studentLogin);

module.exports = router;
