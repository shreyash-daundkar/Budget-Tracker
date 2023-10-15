const express = require('express');

const signup = require('../controllers/singup');
const login = require('../controllers/login');


const router = express.Router();


router.post('/signup', signup.addUser);
router.post('/login', login.verifyUser);


module.exports = router;



