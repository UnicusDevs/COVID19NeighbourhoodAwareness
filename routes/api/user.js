const express = require('express');
const router = express.Router();

// User Model 
const User = require('../../models/User');

// Controller
const { getCurrentUser, getAllUsers } = require("../../controllers/user_controller");
const { checkToken } = require("./../../controllers/authentication_controller");

// @route   GET api/Items
// @desc    GET all items
router.get('/', getAllUsers);
router.get('/current', checkToken, getCurrentUser)
router.get('/:user_id', getCurrentUser)

module.exports = router;
