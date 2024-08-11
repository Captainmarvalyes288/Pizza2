import React, { useState, useEffect } from 'react';
import { getAllPizzas } from '../../services/mockPizzaApi';
import PizzaItem from './PizzaItem';
import { useCart } from '../../contexts/CartContext';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const fetchedPizzas = await getAllPizzas();
        setPizzas(fetchedPizzas);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        setError('Failed to load pizzas. Please try again later.');
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  if (loading) return <div>Loading pizzas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pizza-list">
      <h2>Our Pizzas</h2>
      <div className="pizza-grid">
        {pizzas.map((pizza) => (
          <PizzaItem key={pizza._id} pizza={pizza} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;