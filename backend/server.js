const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const pizzaRoutes = require('./routes/pizza');
const userRoutes = require('./routes/user');
const scheduleLowStockCheck = require('./scheduler/lowstock');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// Database connection and env varibles 
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/users', userRoutes);

// Start low stock scheduler
scheduleLowStockCheck();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));