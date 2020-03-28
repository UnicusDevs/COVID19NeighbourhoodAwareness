const express = require('express');
const router = express.Router();
const { loginValidation } = require('../../validation');
const bcrypt = require('bcryptjs');

//User Model 
const User = require('../../models/User');

router.post('/', async (req,res) => {
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error);

    //Checking is user exists:
    const user = await User.findOne({EmailAddress: req.body.EmailAddress});
    if (!user) return res.status(400).send({error:'Email or password is wrong'});
    
    //Password is correct:
    const validPassword = bcrypt.compare(req.body.Password, user.Password); 
    if(!validPassword) return res.status(400).send({error: 'Email or password is wrong'});

    res.send({
            error: null,
            id: user._id
        })

});
module.exports = router;
