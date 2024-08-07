const express = require('express');
const router = express.Router();
const { addInventoryItem, updateInventoryItem, getAllInventoryItems } = require('../controllers/inventoryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', [auth, admin], addInventoryItem);
router.put('/:id', [auth, admin], updateInventoryItem);
router.get('/', [auth, admin], getAllInventoryItems);

module.exports = router;