const { Schema, model } = require('mongoose');


const orderSchema = Schema({
    orderId : {
        type : String,
        required: true 
    },
    paymentId : {
        type : String,
    },
    status : {
        type : String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})


module.exports = model('Order', orderSchema);