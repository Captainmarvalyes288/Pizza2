import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Pizza Ordering App</h1>
      <p>Discover our delicious pizzas and place your order now!</p>
      <Link to="/pizzas" className="cta-button">View Menu</Link>
      <section className="featured-pizzas">
        <h2>Featured Pizzas</h2>
      </section>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Choose your favorite pizzas from our menu</li>
          <li>Add them to your cart</li>
          <li>Proceed to checkout and make payment</li>
          <li>Sit back and relax while we prepare and deliver your order</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;