const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

//Item Model 
const User = require('../../models/User');

//VALIDATION:

const schema = Joi.object({
    FirstName: Joi.string()
             .min(3)
             .required(),
    LastName: Joi.string()
            .min(3)
            .required(),
    Suburb: Joi.string()
            .min(3)
            .required(),
    EmailAddress: Joi.string().min(3)
                     .required()
                     .email(),
    Age: Joi.number().min(1).required(),
    Password: Joi.string()
                 .min(6)
                 .required()
});

// @route   POST api/signUp
// @desc    Create User
router.post('/',async (req,res) =>{
    console.log(req.body);

    //Validating SignUp Body:
    const {error} = schema.validate(req.body); 
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