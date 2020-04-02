const express = require('express');
const router = express.Router();

// Controller
const { login } = require('./../../controllers/authentication_controller');

router.post('/', login);

module.exports = router;
