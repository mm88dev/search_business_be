import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import CustomError from './utils/customError';
import businessRouter from './routes/business.router';
import errorHandler from './middleware/errorHandler';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

// LOAD ENVIRONMENT VARIABLES
require('dotenv').config();

// START EXPRESS
const app = express();

// MIDDLEWARES
// Allow cross-origin requests
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET']
  })
);

// Limit request from the same IP address (in 5 minutes window to 100 requests)
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: 'Too many search requests, please try again later.',
  headers: true
});
// Apply the rate limiter to all routes
app.use('/api', limiter);

// Parse JSON request bodies
app.use(express.json());

// Prevent hpp param pollution
app.use(hpp());

// ROUTES
app.use('/api/businesses', businessRouter);
app.all('/*', (req: Request, res: Response, next: NextFunction) => {
  return next(
    new CustomError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// ERROR HANDLING
app.use(errorHandler);

export default app;
