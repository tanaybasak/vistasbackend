const connectToDatabase = require('../db/connection');

/**
 * Create a new user
 */
const createEnquiry = async(req, res) => {
    const { name, email, description, number, type } = req.body;

    if (!name || !email || !description || !number || !type) {
        return res.status(400).json({ error: 'Name, email,  description, subject and type are required.' });
    }

    try {
        const client = await connectToDatabase();
        const database = client.db('printvistas'); // Replace with your database name
        const collection = database.collection('enquiry'); // Replace with your collection name

        const newEnquiry = { name, email, description, number, type };
        const result = await collection.insertOne(newEnquiry);

        res.status(201).json({
            success: true,
            message: 'Enquiry created successfully.',
            userId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to create enquiry. Please try again later.',
        });
    }
};

module.exports = {
    createEnquiry
};