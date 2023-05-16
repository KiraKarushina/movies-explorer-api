const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const authorization = require('./routes/authorization');
const mainRouter = require('./routes/index');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(authorization);
app.use(auth);

app.use(mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// https://api.nomoreparties.co/beatfilm-movies
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {});
