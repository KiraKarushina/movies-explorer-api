const messages = require('../utils/messages');

class ForbiddenError extends Error {
  constructor(message = messages.forbidden) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
