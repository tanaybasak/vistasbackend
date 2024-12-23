require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async() => {
    mongoose.set('debug', true);

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectToDatabase();