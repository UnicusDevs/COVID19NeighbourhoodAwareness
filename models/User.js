const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: {
        type: String,
        required:true
    },
    LastName: {
        type: String,
        required:true
    },
    Suburb: {
        type: String,
        required:true
    },
    EmailAddress: {
        type: String,
        required:true
    },
    Age: {
        type: Number,
        required:true
    },
    Password: {
        type: String,
        required:true
    },
    ImageURL:{
        type: String
    }
});

module.exports = User = mongoose.model('user', UserSchema);