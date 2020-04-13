const Post = require('./../models/Post');
const User = require('./../models/User');

// Below function gets all the posts
async function getAllPosts(req, res) {
  Post.find().sort({ createdAt: -1 }).then(posts => res.json(posts))
};

// Below function creates a new post
async function createNewPost(req, res) {

  const user = await User.findOne({_id: req.body.User})
  const userId = user.id;
  const userSuburb = user.Suburb

  const newPost = new Post({
    User: userId, 
    DidSelfIsolate: req.body.DidSelfIsolate,
    Suburb: userSuburb,
    Claps: 0
  });

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

async function getLatestPost(req, res) {
  console.log(req.params);
}

async function increaseClap(req, res) {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.post_id }, { $inc: { Claps: + 1 } })
  } catch (err) {
    res.json({
      message: err
    })
  }
}

module.exports = { getAllPosts, createNewPost, getPostBasedOnSuburb, increaseClap, getLatestPost };