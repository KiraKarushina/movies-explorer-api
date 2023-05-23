const Movie = require('../models/movie');
const errorNames = require('../utils/errorNames');
const BadRequestError = require('../customErrors/BadRequestRule');
const NotFoundError = require('../customErrors/NotFoundError');
const ForbiddenError = require('../customErrors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const filteredMoovies = movies.filter((m) => req.user._id === m.owner.toString());
      res.status(200).send({ data: filteredMoovies });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => next(err.name === errorNames.validation ? new BadRequestError() : err));
};

module.exports.deleteMovie = (req, res, next) => {
  const id = req.params._id;

  const removeMovie = () => {
    Movie.findByIdAndRemove(id).then((movie) => res.send(movie)).catch(next);
  };
  Movie.findById(id).then((movie) => {
    if (!movie) {
      next(new NotFoundError());
    }
    if (req.user._id === movie.owner.toString()) {
      return removeMovie();
    }
    return next(new ForbiddenError());
  })
    .catch(next);
};
