const express = require('express');
const { processPayment, sendStripApiKey } = require('../controllers/paymentController');
const {isAuthenticatedUser} = require('../middleware/Auth')
const router = express.Router();
router.route("/payment/process").post(isAuthenticatedUser,processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripApiKey)
module.exports = router;
