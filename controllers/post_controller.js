const Post = require('./../models/Post');
const User = require('./../models/User');

// Below function gets all the posts
async function getAllPosts(req, res) {
  Post.find()
    .then(posts => res.json(posts))
};

// Below function creates a new post
async function createNewPost(req, res) {
  const user = await User.findOne({_id: req.body.User})
  
  const userId = user._id;
  const userSuburb = user.Suburb

  const newPost = new Post({
    User: userId, 
    DidSelfIsolate: req.body.DidSelfIsolate,
    Suburb: userSuburb,
    Claps: 0
  });

  console.log(newPost)

  try {
    const savedPost = await newPost.save()
    res.json(savedPost);
  } catch (err) {
    res.json({
      message: err
    })
  }
};

// The below function gets all the posts that match the user suburb.
async function getPostBasedOnSuburb(req, res) { 

  const user = await User.findOne({ email: req.body.User })
  Post.find({"Suburb": user.Suburb}).then(post => res.json(post))
};

module.exports = { getAllPosts, createNewPost, getPostBasedOnSuburb };