import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <input 
            type="number" 
            value={item.quantity} 
            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
            min="1"
          />
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;