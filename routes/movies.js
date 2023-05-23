const router = require('express').Router();
const { validateNewMovie, validateDelMovie } = require('../middlewares/validation');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validateNewMovie, createMovie);

router.delete('/movies/:_id', validateDelMovie, deleteMovie);

module.exports = router;
