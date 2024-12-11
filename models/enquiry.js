const mongoose = require('mongoose');

// User Schema
const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    number: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Enquiry', enquirySchema);