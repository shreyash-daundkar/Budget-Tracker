const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];
    const { userId } = decryptData(token);
    req.user = await User.findByPk(userId);
    next();
}

function decryptData(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}