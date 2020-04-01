const express = require('express');
const router = express.Router();

// Controller
const {signUp} = require('./../../controllers/authentication_controller');

// @route   POST api/signUp
// @desc    Create User
router.post('/', signUp);

module.exports = router;