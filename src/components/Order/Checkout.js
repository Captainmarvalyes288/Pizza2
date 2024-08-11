import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import api from '../../services/api';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        pizzas: cart.map(item => ({ pizza: item._id, quantity: item.quantity })),
        total: getCartTotal(),
        address
      };

      const response = await api.post('/payment/create-order', { amount: getCartTotal() * 100, currency: 'INR' });
      const { order } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Pizza Ordering App',
        description: 'Pizza Order Payment',
        order_id: order.id,
        handler: async (response) => {
          try {
            const paymentData = {
              orderCreationId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            await api.post('/payment/verify-payment', paymentData);
            await api.post('/orders', orderData);
            clearCart();
            navigate('/order-confirmation');
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        },
        prefill: {
          name: 'Tejas Navale',
          email: 'ias.tejasnavale10@gmail.com',
          contact: '8600194737'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="cart-summary">
        {cart.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;