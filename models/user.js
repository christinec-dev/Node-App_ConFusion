const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//sets constraints for data entry types
var User = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//allows plugin
User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User);