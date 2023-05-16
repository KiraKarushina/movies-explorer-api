const statusCodes = require('../utils/statusCodes');
const messages = require('../utils/messages');

module.exports = (err, req, res, next) => {
  const {
    statusCode = statusCodes.internal,
    message,
  } = err;

  res.status(statusCode).send(
    { message: statusCode === statusCodes.internal ? messages.badRequest : message },
  );
  next(err);
};
