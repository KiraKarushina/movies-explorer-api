const errorNames = require('./errorNames');
const statusCodes = require('./statusCodes');

module.exports.getErrorStatusCode = (err) => {
  if (err.name === errorNames.validation || err.name === errorNames.cast) {
    return statusCodes.badRequest;
  }
  return statusCodes.serverError;
};
