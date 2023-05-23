const messages = require('../utils/messages');

class BadRequestError extends Error {
  constructor(message = messages.badRequest) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
