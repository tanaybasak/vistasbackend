const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/orderController');

const router = express.Router();

// Route to send OTP
router.post('/placeOrder', createOrder);
router.post('/verifyOrder', verifyPayment);

// Route to verify OTP

module.exports = router;