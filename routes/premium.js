const express = require('express');
const buyPremiumController = require('../controllers/buyPremium');
const premiumFeatures = require('../controllers/premiumFeatures');

const router = express.Router();

router.get('/buy', buyPremiumController.createOrder);
router.post('/buy', buyPremiumController.updateOrder);
router.get('/features', premiumFeatures);

module.exports = router;