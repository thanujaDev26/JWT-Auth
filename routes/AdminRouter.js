const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.route('/signup')
    .post(adminController.adminSignup);

router.route('/login')
    .post(adminController.adminLogin);

module.exports = router;
