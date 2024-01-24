const { Schema, model } = require('mongoose');


const forgotPasswordRequestSchema = Schema({
    isActive: {
        type: Boolean,
        requiredL: true,
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})


module.exports = model('ForgotPasswordRequest', forgotPasswordRequestSchema);