// Encryption
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require("../models/User");

// Validation
const { signUpValidation, loginValidation } = require('../validation');
// Defining image specifics - Start:
const multer = require('multer');

// Defining types of files accepted. 
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// Defining Image Storage Path and degining file name: 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
// Defining image specifics - End:

// Login
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

// SignUp
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
    // ImageURL: req.file.path
  });

  try {
    const savedUser = await post.save();
    res.json(savedUser)
  } catch (err) {
    res.json({
      message: err
    });
  }
};

// Get profile Data
async function getUserProfileStuff(user, currentUser = false) {
  const { EmailAddress, FirstName, LastName, Suburb, Age  } = user;

  return {
    _id: User._id,
    EmailAddress,
    FirstName,
    LastName,
    Suburb,
    Age
  }
};

async function getUserProfile(req, res) {
  // get user profile data
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  if (user) {
    const isCurrentUser = req.user && (user_id === req.user._id);
    const userDisplayData = await getUserProfileStuff(user, isCurrentUser);
    res.json(userDisplayData);
  }
  else {
    res.status(400).end();
  }
}


// Get current user
async function getCurrentUser(req, res) {

  // get currently logged-in user's data
  const userDisplayData = await getUserProfile(req.body, true);
  console.log(userDisplayData)
  if (userDisplayData) {
    res.json({ ...userDisplayData, success: req.success });
  }
  else {
    res.send();
  }
};


// Get all users
async function getAllUsers(req, res) {
  User.find()
    .sort({date: -1})
    .then(users => res.json(users))
};

module.exports = { getCurrentUser, getAllUsers, signUp, login, upload };