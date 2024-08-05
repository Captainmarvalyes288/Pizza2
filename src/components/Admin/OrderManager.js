import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h2>Order Manager</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Customer: {order.user.email}</p>
          <p>Total: ${order.total}</p>
          <p>Status: 
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
          <h4>Pizzas:</h4>
          <ul>
            {order.pizzas.map((item) => (
              <li key={item._id}>
                {item.pizza.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderManager;