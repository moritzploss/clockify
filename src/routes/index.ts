/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as authentification from '../controllers/authentification';
import * as authorization from '../controllers/authorization';
import * as playlist from '../controllers/playlists';
import * as home from '../controllers/home';

const express = require('express');

const router = express.Router();


router.get('/login',
  authentification.loginWithSpotify);

router.get('/callback',
  authentification.verifySpotifyState,
  authentification.saveSpotifyCodeToSession);

router.get('/',
  authorization.requireLogin,
  home.showWelcome);

router.post('/create',
  authentification.getOrSaveAccessToken,
  playlist.populate);

module.exports = router;
