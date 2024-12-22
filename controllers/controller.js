const nodemailer = require('nodemailer');
const crypto = require('crypto');

const otpStore = new Map(); // Temporary in-memory OTP store for simplicity

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or any email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password (or app password for Gmail)
    },
});

/**
 * Generate a 6-digit OTP
 */
function generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

/**
 * Send OTP to the user's email
 */
const sendOtp = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    const otp = generateOtp();

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email
        to: email, // Receiver email
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);

        // Store the OTP in memory with an expiry time
        otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully.',
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
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ error: 'Email and OTP code are required.' });
    }

    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
        return res.status(400).json({ error: 'No OTP sent to this email or it has expired.' });
    }

    const { otp, expiresAt } = storedOtp;

    if (Date.now() > expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (otp === code) {
        otpStore.delete(email); // Clear OTP after successful verification
        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully.',
        });
    }

    return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.',
    });
};

module.exports = {
    sendOtp,
    verifyOtp,
};