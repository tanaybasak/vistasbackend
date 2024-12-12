const Branding = require("../models/branding");

const saveBranding = async(req, res) => {
    const {
        itemId,
        itemName,
        description,
        texture,
        corners,
        uploadDesign,
        itemImg,
        quantity,
        amount,
        details,
    } = req.body;

    try {

        const gst = 0.05 * (quantity * amount);
        const delivery = 50;
        const totalAmount = (quantity * amount) + delivery + gst;
        // Create a new Amount document
        const newBranding = new Branding({
            itemId,
            itemName,
            description,
            texture,
            corners,
            uploadDesign,
            itemImg,
            quantity,
            amount,
            gst,
            delivery,
            totalAmount,
            details,
        });

        // Save the document to MongoDB
        await newBranding.save();

        // Respond with the saved details
        res.status(200).json(newBranding);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


const getBranding = async(req, res) => {
    const { itemId } = req.params;

    try {
        // Find a branding document by the itemId field
        const branding = await Branding.findOne({ itemId }).sort({ createdAt: -1 });

        if (!branding) {
            return res.status(404).json({ message: "Branding item not found" });
        }

        // Respond with the found branding data
        res.status(200).json(branding);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    saveBranding,
    getBranding
}