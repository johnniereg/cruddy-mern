var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedingSchema = new Schema({
    date: Date,
    foodType: String,
    foodAmountInGrams: Number,
    location: String,
    numberOfDucks: Number
    
});

module.exports = mongoose.model('Feeding', feedingSchema);