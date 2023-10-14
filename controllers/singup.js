const User = require('../models/users');

exports.addUser = async (req, res, next) => {
    try{ 
        await User.create(req.body);
        res.json({success: true});
    } catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send('Email already in use');
        } else {
            res.status(500).send('Something went wrong');
        }
    }
}