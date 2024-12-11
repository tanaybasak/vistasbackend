const express = require('express');
const { createEnquiry } = require('../controllers/enquiryController');

const router = express.Router();

// Route to send OTP
router.post('/createEnquiry', createEnquiry);

// Route to verify OTP

module.exports = router;