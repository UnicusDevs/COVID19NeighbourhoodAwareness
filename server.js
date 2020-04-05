const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
require('dotenv/config');

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

app.use(express.static('uploads'));
// Example: http://localhost:5000/2020-04-05T15:34:54.325ZTest-Image.png

//Region End -  Upload Images Middleware

//Connecting to MongoDB
mongoose.connect(process.env.DB_CONNECTION, 
                { useNewUrlParser: true },
                ()=>console.log("Connected to DB"))

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});