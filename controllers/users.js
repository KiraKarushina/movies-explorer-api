const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const statusCodes = require('../utils/statusCodes');
const jwtUtils = require('../utils/jwt');

const errorNames = require('../utils/errorNames');
const BadRequestError = require('../customErrors/BadRequestRule');
const ConflictError = require('../customErrors/ConflictError');
const NotFoundError = require('../customErrors/NotFoundError');
const messages = require('../utils/messages');

const tokenExp = '7d';

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        const dUser = user;
        dUser.password = undefined;
        res.send({ data: dUser });
      })
      .catch((err) => {
        if (err.code === statusCodes.mongo) {
          next(new ConflictError());
        } else if (err.name === errorNames.validation) {
          next(new BadRequestError());
        } else {
          next(err);
        }
      }));
};

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((data) => {
    if (!data) {
      throw new NotFoundError();
    }

    res.send({ data });
  })
  .catch((err) => next(err));

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError());
      }
    })
    .catch((err) => {
      if (err.name === errorNames.cast) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => { next(err); });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtUtils.getJWTSecret(), { expiresIn: tokenExp });

      res.cookie('jwt', token, {
        maxAge: 36000000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }).send({ message: messages.ok });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  next();
};
