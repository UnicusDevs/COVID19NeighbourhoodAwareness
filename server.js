const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

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


//Connecting to MongoDB
mongoose.connect(process.env.DB_CONNECTION, 
                { useNewUrlParser: true },
                ()=>console.log("Connected to DB"))

// // create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });