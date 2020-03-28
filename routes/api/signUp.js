const express = require('express');
const router = express.Router();
const {signUpValidation} = require('../../validation');
//User Model 
const User = require('../../models/User');

// @route   POST api/signUp
// @desc    Create User
router.post('/',async (req,res) =>{

    //Validating SignUp Body:
    const {error} = signUpValidation(req.body)
    if (error) return res.status(400).send(error);

    const post = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Suburb: req.body.Suburb,
        Password: req.body.Password,
        EmailAddress: req.body.EmailAddress,
        Age: req.body.Age
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }
})

module.exports = router;