const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredient:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

module.exports = Item = mongoose.model('item',ItemSchema);