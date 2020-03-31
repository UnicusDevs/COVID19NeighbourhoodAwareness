const express = require('express');
const router = express.Router();

// User Model 
const User = require('../../models/User');

// Controller
const { getCurrentUser } = require("../../controllers/user_controller");

// @route   GET api/Items
// @desc    GET all items
router.get('/',(req,res) => {
    User.find()
        .sort({date: -1})
        .then(items => res.json(items))
})

router.get('/:user_id', getCurrentUser)

module.exports = router;
