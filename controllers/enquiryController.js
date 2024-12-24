const Enquiry = require('../models/enquiry');
/**
 * Create a new user
 */
const createEnquiry = async(req, res) => {
    const { name, email, description, number, type } = req.body;

    if (!name || !email || !description || !number || !type) {
        return res
            .status(400)
            .json({
                error: "Name, email,  description, subject and type are required.",
            });
    }

    try {
        const newEnquiry = new Enquiry({
            name,
            email,
            description,
            number,
            type,
        });

        // Save the document to MongoDB
        await newEnquiry.save();

        res.status(201).json({
            success: true,
            message: "Enquiry created successfully."
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to create enquiry. Please try again later.",
        });
    }
};

module.exports = {
    createEnquiry,
};