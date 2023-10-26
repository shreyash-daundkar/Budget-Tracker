const Sib = require('sib-api-v3-sdk');
const User = require('../models/users');


exports.sendMail = async (req, res, next) => {
    console.log(process.env.SMPT_KEY);
    try {
        const { email } = req.body;
    
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.EMAIL_API;
        
        const transEmailApi = new Sib.TransactionalEmailsApi();
    
        const sender = {
            email: 'shreyashdaundkar@gmail.com',
            name: 'Budget Tracker',
        }
    
        const receivers = [ { email } ];
        const users = await User.findAll({where: {email}});
        const { id } = await users[0].createForgotPasswordRequest({ isActive: true});


        const key = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forget Password',
            textContent: `http://127.0.0.1:5501/Frontend/reset-password.html?id=${id}`,
        });  


        res.json({ key });

    } catch (error) {
        console.log(error);
    }

}