const Post = require('./../models/Post');

async function getAllPosts(req, res) {
  Post.find()
    .then(posts => res.json(posts))
}

module.exports = { getAllPosts };