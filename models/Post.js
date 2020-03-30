const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  User: {
    type: ObjectId,
    ref: 'user',
    required: true
  },
  DidSelfIsolate: {
    type: Boolean
  },
  Claps: {
    type: Number
  }
}, { timestamps: true });

module.exports = User = mongoose.model('post', PostSchema);