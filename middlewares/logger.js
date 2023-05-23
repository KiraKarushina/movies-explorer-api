const winston = require('winston');

const expexpressWinston = require('express-winston');

const dirname = 'logs';

const requestLogger = expexpressWinston.logger({
  transports: [
    new winston.transports.File({ dirname, filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expexpressWinston.errorLogger({
  transports: [
    new winston.transports.File({ dirname, filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
