const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const authToken = require('../middleware/auth');


router.route('/signup')
    .post(adminController.adminSignup);

router.route('/login')
    .post(adminController.adminLogin);

// router.route('/token')
//     .post(adminController.getToken);

module.exports = router;
