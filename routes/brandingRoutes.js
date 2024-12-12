const express = require('express');
const { saveBranding, getBranding } = require('../controllers/brandingController');

const router = express.Router();

// Route to send OTP
router.post('/saveBranding', saveBranding);
router.get('/getBranding/:itemId', getBranding);

module.exports = router;