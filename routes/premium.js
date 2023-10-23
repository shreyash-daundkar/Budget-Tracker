const express = require('express');
const buyPremiumController = require('../controllers/buyPremium');

const router = express.Router();

router.get('/buy', buyPremiumController.createOrder);
router.post('/buy', buyPremiumController.updateOrder)

module.exports = router;