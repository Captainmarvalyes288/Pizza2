import api from './api';

export const register = (email, password, role) => {
  return api.post('/auth/register', { email, password, role });
};

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const forgotPassword = (email) => {
  return api.post('/auth/forgot-password', { email });
};

export const resetPassword = (token, password) => {
  return api.put(`/auth/reset-password/${token}`, { password });
};

export const verifyEmail = (token) => {
  return api.get(`/auth/verify/${token}`);
};