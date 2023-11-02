const bcrypt = require('bcrypt');
const ForgotPasswordRequests = require('../models/forgotPasswordRequests');


module.exports = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const id = req.query.id;

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
        return res.status(500).json({Message: 'error in reset password'});
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