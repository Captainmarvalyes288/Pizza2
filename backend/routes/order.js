const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, createOrder);
router.get('/user', auth, getUserOrders);
router.put('/:id', [auth, admin], updateOrderStatus);
router.get('/', [auth, admin], getAllOrders);

module.exports = router;