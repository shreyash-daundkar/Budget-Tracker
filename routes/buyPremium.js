const express = require('express');
const buyPremiumController = require('../controllers/buyPremium');

const router = express.Router();

router.get('/', buyPremiumController.createOrder);
router.post('/', buyPremiumController.updateOrder)

module.exports = router;