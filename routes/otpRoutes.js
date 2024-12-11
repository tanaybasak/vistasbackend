const express = require('express');
const { sendOtp, verifyOtp } = require('../controllers/controller');

const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtp);

// Route to verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;