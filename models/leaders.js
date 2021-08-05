const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates the leaderSchema comments using mongoose
const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    }
}, {
    timestamps: true
});

//initializes the leaderSchema using mongoose
var Leaders = mongoose.model('Leader', leaderSchema);

//exports the module
module.exports = Leaders;