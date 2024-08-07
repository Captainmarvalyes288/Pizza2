const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', InventorySchema);