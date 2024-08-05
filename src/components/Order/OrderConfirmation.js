import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! Your payment has been processed successfully.</p>
      <p>Your pizzas are being prepared and will be delivered soon.</p>
      <Link to="/orders">View Order History</Link>
    </div>
  );
};

export default OrderConfirmation;