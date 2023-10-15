const express = require('express');

const validation = require('../controllers/validation');
const signup = require('../controllers/singup');
const login = require('../controllers/login');


const router = express.Router();


router.use(['/signup', '/login'], validation);
router.post('/signup', signup.addUser);
router.post('/login', login.verifyUser);


module.exports = router;