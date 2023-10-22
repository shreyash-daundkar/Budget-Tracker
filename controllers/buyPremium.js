const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_ir71hDJSQ6jdEK',
    key_secret: 'BT5qyGPBut8OZJeX6QO45QTK'
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

exports.updateOrder = (req, res, next) => {
    console.log(req.body);
}