require('colors');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.errorCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err.stack.red);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = errorHandler;
