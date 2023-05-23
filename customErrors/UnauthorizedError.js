const messages = require('../utils/messages');

class UnauthorizedError extends Error {
  constructor(message = messages.unauthorized) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
