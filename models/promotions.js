const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// //enables mongoose currency type converter
// require('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency //!!deprecated;

//creates the promoSchema comments using mongoose
const promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
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

//initializes the promoSchema using mongoose
var Promotions = mongoose.model('Promotion', promoSchema);

//exports the module
module.exports = Promotions;