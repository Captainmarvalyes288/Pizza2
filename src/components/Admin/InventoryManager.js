import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const InventoryManager = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', quantity: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get('/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inventory', newItem);
      setNewItem({ item: '', quantity: 0 });
      fetchInventory();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await api.put(`/inventory/${id}`, { quantity });
      fetchInventory();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div>
      <h2>Inventory Manager</h2>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.item}
          onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            {item.item} - Quantity: 
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;