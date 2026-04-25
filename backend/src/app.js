const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const errorMiddleware = require('./middlewares/error.middleware');
const itemRoutes = require('./routes/item.routes');
const claimRoutes = require('./routes/claim.routes');

const app = express();

// Connect to database
db();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
