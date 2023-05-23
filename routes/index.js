const router = require('express').Router();

const movies = require('./movies');
const error = require('./error');
const users = require('./users');
const logout = require('./logout');

router.use(movies);
router.use(users);
router.use(logout);
router.use('*', error);

module.exports = router;
