import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import CustomError from './utils/customError';
import businessRouter from './routes/business.router';
import errorHandler from './middleware/errorHandler';

// LOAD ENVIRONMENT VARIABLES
require('dotenv').config();

// START EXPRESS
const app = express();

// MIDDLEWARES
// Middleware to allow cross-origin requests
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET']
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

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
