import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const LowStockAlerts = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    fetchLowStockItems();
  }, []);

  const fetchLowStockItems = async () => {
    try {
      const response = await api.get('/inventory/low-stock');
      setLowStockItems(response.data);
    } catch (error) {
      console.error('Error fetching low stock items:', error);
    }
  };

  return (
    <div className="low-stock-alerts">
      <h3>Low Stock Alerts</h3>
      {lowStockItems.length > 0 ? (
        <ul>
          {lowStockItems.map((item) => (
            <li key={item._id}>
              {item.item}: {item.quantity} left
            </li>
          ))}
        </ul>
      ) : (
        <p>No items are currently low in stock.</p>
      )}
    </div>
  );
};

export default LowStockAlerts;