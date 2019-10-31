/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as authentification from '../controllers/authentification';
import * as authorization from '../controllers/authorization';
import * as playlist from '../controllers/playlists';

const express = require('express');

const router = express.Router();

const showWelcome = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    return res.render('afterLogin');
  } catch (error) {
    return next(error);
  }
};

router.get('/login',
  authentification.loginWithSpotify);

router.get('/callback',
  authentification.verifySpotifyState,
  authentification.saveSpotifyCodeToSession);

router.get('/',
  authorization.requireLogin,
  showWelcome);

router.post('/create',
  authentification.getOrSaveAccessToken,
  playlist.populate);

module.exports = router;
