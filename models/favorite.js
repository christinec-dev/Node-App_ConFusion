const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates the leaderSchema comments using mongoose
const favoriteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dishes:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

//initializes the leaderSchema using mongoose
var Favorites = mongoose.model('Favorite', favoriteSchema);

//exports the module
module.exports = Favorites ;