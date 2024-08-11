import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import PizzaList from './components/Pizza/PizzaList';
import Cart from './components/Order/Cart';
import Checkout from './components/Order/Checkout';
import OrderConfirmation from './components/Order/OrderConfirmation';
import OrderHistory from './components/Order/OrderHistory';
import Profile from './components/User/Profile';
import AdminDashboard from './components/Admin/Dashboard';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminRoute from './components/Common/AdminRoute';
import VerifyEmail from './components/Auth/VerifyEmail';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/pizzas" element={<PizzaList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;