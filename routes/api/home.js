const express = require('express');
const router = express.Router();

// Controller
const { checkToken } = require('./../../controllers/authentication_controller.js');
const { getCurrentUser, getAllUsers } = require("../../controllers/user_controller");
const { getPostBasedOnSuburb } = require("./../../controllers/post_controller");

router.get('/', getCurrentUser, getPostBasedOnSuburb );

module.exports = router;


