const mongoose = require('mongoose');

// User Schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Orders', orderSchema);