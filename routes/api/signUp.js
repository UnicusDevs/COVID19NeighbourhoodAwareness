const express = require('express');
const router = express.Router();

// Defining image specifics - Start:
const multer = require('multer');

// Defining types of files accepted. 
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
// Defining Image Storage Path and degining file name: 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
// Defining image specifics - End:


// Controller
const {signUp} = require('./../../controllers/authentication_controller');

// @route   POST api/signUp
// @desc    Create User
router.post('/',upload.single('ProductImage') ,signUp);

module.exports = router;