"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = require('express-session');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-unresolved
var router = require('./routes/index');
var app = express();
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
app.use('/', router);
exports.default = app;
