const express = require('express');
const router = express.Router();

// Controller
const {signUp, upload} = require('./../../controllers/user_controller');

// @route   POST api/signUp
// @desc    Create User
router.post('/',upload.single('ProductImage') ,signUp);

module.exports = router;