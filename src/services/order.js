import api from './api';

export const createOrder = (orderData) => {
  return api.post('/orders', orderData);
};

export const getUserOrders = () => {
  return api.get('/orders/user');
};

export const getAllOrders = () => {
  return api.get('/orders');
};

export const updateOrderStatus = (orderId, status) => {
  return api.put(`/orders/${orderId}/status`, { status });
};

export const getOrderById = (orderId) => {
  return api.get(`/orders/${orderId}`);
};