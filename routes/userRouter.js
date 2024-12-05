const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.route('/login')
    .post(userController.getUserLogin);

router.route('/token')
    .post(userController.getToken);

router.route('/signup')
    .post(userController.getUserSignup);

module.exports = router;
