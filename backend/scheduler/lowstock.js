const cron = require('node-cron');
const Inventory = require('../models/inventory');
const sendEmail = require('../utils/sendEmail');

const checkLowStock = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const lowStockItems = await Inventory.find({ quantity: { $lt: 20 } });
            if (lowStockItems.length > 0) {
                const itemList = lowStockItems.map(item => `${item.item}: ${item.quantity}`).join('\n');
                const message = `The following items are low in stock:\n${itemList}`;
                await sendEmail('ias.tejasnavale10@gmail.com', 'Low Stock Alert', message);
            }
        } catch (error) {
            console.error('Error checking low stock:', error);
        }
    });
};

module.exports = checkLowStock;
