const mongoose = require("mongoose");

// User Schema
const amountSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                // Regex for validating a 10-digit phone number
                return /^(?:\+?(\d{1,3}))?(\d{10})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    gst: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: false
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Amount", amountSchema);