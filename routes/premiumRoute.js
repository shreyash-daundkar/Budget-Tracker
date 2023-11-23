const express = require('express');
const buyPremiumController = require('../controllers/buyPremiumController');
const premiumFeatures = require('../controllers/premiumFeaturesController');

const router = express.Router();

router.get('/buy', buyPremiumController.createOrder);
router.post('/buy', buyPremiumController.updateOrder);
router.get('/features/leaderboard', premiumFeatures.leaderBoard);
router.get('/features/download-report', premiumFeatures.downloadReport);
router.get('/features/download-history', premiumFeatures.downloadHistory);

module.exports = router;