
require('dotenv').config();

// Initialize the express server app
const express = require('express');
const app = express();

// Log all calls to the API
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

// Import and use defined API routes
app.use('', require('./src/routes'));

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
