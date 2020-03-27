const express = require('express');
const router = express.Router();

//Item Model 
const User = require('../../models/User');

// @route   POST api/signUp
// @desc    Create User
router.post('/',async (req,res) =>{
    console.log(req.body);
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