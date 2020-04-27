const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_NAME
});

const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  })
});

module.exports = { imgUpload, };

