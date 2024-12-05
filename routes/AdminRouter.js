const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// Admin Signup
router.post('/signup', adminController.adminSignup);

// Admin Login
router.post('/login', adminController.adminLogin);

module.exports = router;
