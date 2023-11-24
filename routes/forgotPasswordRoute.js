const express = require('express');


const forgotPassword = require('../controllers/forgotPasswordController');
const resetPassword = require('../controllers/resetPasswordController');


const router = express.Router();


router.post('/', forgotPassword.sendMail);
router.post('/reset-password', resetPassword);


module.exports = router;