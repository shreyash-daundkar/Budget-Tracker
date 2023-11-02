const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        const { userId } = decryptData(token);
        req.user = await User.findByPk(userId);

        next();
    } catch (error) {
        return res.status(404).json({message: 'invalid token'});
    }
}

function decryptData(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}