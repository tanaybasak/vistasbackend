const mongoose = require('mongoose');

// User Schema
const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Payment', paymentSchema);