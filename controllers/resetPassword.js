const bcrypt = require('bcrypt');
const ForgotPasswordRequests = require('../models/forgotPasswordRequests');


module.exports = async (req, res, next) => {
    const { newPassword } = req.body;
    const id = req.query.id;

    try {
        const requests = await ForgotPasswordRequests.findAll();
        requests.filter(request => request.id == id ? true : false);
        const request = requests[0];

        if(request.isActive) {
            request.isActive = false;
            request.save();

            const user = await request.getUser();
            user.password = await hashPassword(newPassword);
            user.save();
        } else console.log('request is close');
        
        res.json();
    } catch (error) {
        console.log(error);
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