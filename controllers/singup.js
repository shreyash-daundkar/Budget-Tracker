const bcrypt = require('bcrypt');

const User = require('../models/users');

exports.addUser = async (req, res, next) => {
    try{ 
        const user = req.body;
        user.password = await hashPassword(user.password);
        await User.create(user);
        res.json({success: true});
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send('Email already in use');
        } else {
            res.status(500).send('Something went wrong');
        }
    }
}

function hashPassword(password) {
    return new Promise(resolve => {
        bcrypt.hash(password, 10, (error, hash) => {
            if(error) throw error;
            resolve(hash);
        });
    });
}