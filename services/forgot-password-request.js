const ForgotPasswordRequest = require('../models/forgot-password-request');



exports.createForgotPasswordRequest = async options => {
    try {
        const { forgotPasswordRequestObj } = options;
        
        const forgotPasswordRequest = await new ForgotPasswordRequest( forgotPasswordRequestObj );
        forgotPasswordRequest.save();
        
        forgotPasswordRequest.id = forgotPasswordRequest._id.toString();
        return forgotPasswordRequest._id.toString();

    } catch (error) {
        throw error;
    }
}


exports.findForgotPasswordRequestById = async options => {
    try {
        const { forgotPasswordRequestId } = options;
        
        const forgotPasswordRequest = await ForgotPasswordRequest.findById( forgotPasswordRequestId );

        return forgotPasswordRequest;
    } catch (error) {
        throw error;
    }
}


exports.deactivateForgotPasswordRequest = async options => {
    try {
        const { forgotPasswordRequestId } = options;
        
        const forgotPasswordRequest = await ForgotPasswordRequest.findById( forgotPasswordRequestId );

        forgotPasswordRequest.isActive = false;
        await forgotPasswordRequest.save();

        return;
    } catch (error) {
        throw error;
    }
}