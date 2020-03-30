const express = require('express');
const router = express.Router();

//Post Model 
const Post = require('../../models/Post');

// @route   POST api/post
// @desc    Create post
router.post('/create', async (req, res) => {

  const newPost = new Post({
    User: req.body.User,
    DidSelfIsolate: req.body.DidSelfIsolate
  });

  try {
    newPost.save();
    res.json({
      post: newPost._id
    });
  }catch(err) {
    res.json({
      message: err
    })
  }
})

module.exports = router;