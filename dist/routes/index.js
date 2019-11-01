"use strict";
/* eslint-disable import/no-unresolved */
Object.defineProperty(exports, "__esModule", { value: true });
var authentification = require("../controllers/authentification");
var authorization = require("../controllers/authorization");
var playlist = require("../controllers/playlists");
var home = require("../controllers/home");
var express = require('express');
var router = express.Router();
router.get('/logout', authentification.logout);
router.get('/login', authentification.loginWithSpotify);
router.get('/callback', authentification.verifySpotifyState, authentification.saveSpotifyCodeToSession);
router.get('/', authorization.requireLogin, home.showHome);
router.post('/create', authentification.getOrSaveAccessToken, playlist.makeClockifyPlaylist);
module.exports = router;
