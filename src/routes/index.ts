/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as spotify from '../spotify/apiTools';
import * as authentification from '../controllers/authentification';
import * as authorization from '../controllers/authorization';

const express = require('express');

const router = express.Router();

const makeSomeChanges = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const instance = await spotify.newApiInstance(req.session.spotifyCode);
    const user = await spotify.getUser(instance);
    const { body } = await spotify.createPlaylist(instance, 'this should work');
    await spotify.addSongsToPlaylist(instance, body.id, ['spotify:track:6OvggaFiCsjOLvng2qZq3k']);
    return res.render('afterLogin', { title: user.body.id });
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
  makeSomeChanges);

module.exports = router;
