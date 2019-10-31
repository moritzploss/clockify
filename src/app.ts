const session = require('express-session');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// eslint-disable-next-line import/no-unresolved
const router = require('./routes/index');

const app = express();

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

export default app;
