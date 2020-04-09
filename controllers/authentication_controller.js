// Models
const User = require('./../models/User');

// Encryption & Tokens
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;

const checkToken = function (req, res) {

  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'] || "";

  if (!token) {
    res.status(401).send('Unauthorized: Please login or signup')
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token')
      } else {
        res.status(200).send("Hello")
      }
    })
  }
}

module.exports = {checkToken};