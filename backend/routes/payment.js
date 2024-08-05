require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { Order } = require('../models/Order');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY ,
    key_secret: process.env.RAZORPAY_SECRET ,
});

router.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    try {
        const options = { amount, currency, receipt };
        const order = await razorpay.orders.create(options);
        if (!order) return res.status(500).send('Some error occured');
        res.status(200).json(Order);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    if (generated_signature === razorpay_signature) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

module.exports = router;
