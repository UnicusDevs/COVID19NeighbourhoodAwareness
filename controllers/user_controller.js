// Encryption
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

// Validation
const { signUpValidation, loginValidation } = require("../validation");

// Login
async function login(req, res) {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  //Checking is user exists:
  const user = await User.findOne({ EmailAddress: req.body.EmailAddress });
  if (!user)
    return res.status(400).send({ error: "Email or password is wrong" });

  //Password is correct:
  const validPassword = bcrypt.compare(req.body.Password, user.Password);
  if (!validPassword)
    return res.status(400).send({ error: "Email or password is wrong" });

  //Create and assign token
  let token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  res.header("auth-token", token).send(token);
}

// SignUp
async function signUp(req, res) {
  //Validating SignUp Body:
  // validation is causing issue with await and file upload. Commented out till figured out.
  // const { error } = signUpValidation(req.body)
  // if (error) return res.status(400).send(error);

  //Checking is user is already in DB:
  const emailExist = await User.findOne({
    EmailAddress: req.body.EmailAddress,
  });
  if (emailExist != null)
    return res.status(400).send({ error: "Email already exists" });

  //Hash Passwords:
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.Password, salt);

  try {
    const post = new User({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Suburb: req.body.Suburb,
      Password: hashPassword,
      EmailAddress: req.body.EmailAddress,
      Age: req.body.Age,
      ImageURL: req.body.ImageURL,
    });

    const savedUser = await post.save();
    res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
}

// Get profile Data
async function getUserProfileStuff(user, currentUser = false) {
  const { EmailAddress, FirstName, LastName, Suburb, Age } = user;

  return {
    _id: User._id,
    EmailAddress,
    FirstName,
    LastName,
    Suburb,
    Age,
  };
}

// Get current user
async function getCurrentUser(req, res) {
  try {
    if (req.user === undefined) {
      res.json({
        message: "No user",
      });
    } else if (req.user) {
      const {
        id,
        FirstName,
        LastName,
        Suburb,
        EmailAddress,
        Age,
        ImageURL,
      } = req.user;

      const userData = {
        id: id,
        FirstName: FirstName,
        LastName: LastName,
        Suburb: Suburb,
        EmailAddress: EmailAddress,
        Age: Age,
        ImageURL: ImageURL,
      };
      res.json({ ...userData, success: req.success });
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUser(req, res) {
  const user = await User.findOne({ _id: req.params.user_id });
  const { FirstName, LastName, Age, ImageURL } = user;

  try {
    res.json({
      FirstName: FirstName,
      LastName: LastName,
      Age: Age,
      ImageURL: ImageURL,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    User.find()
      .sort({ date: -1 })
      .then((users) => res.json(users));
  } catch (err) {
    res.json({
      message: err,
    });
  }
}

async function editCurrentUser(req, res) {
  console.log(req.body);
  try {
    if (req.body === undefined) {
      res.json({
        message: "No user",
      });
    } else if (req.body) {
      const {
        id,
        FirstName,
        LastName,
        Suburb,
        EmailAddress,
        Age,
        ImageURL,
      } = req.body;

      const user = await User.findOneAndUpdate(
        { EmailAddress: EmailAddress },
        {
          id: id,
          FirstName: FirstName,
          LastName: LastName,
          Suburb: Suburb,
          Age: Age,
          ImageURL: ImageURL,
        },
        {
          new: true,
        }
      );
      if (!user) return res.status(400).send({ error: "User not found" });

      res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getCurrentUser,
  getAllUsers,
  signUp,
  login,
  getUser,
  editCurrentUser,
};
