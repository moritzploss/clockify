const session = require('express-session');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const router = require('./routes/index');
const logging = require('./logging/logging');

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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logging.logger.error(err);
  req.session.spotifyCode = undefined;
  res.render('beforeLogin');
});

export default app;
