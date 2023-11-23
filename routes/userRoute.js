const express = require('express');

const validation = require('../middlewares/validation');

const signup = require('../controllers/singupController');
const login = require('../controllers/loginController');
const forgotPassword = require('../controllers/forgotPasswordController');
const resetPassword = require('../controllers/resetPasswordController');


const router = express.Router();


router.use(['/signup', '/login', '/forgot-password', '/reset-password'], validation);
router.post('/signup', signup.addUser);
router.post('/login', login.verifyUser);
router.post('/forgot-password', forgotPassword.sendMail);
router.post('/reset-password', resetPassword);


module.exports = router;