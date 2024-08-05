const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const newPizza = new Pizza({ name, description, price, imageUrl });
        const pizza = await newPizza.save();
        res.json(pizza);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;