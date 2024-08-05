const express = require('express');
const Inventory = require('../models/inventory');
const router = express.Router();

// Add new inventory item
router.post('/', async (req, res) => {
    const { item, quantity } = req.body;
    try {
        const inventory = new Inventory({ item, quantity });
        await inventory.save();
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Update inventory item quantity
router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        const inventory = await Inventory.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Get low stock items
router.get('/low-stock', async (req, res) => {
    try {
        const lowStockItems = await Inventory.find({ quantity: { $lt: 20 } });
        res.status(200).json(lowStockItems);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
