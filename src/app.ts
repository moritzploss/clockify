import router from './routes/index';

import session = require('express-session');
import express = require('express');
import cors = require('cors');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import helmet = require('helmet');

import logging = require('./logging/index');

const app = express();

app.use(helmet());
app.use(morgan('tiny', { stream: logging.stream }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 * 10 }, // 10 minutes
}));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static([__dirname, 'public'].join('/')));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use((req, res) => res.render('notFound'));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  logging.logger.error(err);
  req.session.spotifyCode = undefined;
  res.render('beforeLogin');
});

export default app;
