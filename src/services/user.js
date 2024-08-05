import api from './api';

export const getCurrentUser = () => {
  return api.get('/users/me');
};

export const updateUserProfile = (userId, userData) => {
  return api.put(`/users/${userId}`, userData);
};

export const getAllUsers = () => {
  return api.get('/users');
};

export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};

export const changePassword = (oldPassword, newPassword) => {
  return api.put('/users/change-password', { oldPassword, newPassword });
};