const express = require('express');
const router = express.Router();

//Post Model 
const Post = require('../../models/Post');

// Controller 
const { getAllPosts, getPaginatedPosts, getPostBasedOnSuburb, getLatestPost, createNewPost, increaseClap } = require('./../../controllers/post_controller');
const { checkToken } = require("./../../controllers/authentication_controller");

// @route   POST api/post
// @desc    Create post

// Gets
router.get('/', getAllPosts);
router.get('/suburb/:user_id', checkToken, getPostBasedOnSuburb);
router.get('/latest/:user_id', checkToken, getLatestPost);
router.get('/limit', getPaginatedPosts);

// Posts
router.post('/create', createNewPost);
router.post('/addClap/:post_id', increaseClap);





module.exports = router;