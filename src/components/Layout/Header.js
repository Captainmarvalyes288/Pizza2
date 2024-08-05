import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchLowStockCount();
    }
  }, [user]);

  const fetchLowStockCount = async () => {
    try {
      const response = await api.get('/inventory/low-stock');
      setLowStockCount(response.data.length);
    } catch (error) {
      console.error('Error fetching low stock count:', error);
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pizzas">Menu</Link></li>
          {user ? (
            <>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin">
                    Admin Dashboard
                    {lowStockCount > 0 && (
                      <span className="low-stock-badge">{lowStockCount}</span>
                    )}
                  </Link>
                </li>
              )}
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;