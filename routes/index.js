const router = require('express').Router();

const movies = require('./movies');
const error = require('./error');
const users = require('./users');

router.use(movies);
router.use(users);
router.use('*', error);

module.exports = router;
