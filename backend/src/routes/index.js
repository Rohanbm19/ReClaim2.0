const express = require('express');
const router = express.Router();

// Import route files
const itemRoutes = require('./item.routes');
const claimRoutes = require('./claim.routes');

// Use routes
router.use('/items', itemRoutes);
router.use('/claims', claimRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;