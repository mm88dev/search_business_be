import 'colors';
import http from 'http';

// Load app
import app from './app';

// Start server
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`.yellow.bold)
);

// Error Handling - uncaughtException (sync code)
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...'.red.underline);
  console.error(err);
  console.error(err.name.blue, err.message.red.italic.inverse);

  // Attempt to gracefully shutdown the server
  if (server) {
    server.close(() => {
      console.log('Server closed gracefully.'.green);
      // Exit the process after closing the server
      process.exit(1);
    });
  } else {
    // If the server is not initialized, exit immediately
    process.exit(1);
  }
});

// Error Handling - unhandled promise rejections (async code)
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...'.red.underline);
  console.error(err.name.blue, err.message.red.italic.inverse);
  // shutdown application gracefully - server.close gives time to finish all requests
  server.close(() => {
    process.exit(1);
  });
});
