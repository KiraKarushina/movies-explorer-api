const messages = require('../utils/messages');

class ConflictError extends Error {
  constructor(message = messages.conflict) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
