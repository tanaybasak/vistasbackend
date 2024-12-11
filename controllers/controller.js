const twilio = require('twilio');

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const verifyServiceSid = process.env.serviceId;

const client = twilio(accountSid, authToken);

/**
 * Send OTP to the user's phone number
 */
const sendOtp = async(req, res) => {
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
};

/**
 * Verify the OTP provided by the user
 */
const verifyOtp = async(req, res) => {
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
};

module.exports = {
    sendOtp,
    verifyOtp,
};