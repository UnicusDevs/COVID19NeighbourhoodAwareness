// Models
const User = require('./../models/User');

// Validation
const { signUpValidation, loginValidation } = require('../validation');

// Encryption & Tokens
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
  //Validating SignUp Body:
  const { error } = signUpValidation(req.body)
  if (error) return res.status(400).send(error);

  //Checking is user is already in DB:
  const emailExist = await User.findOne({ EmailAddress: req.body.EmailAddress });
  if (emailExist != null) return res.status(400).send({ error: 'Email already exists' });

  //Hash Passwords:
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.Password, salt);

  const post = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Suburb: req.body.Suburb,
    Password: hashPassword,
    EmailAddress: req.body.EmailAddress,
    Age: req.body.Age,
    ImageURL: req.file.path
  });



  try {
    const savedPost = await post.save();
    res.json({
      user: savedPost._id
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
};

async function login(req, res) {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error);

  //Checking is user exists:
  const user = await User.findOne({ EmailAddress: req.body.EmailAddress });
  if (!user) return res.status(400).send({ error: 'Email or password is wrong' });

  //Password is correct:
  const validPassword = bcrypt.compare(req.body.Password, user.Password);
  if (!validPassword) return res.status(400).send({ error: 'Email or password is wrong' });

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
};

module.exports = { signUp, login };
