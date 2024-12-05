const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');


router.route('/signup')
    .post(studentController.studentSignup);

router.route('/login')
    .post(studentController.studentLogin);

module.exports = router;
