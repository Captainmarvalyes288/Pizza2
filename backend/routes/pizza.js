const express = require('express');
const router = express.Router();
const { getAllPizzas, getPizzaById, createPizza, updatePizza, deletePizza } = require('../controllers/pizzaController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getAllPizzas);
router.get('/:id', getPizzaById);
router.post('/', [auth, admin], createPizza);
router.put('/:id', [auth, admin], updatePizza);
router.delete('/:id', [auth, admin], deletePizza);

module.exports = router;