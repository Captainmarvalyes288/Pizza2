import api from './api';

export const getAllPizzas = () => {
  return api.get('/pizza');
};

export const getPizzaById = (pizzaId) => {
  return api.get(`/pizza/${pizzaId}`);
};

export const createPizza = (pizzaData) => {
  return api.post('/pizza', pizzaData);
};

export const updatePizza = (pizzaId, pizzaData) => {
  return api.put(`/pizza/${pizzaId}`, pizzaData);
};

export const deletePizza = (pizzaId) => {
  return api.delete(`/pizza/${pizzaId}`);
};