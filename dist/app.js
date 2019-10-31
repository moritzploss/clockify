"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = require('express-session');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var helmet = require('helmet');
// eslint-disable-next-line import/no-unresolved
var router = require('./routes/index');
var logging = require('./logging/logging');
var app = express();
app.use(helmet());
app.use(morgan('tiny', { stream: logging.stream }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 10 },
}));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static([__dirname, 'public'].join('/')));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(function (req, res) { return res.render('notFound'); });
exports.default = app;
