const express = require('express');
const router = express.Router();

// Controller
const { imgUpload } = require('./../../controllers/fileUpload_controller.js');
const { signUp } = require('./../../controllers/user_controller.js')

// @route   POST api/signUp
// @desc    Create User

router.post('/', signUp);
router.post('/upload', imgUpload.single('file'), async (req,res) => {
  req.file.location
  await res.send(req.file.location)
});

module.exports = router;