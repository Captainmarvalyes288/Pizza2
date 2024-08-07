const Inventory = require('../models/Inventory');

exports.addInventoryItem = async (req, res) => {
  try {
    const { item, quantity } = req.body;
    const newItem = new Inventory({ item, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.updateInventoryItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Inventory.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getAllInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send('Server error');
  }
};