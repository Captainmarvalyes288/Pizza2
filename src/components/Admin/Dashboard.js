import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LowStockAlerts from './LowStockAlerts';
import api from '../../services/api';

const AdminDashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const ordersResponse = await api.get('/orders/count');
      const usersResponse = await api.get('/users/count');
      setOrderCount(ordersResponse.data.count);
      setUserCount(usersResponse.data.count);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p>{orderCount}</p>
        </div>
        <div className="summary-card">
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
      </div>
      <LowStockAlerts />
      <nav>
        <ul>
          <li><Link to="/admin/inventory">Manage Inventory</Link></li>
          <li><Link to="/admin/orders">Manage Orders</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;