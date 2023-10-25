const express = require('express');

const validation = require('../controllers/validation');
const signup = require('../controllers/singup');
const login = require('../controllers/login');
const forgotPassword = require('../controllers/forgotPassword');


const router = express.Router();


router.use(['/signup', '/login', '/forgot-password'], validation);
router.post('/signup', signup.addUser);
router.post('/login', login.verifyUser);
router.post('/forgot-password', forgotPassword.sendMail);


module.exports = router;