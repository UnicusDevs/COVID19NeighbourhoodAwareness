const Post = require('./../models/Post');
const User = require('./../models/User');

// Below function gets all the posts
async function getAllPosts(req, res) {
  // Post.find().sort({ createdAt: -1 }).then(posts => res.json(posts))
  Post.find().sort({ createdAt: -1 }).limit(6).then(posts => res.json(posts))
};

// Below function gets a specified number of posts
async function getPaginatedPosts(req, res) {

  let page, limit, userId, skip, lastPage, query;

  page = parseInt(req.query.page)
  limit = parseInt(req.query.limit)
  skip = (page) * limit;
  lastPage = page * limit;
  
  
  // The below returns all post regardless of user suburb
  if (req.query.id === undefined) {  

    const paginate = {}

    let counts = await Post.countDocuments()

    if (skip > 0) {
      paginate.prev = {
        page: page - 1,
        limit: limit
      }
    }

    //For next page
    if (lastPage < counts) {
      paginate.next = {
        page: page + 1,
        limit: limit
      }
    }

    try {
      const posts = await Post.find()
        .sort({ createdAt: (-1) })
        .skip(skip).limit(limit)
        .then(posts => res.json(posts));
      // console.log(posts)
    } catch (err) {
      res.json({
        message: err
      })
    }
    // The below filters based on the users suburb
  } else if (req.query.id) {

    userId = req.query.id;

    const user = await User.findOne({ _id: userId });    
    let counts = await Post.find({ "Suburb": user.Suburb }).countDocuments();

    if (skip > 0) {
      paginate.prev = {
        page: page - 1,
        limit: limit
      }
    }

    //For next page
    if (lastPage < counts) {
      paginate.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    try {
      const posts = await Post.find({ "Suburb": user.Suburb }).sort({ createdAt: -1 }).skip(skip).limit(limit).then(posts => res.json(posts))
    } catch (err) {
      console.log(err)
      res.json({
        message: err
      })
    }
  } 
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
  try {
    const user = await User.findOne({ _id: req.params.user_id })
    Post.find({ "Suburb": user.Suburb }).sort({ createdAt: -1 }).limit(6).then(post => res.json(post))
  } catch (err) {
    console.log(err)
    res.json({
      message: err
    })
  }
};

async function getLatestPost(req, res) {
  const post = Post.find({User: req.params.user_id}).sort({createdAt: -1}).limit(1).then(post => res.json(post))
};

async function increaseClap(req, res) {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.post_id }, { $inc: { Claps: + 1 } })
  } catch (err) {
    res.json({
      message: err
    })
  }
};

module.exports = { getAllPosts, getPaginatedPosts, createNewPost, getPostBasedOnSuburb, increaseClap, getLatestPost };
