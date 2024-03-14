import winston, { Logger } from 'winston';

// Create a logger instance
const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
    ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'info' }), // Change level to 'info'
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// // Example usage
// logger.log({
//   level: 'info',
//   message: 'This is an informational message.'
// });

// logger.error('This is an error message.');

export default logger;