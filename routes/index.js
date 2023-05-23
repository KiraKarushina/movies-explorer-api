const movies = require('./movies');
const error = require('./error');
const users = require('./users');
const logout = require('./logout');
const authorization = require('./authorization');
const auth = require('../middlewares/auth');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use('/', authorization);

  app.use(auth);

  app.use(movies);
  app.use(users);
  app.use(logout);
  app.use('*', error);
};
