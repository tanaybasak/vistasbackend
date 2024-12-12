const express = require('express');
const cors = require('cors');
require("./db/connection");
require('dotenv').config();


const otpRoutes = require('./routes/otpRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const brandingRoutes = require('./routes/brandingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/enquiry', enquiryRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/branding', brandingRoutes)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});