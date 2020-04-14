const express = require('express');
const router = express.Router();

//Post Model 
const Post = require('../../models/Post');

// Controller 
const { getAllPosts, createNewPost, getPostBasedOnSuburb, increaseClap, getLatestPost } = require('./../../controllers/post_controller');
const { checkToken } = require("./../../controllers/authentication_controller");

// @route   POST api/post
// @desc    Create post

router.get('/', getAllPosts);
router.get('/suburb', getPostBasedOnSuburb);
router.get('/latest/:user_id', checkToken, getLatestPost);
router.post('/create', createNewPost);
router.post('/addClap/:post_id', increaseClap);





module.exports = router;