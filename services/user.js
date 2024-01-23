const User = require('../models/user');



exports.createUser = async options => {
    try {
        const { userObj } = options;
        
        const user = await new User( userObj );

        user.save();
        return;

    } catch (error) {
        throw error;
    }
}


exports.readUsers = async options => {
    try {
        const { email, userId } = options;

        const whereOption = email ? { email } : { _id: userId };

        
        const users = await User.find(whereOption);
        
        console.log(whereOption, users[0])
        return users;
    } catch (error) {
        throw error;
    }
}