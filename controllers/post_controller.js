const Post = require('./../models/Post');
const User = require('./../models/User');

// Below function gets all the posts
async function getAllPosts(req, res) {
  Post.find().then(posts => res.json(posts))
};

// Below function gets a specified number of posts
async function getPaginatedPosts(req, res) {
  const posts = await Post.find()
  console.log(posts)
  try {
    const page = parseInt(req.query.page)
    
    const limit = parseInt(req.query.limit)

  const posts = Post.find();
  
  const page = req.params.page_count;
  const limit = req.params.limit_count;

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

    // Return current page and limit
    results.page = {
      page: page,
      limit: limit,
    }  

    // Check if there is a next page
    if (endIndex < posts.length) {
      // Set next page
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    // Check if there is a previous page
    if (startIndex > 0) {
      // Set previous page
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }

    results.results = posts.slice(startIndex, endIndex)
    res.json(results)
  } catch (err) {
      res.json({
        message: err
      })
    }
}

// Alternative implementation of the above
// async function getPaginatedPosts(req, res) {
//   try {
//     const perPage = req.query.perPage
//       ? parseInt(req.query.perPage)
//       : 5;

//     const page = req.query.page
//       ? parseInt(req.query.page)
//       : 1;

//     const posts = await Post.find()
//       .skip ((page - 1 ) * perPage) 
//       .limit(perPage)
//       res.json({
//         posts, 
//         meta: {
//           page,
//           perPage
//         }}
//       )
//     } catch (err) {
//     next(err);
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