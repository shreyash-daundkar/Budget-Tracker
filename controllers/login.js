const User = require('../models/users');

exports.verifyUser = async (req, res, next) => {
    try{ 
        const {email, password} = req.body;
        const users = await User.findAll();
        const user = users.filter(u => u.email === email);
        if(user.length === 0) res.status(404).send('Email is not found');
        else {
            if(user[0].password === password) res.json({success: true});
            else res.status(400).send('Password is incorrect')
        }
    } catch(error) {
        res.status(500).send('Something went wrong');
    }
}