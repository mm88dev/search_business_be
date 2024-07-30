const express = require('express');
const app = express();
const port = 3000;
const businessRouter = require('./routes/business.router');
const cors = require('cors');

// Load environment variables from the .env file
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    method: ['GET']
  })
);

// Use the search router for the /search route
app.use('/api/businesses', businessRouter);

// All other api routes
app.all('/*', (req, res, next) => {
  return next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
