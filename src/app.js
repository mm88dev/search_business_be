require('express-async-errors');
const express = require('express');
const cors = require('cors');
const businessRouter = require('./routes/business.router');
const errorHandler = require('./middleware/errorHandler');
const CustomError = require('./utils/customError');

// LOAD ENVIRONMENT VARIABLES
require('dotenv').config();

// START EXPRESS
const app = express();

// MIDDLEWARES
// Middleware to allow cross-origin requests
app.use(
  cors({
    origin: 'http://localhost:5173',
    method: ['GET']
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// ROUTES
app.use('/api/businesses', businessRouter);
app.all('/*', (req, res, next) => {
  return next(
    new CustomError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// ERROR HANDLING
app.use(errorHandler);

module.exports = app;
