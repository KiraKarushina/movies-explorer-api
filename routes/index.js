const router = require('express').Router();
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

  router.use(movies);
  router.use(users);
  router.use(logout);
  router.use('*', error);
};
