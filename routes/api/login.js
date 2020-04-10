const express = require('express');
const router = express.Router();

// Controller
const { login } = require('./../../controllers/user_controller');

router.post('/', login);

module.exports = router;
