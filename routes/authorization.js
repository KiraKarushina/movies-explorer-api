const router = require('express').Router();
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

module.exports = router;
