const express = require('express');
const twilio = require('twilio');
const cors = require('cors')
const app = express();
require('dotenv').config(); // This loads the environment variables from the .env file

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = twilio(accountSid, authToken);
const verifyServiceSid = process.env.serviceId;

let otpCache = {}; // This is just for illustration. You should use a more secure store in production.
app.use(cors());


app.use(express.json());

// API Endpoint to Send OTP
app.post('/send-otp', async(req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required.' });
    }

    try {
        const verification = await client.verify.v2
            .services(verifyServiceSid)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms', // Can be 'sms', 'email', or 'whatsapp'
            });

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully.',
            status: verification.status,
        });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Failed to send OTP. Please try again later.',
        });
    }
});

app.post('/verify-otp', async(req, res) => {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ error: 'Phone number and OTP code are required.' });
    }

    try {
        const verificationCheck = await client.verify.v2
            .services(verifyServiceSid)
            .verificationChecks.create({
                to: phoneNumber,
                code: code,
            });

        console.log(verificationCheck)

        if (verificationCheck.status === 'approved') {
            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully.',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP. Please try again.',
            });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Failed to verify OTP. Please try again later.',
        });
    }
});

const port = process.env.PORT || 3000; // Vercel assigns a dynamic port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});