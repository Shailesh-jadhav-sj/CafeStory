const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservSchema = new Schema({
    userId: {
        type: String,
        ref:"User"
    },
    From: {
        type: Number,
        required: true
    },
    To:{
        type: Number,
        required: true
    },
    Date1: {
        type: Date,
        required: true
    },
    Table: {
        type: Number,
        required: true
    },
    
});

module.exports = Reserv = mongoose.model('Reserv',ReservSchema);   