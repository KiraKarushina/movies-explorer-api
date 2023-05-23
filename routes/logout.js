const router = require('express').Router();
const { logout } = require('../controllers/users');

router.post('/signout', logout);

module.exports = router;
