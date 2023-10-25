const Sib = require('sib-api-v3-sdk');


exports.sendMail = async (req, res, next) => {
    const { email } = req.body;

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentication['api-key'];
    apiKey.apiKey = process.env.SMPTS_KEY;

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
    })

}