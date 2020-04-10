// Models
const User = require('./../models/User');

// Encryption & Tokens
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;

async function getUser({_id}) {
  const user = await User.findOne({_id})
  
  return user
}

const checkToken = function (req, res, next) {

  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'] || "";
  if (!token) {
    res.status(401).send('Unauthorized: Please login or signup')
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token')
      } else {
        getUser(decoded).then(user => {     
          req.success = true;
          req.user = user;
          next()
        })
      }
    })
  }
}

module.exports = {checkToken};