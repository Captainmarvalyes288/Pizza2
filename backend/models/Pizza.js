const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    base: { type: String, required: true },
    sauce: { type: String, required: true },
    cheese: { type: String, required: true },
    veggies: [String],
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Pizza', PizzaSchema);
