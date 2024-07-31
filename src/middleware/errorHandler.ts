import 'colors';
import { Request, Response, NextFunction } from 'express';

interface ErrorWithCode extends Error {
  errorCode?: number;
}

const errorHandler = (
  err: ErrorWithCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.errorCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err.stack?.red);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

export default errorHandler;
