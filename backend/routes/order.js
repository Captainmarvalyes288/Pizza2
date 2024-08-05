const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { pizzas, total } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      pizzas,
      total
    });
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get orders for a specific user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('pizzas.pizza');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update order status
router.put('/:orderId/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all orders (for admin purposes)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'email').populate('pizzas.pizza');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;