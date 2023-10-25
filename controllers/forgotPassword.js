const Sib = require('sib-api-v3-sdk');


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
    
        const key = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forget Password',
            textContent: 'hey',
        });  

        res.json({ key });

    } catch (error) {
        console.log(error);
    }

}