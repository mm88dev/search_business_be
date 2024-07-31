import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import CustomError from './utils/customError';
import businessRouter from './routes/business.router';
import errorHandler from './middleware/errorHandler';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

// Load environment variables
require('dotenv').config();

// Start express app
const app = express();

// Middlewares
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

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

// Prevent hpp param pollution
app.use(hpp());

// Routes
app.use('/api/businesses', businessRouter);
app.all('/*', (req: Request, res: Response, next: NextFunction) => {
  return next(
    new CustomError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// Error handling middleware
app.use(errorHandler);

export default app;
