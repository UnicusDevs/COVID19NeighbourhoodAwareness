const Post = require('./../models/Post');
const User = require('./../models/User');

// Below function gets all the posts
async function getAllPosts(req, res) {
  Post.find().then(posts => res.json(posts))
};

// Below function gets a specified number of posts
async function getPaginatedPosts(req, res) {
  try {
    const perPage = req.query.perPage
      ? parseInt(req.query.perPage)
      : 10;

    const page = req.query.page
      ? parseInt(req.query.page)
      : 1;

    const posts = await Post.find()
      .skip ((page - 1 ) * perPage) 
      .limit(perPage)
      res.json(
        posts, {
        docs: {
          page,
          perPage
        }}
      )
    } catch (err) {
    next(err);
  }
}


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

module.exports = { getAllPosts, getPaginatedPosts, createNewPost, getPostBasedOnSuburb };