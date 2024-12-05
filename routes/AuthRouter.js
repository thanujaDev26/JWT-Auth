const express = require('express');
const router = express.Router();
const Controller = require('../controllers/AuthController');

router.route('/refresh-token')
    .post(Controller.refreshAccessToken)

module.exports = router;
