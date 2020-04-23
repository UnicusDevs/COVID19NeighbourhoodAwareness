const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

require('dotenv/config');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//Middleware to accept Body
app.use(bodyParser.json() );

//Region Start - Routing for Sign Up
const signUp = require('./routes/api/signUp');
app.use('/signUp', signUp);
//Region End - Routing for Sign Up

//Region Start - Routing for Sign Up
const login = require('./routes/api/login');
app.use('/login', login);
//Region End - Routing for Sign Up

//Region Start - Routing for Post
const post = require('./routes/api/post');
app.use('/post', post);
//Region End - Routing for Post

//Region Start - Routing for Sign Up
const user = require('./routes/api/user');
app.use('/user', user);
//Region End - Routing for Sign Up

//Region Start - Upload Images Middleware
app.use('/uploads',express.static('uploads'));
// Example: http://localhost:5000/uploads/2020-04-05T15:34:54.325ZTest-Image.png
//Region End -  Upload Images Middleware

//Region Start - Routing for Homepage
const home = require('./routes/api/home');
app.use('/', home);
// Region End - Routing for Homepage


// Connecting to MongoDB
// Handles local database and live database.
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.DB_CONNECTION_LIVE,
    { useNewUrlParser: true },
    () => console.log("Connected to DB"))
} else if (process.env.NODE_ENV === 'local') {
  mongoose.connect(process.env.DB_CONNECTION_TEST,
    { useNewUrlParser: true },
    () => console.log("Connected to DB"))
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })