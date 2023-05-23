const router = require('express').Router(); // создали роутер

const NotFoundError = require('../customErrors/NotFoundError');

router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router; // экспортировали роутер
