const User = require('../models/user');



exports.createUser = async options => {
    try {
        const { userObj } = options;
        
        const user = await new User( userObj );

        await user.save();
        return;

    } catch (error) {
        throw error;
    }
}


exports.readUsers = async options => {
    try {
        const { email, userId, sortField, sortDesc } = options;

        const whereOption = email ? { email } : userId ? { _id: userId } : {};

        const sortOption = sortField ? { sortField: sortDesc ? -1 : 1 }: {};

        const users = await User.find( whereOption ).sort( sortOption ).lean();

        users.forEach(user => user.id = user._id.toString());
        
        return users;
    } catch (error) {
        throw error;
    }
}


exports.updateUser = async options => {
    try {
        const { userId, password, isPremium } = options;
        
        const user = await User.findById( userId );
        
        if ( password ) user.password = password;
        if ( isPremium ) user.isPremium = isPremium;

        await user.save();
        return;
        
    } catch (error) {
        throw error;
    }
}