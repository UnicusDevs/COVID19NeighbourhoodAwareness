const express = require('express');
const router = express.Router();
const { getCurrentUser, getAllUsers } = require("../../controllers/user_controller");
const { getPostBasedOnSuburb } = require("./../../controllers/post_controller");

const Post = require('./../../models/Post');

router.get('/', getCurrentUser);

module.exports = router;


