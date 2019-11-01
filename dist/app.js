"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./routes/index");
var session = require("express-session");
var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var helmet = require("helmet");
var logging = require("./logging/index");
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
app.use('/', index_1.default);
app.use(function (req, res) { return res.render('notFound'); });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err, req, res, next) {
    logging.logger.error(err);
    req.session.spotifyCode = undefined;
    res.render('beforeLogin');
});
exports.default = app;
