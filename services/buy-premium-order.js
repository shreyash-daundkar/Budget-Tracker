const Order = require('../models/buy-premium-order');



exports.createOrder = async options => {
    try {
        const { orderObj } = options;
        
        const order = await new Order( orderObj );

        await order.save();
        return;

    } catch (error) {
        throw error;
    }
}


exports.updateOrder = async options => {
    try {
        const { orderId, status, paymentId } = options;
        
        const order = await order.findById( orderId );
        
        order.status = status;
        order.paymentId = paymentId;

        await order.save(); 
        return;

    } catch (error) {
        throw error;
    }
}