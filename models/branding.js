const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // For auto-increment

// Branding Schema
const brandingSchema = new mongoose.Schema({
    itemId: {
        type: Number,
        unique: true,
        required: true,
    },
    itemName: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    texture: {
        type: String,
        trim: true,
    },
    corners: {
        type: String,
        trim: true,
    },
    uploadDesign: { type: String, trim: true },
    itemImg: {
        type: String,
        trim: true,
    },
    quantity: { type: Number, trim: true },
    amount: { type: String, trim: true },
    gst: { type: Number, trim: true },
    delivery: { type: Number },
    totalAmount: { type: Number },
    details: { type: String, trim: true },
}, {
    timestamps: true,
});

// Apply auto-increment to itemId
brandingSchema.plugin(AutoIncrement, { inc_field: "itemId" });

module.exports = mongoose.model("Branding", brandingSchema);