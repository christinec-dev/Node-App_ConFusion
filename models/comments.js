const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates the comments Schema using mongoose
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }, 
    },{
    timestamps: true
});

//initializes the schema using mongoose
var Comments = mongoose.model('Comment', commentSchema);

//exports the module
module.exports = Comments;