const Pizza = require('../models/Pizza');

exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ msg: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createPizza = async (req, res) => {
  try {
    const newPizza = new Pizza(req.body);
    const pizza = await newPizza.save();
    res.status(201).json(pizza);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pizza) {
      return res.status(404).json({ msg: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndRemove(req.params.id);
    if (!pizza) {
      return res.status(404).json({ msg: 'Pizza not found' });
    }
    res.json({ msg: 'Pizza removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};