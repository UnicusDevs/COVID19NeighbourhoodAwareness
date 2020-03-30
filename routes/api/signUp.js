const express = require('express');
const router = express.Router();
const {signUpValidation} = require('../../validation');
const bcrypt = require('bcryptjs');

//User Model 
const User = require('../../models/User');



// @route   POST api/signUp
// @desc    Create User
router.post('/', async (req,res) =>{

    //Validating SignUp Body:
    const {error} = signUpValidation(req.body)
    if (error) return res.status(400).send(error);


    //Checking is user is already in DB:
    const email = req.body.EmailAddress;
    const emailExist = await User.findOne({ EmailAddress: email });

    //Hash Passwords:
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password,salt);
    
    const post = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Suburb: req.body.Suburb,
        Password: hashPassword,
        EmailAddress: req.body.EmailAddress,
        Age: req.body.Age
    });
  
    try {
        const savedPost = await post.save();
        res.json({ 
                user: post._id 
            });
    }catch(err){
        res.json({
            message:err
        } );
    }
})

module.exports = router;