const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwt');
const UnauthorizedError = require('../customErrors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtUtils.getJWTSecret());
  } catch (err) {
    next(new UnauthorizedError());
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
