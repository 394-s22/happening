
require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

// Initialize the express server app
const app = express();

// Setup CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
  next();
});

// Log all calls to the API
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

// Import and use defined API routes
app.use('', routes);

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`
    Application listening on PORT: ${PORT}
    http://localhost:${PORT}
  `);
});

// Export the server app
module.exports = app;
