const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservSchema = new Schema({
    user_id: {
        type: String,
        ref:"User"
    },
    From: {
        type: String,
        required: true
    },
    To:{
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Table: {
        type: Number,
        required: true
    },
    
});

module.exports = Reserv = mongoose.model('Reserv',ReservSchema);   