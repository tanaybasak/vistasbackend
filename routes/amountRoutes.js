const express = require('express');
const { saveAmount, getAmount } = require('../controllers/amountController');

const router = express.Router();

// Route to send OTP
router.post('/saveAmountDetails', saveAmount);

// Route to verify OTP
router.get('/getAmountDetails/:phoneNumber', getAmount);

module.exports = router;