const router = require('express').Router();
const { updateProfile, getCurrentUser } = require('../controllers/users');
const { updateUser } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUser, updateProfile);

module.exports = router;
