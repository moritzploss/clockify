"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spotifyConfig = require("../spotify/config");
var randomstring = require('randomstring');
var querystring = require('querystring');
var saveSpotifyCode = function (req, res) {
    req.session.spotifyCode = req.query.code || null;
    return res.redirect('/');
};
exports.saveSpotifyCode = saveSpotifyCode;
var verifySpotifyState = function (req, res, next) {
    var storedState = req.cookies ? req.cookies[spotifyConfig.stateKey] : null;
    var state = req.query.state || null;
    if (state === null || state !== storedState) {
        return res.redirect('/state-mismatch');
    }
    return next();
};
exports.verifySpotifyState = verifySpotifyState;
var loginWithSpotify = function (req, res) {
    var state = randomstring.generate(16);
    res.cookie(spotifyConfig.stateKey, state);
    var reqParams = querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: spotifyConfig.scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: state,
    });
    return res.redirect("https://accounts.spotify.com/authorize?" + reqParams);
};
exports.loginWithSpotify = loginWithSpotify;
