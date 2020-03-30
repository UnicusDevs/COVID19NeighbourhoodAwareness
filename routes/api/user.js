const express = require('express');
const router = express.Router();

//Item Model 
const User = require('../../models/User');

// @route   GET api/Items
// @desc    GET all items
router.get('/',(req,res) => {
    User.find()
        .sort({date: -1})
        .then(items => res.json(items))
})

module.exports = router;
