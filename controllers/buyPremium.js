const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = (req, res, next) => {
    const option = {
        amount: '25000', 
        currency: 'INR',
    };
    razorpay.orders.create(option, async (error, order) => {
        if(error) return res.status(500).json({message: 'error creating order'});
        try {
            await req.user.createOrder({orderId: order.id, status: 'PENDING'});
            res.json({order, key : razorpay.key_id});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });
}

exports.updateOrder = async (req, res, next) => {
    const {orderId, paymentId} = req.body;
    const orders = await req.user.getOrders({where: { orderId }});
    orders[0].paymentId = paymentId ? paymentId : null;
    orders[0].status = paymentId ? 'SUCCESS' : 'FAILED';
    orders[0].save();
    req.user.isPremium = paymentId ? true : false;
    req.user.save();
    res.json();
}