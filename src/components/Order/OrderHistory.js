import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/user');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
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

export default OrderHistory;