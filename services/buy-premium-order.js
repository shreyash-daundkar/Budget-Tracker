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
        
        const orders = await Order.find({ orderId });
        
        orders[0].status = status;
        orders[0].paymentId = paymentId;

        await orders[0].save(); 
        return;

    } catch (error) {
        throw error;
    }
}