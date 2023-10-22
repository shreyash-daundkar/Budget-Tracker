const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');


exports.verifyUser = async (req, res, next) => {
    try{ 
        const {email, password} = req.body;
        const users = await User.findAll({where: {email}});
        if(users.length === 0) res.status(404).send('Email is not found');
        else {
            bcrypt.compare(password, users[0].password, (error, result) => {
                if(error) res.status(400).send('Password is incorrect');
                else if(result) res.json({success: true, token: incryptData(users[0].id)});
            });
        }
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
}

function incryptData(userId) {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET);
}