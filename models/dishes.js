const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates the dishSchema using mongoose
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
}, {
    timestamps: true
});

//initializes the dishSchema using mongoose
var Dishes = mongoose.model('Dish', dishSchema);

//exports the module
module.exports = Dishes;