const express = require('express');
const router = express.Router();

// Controller
const { imgUpload } = require('./../../controllers/fileUpload_controller.js');
const { signUp } = require('./../../controllers/user_controller.js')

// @route   POST api/signUp
// @desc    Create User

router.get('/'); 

router.post('/', signUp);
router.post('/upload', imgUpload.single('file'), async (req,res) => {
  if (req.file) {
    await res.send(req.file.location)
  } else {
    res.send("https://neighbours-book.s3-ap-southeast-2.amazonaws.com/userDefaultImage.png")
  }
});

module.exports = router;