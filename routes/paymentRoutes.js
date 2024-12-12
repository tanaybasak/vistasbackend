const express = require('express');
const { verifyPayment, createPayment } = require('../controllers/paymentController');

const router = express.Router();

// Route to send OTP
router.post('/createPayment', createPayment);
router.post('/verifyPayment', verifyPayment);

// Route to verify OTP

module.exports = router;