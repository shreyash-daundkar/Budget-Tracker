const Sib = require('sib-api-v3-sdk');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const ForgotPasswordRequests = require('../models/forgot-password-request');


exports.sendMail = async (req, res, next) => {
    try {
        const { email } = req.body;
    
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.EMAIL_API;
        
        const transEmailApi = new Sib.TransactionalEmailsApi();
    
        const sender = {
            email: process.env.EMAIL_SENDER_EMAIL,
            name: process.env.EMAIL_SENDER_NAME,
        }
    
        const receivers = [ { email } ];
        const users = await User.findAll({where: {email}});
        const { id } = await users[0].createForgotPasswordRequest({id: v4(), isActive: true});

        const key = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forget Password',
            textContent: `http://${req.headers.host}/reset-password.html?id=${id}`,
        });  

        res.json({ key });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error in sending mail'});
    }

}



exports.resetPassword = async (req, res, next) => {
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