const cron = require('node-cron');
const Inventory = require('../models/Inventory');
const sendEmail = require('../utils/sendEmail');

const checkLowStock = async () => {
  try {
    const lowStockItems = await Inventory.find({ quantity: { $lt: 10 } });
    if (lowStockItems.length > 0) {
      const itemsList = lowStockItems.map(item => `${item.item}: ${item.quantity}`).join('\n');
      await sendEmail(
        process.env.ADMIN_EMAIL,
        'Low Stock Alert',
        `The following items are running low:\n${itemsList}`
      );
    }
  } catch (error) {
    console.error('Error checking low stock:', error);
  }
};

const scheduleLowStockCheck = () => {
  cron.schedule('0 0 * * *', checkLowStock);
};

module.exports = scheduleLowStockCheck;