require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/reclaim2',
  nodeEnv: process.env.NODE_ENV || 'development'
};