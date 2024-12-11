require("dotenv").config();
const Amount = require('../models/amount');


/**
 * Create a new user
 */
const saveAmount = async(req, res) => {
    const { amount, phoneNumber, deliveryCharges, gst } = req.body;

    // Check if all required fields are present
    if (!amount || !phoneNumber || !deliveryCharges || !gst) {
        return res.status(400).json({ error: "Phone number, amount, GST, and delivery charges are required." });
    }

    // Validate the phone number (e.g., 10-digit format)
    const phoneNumberRegex = /^(?:\+?(\d{1,3}))?(\d{10})$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
        return res.status(400).json({ error: "Invalid phone number format. Please provide a valid phone number." });
    }

    try {
        // Calculate totalAmount
        const totalAmount = amount + deliveryCharges + (gst * amount);

        // Create a new Amount document
        const newAmountDetails = new Amount({ amount, phoneNumber, deliveryCharges, gst, totalAmount });

        // Save the document to MongoDB
        await newAmountDetails.save();

        // Respond with the saved details
        res.status(200).json(newAmountDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getAmount = async(req, res) => {
    console.log('fdf');
    const { phoneNumber } = req.params;
    try {
        const amountDetails = await Amount.findOne({ phoneNumber });

        if (!amountDetails) {
            return res.status(404).json({ error: 'Amount details not found for this phone number.' });
        }

        res.status(200).json(amountDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching amount details' });
    }
};

module.exports = {
    saveAmount,
    getAmount
};