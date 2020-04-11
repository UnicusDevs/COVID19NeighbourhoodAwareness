const Post = require('./../models/Post');
const User = require('./../models/User');

// Below function gets all the posts
async function getAllPosts(req, res) {
  Post.find().then(posts => res.json(posts))
};

// Below function gets a specified number of posts
async function getPaginatedPosts(req, res, next) {
  const pageNumber = parseInt(req.query.pageNumber);
  const limit = parseInt(req.query.limit);
  const results = {}

  if (pageNumber < 0 || pageNumber === 0) {
    response = {"error": true, "message": "invalid page number"};
    return res.json(response)
  }
  results.skip = limit * (pageNumber -1)
  results.limit = limit

  Post.find({}, {}, results, function(err, data){
    if (err) {
      response = {"error": true, "message": "Error fetching data"}
    } else {
      response = {"error": false, "message": data};
    }
    res.json(response);
    console.log(pageNumber)
  });
};


// async function getPaginatedPosts(Post) {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)

//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     const results = {}

//     if (endIndex < await Post.countDocuments().exec()) {
//       results.next = {
//         page: page + 1,
//         limit: limit
//       }
//     }
    
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit
//       }
//     }
//     try {
//       results.results = await Post.find().limit(limit).skip(startIndex).exec()
//       res.getPaginatedPosts = results
//       next()
//     } catch (err) {
//       res.status(500).json({ message: err.message })
//     }
//   }
// }


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