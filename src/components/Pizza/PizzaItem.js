import React from 'react';

const PizzaItem = ({ pizza, addToCart }) => {
  return (
    <div className="pizza-item">
      <img src={pizza.imageUrl} alt={pizza.name} />
      <h3>{pizza.name}</h3>
      <p>{pizza.description}</p>
      <p>Price: ${pizza.price.toFixed(2)}</p>
      <button onClick={() => addToCart(pizza)}>Add to Cart</button>
    </div>
  );
};

export default PizzaItem;