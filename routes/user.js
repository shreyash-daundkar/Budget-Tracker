const express = require('express');

const signup = require('../controllers/singup');


const router = express.Router();


router.post('/signup', signup.addUser);


module.exports = router;



