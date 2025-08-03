const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const LoggerService = require('./helpers/loggerService');
require('dotenv').config();

const logger = new LoggerService('server');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime(), timestamp: Date.now() });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Catch 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error('Server error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
