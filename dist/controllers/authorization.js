"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireLogin = function (req, res, next) { return ((req.session.spotifyCode)
    ? next()
    : res.render('beforeLogin')); };
exports.requireLogin = requireLogin;
