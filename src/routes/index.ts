/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as spotify from '../spotify/apiTools';
import * as authentification from '../controllers/authentification';
import * as authorization from '../controllers/authorization';
import * as time from '../time/index';
import * as tracks from '../tracks/index';

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

router.post('/create', async (req, res, next) => {
  try {
    const apiInstance = await spotify.newApiInstance(req.session.spotifyCode);
    const targetDuration = time.userInputToMilliseconds(req.body);
    const targetPlaylist = await spotify.getTargetPlaylist(apiInstance);

    const userTracks = await spotify.getNUserTracks(apiInstance, 500);
    const newTracks = tracks.getNewTracks(userTracks, targetDuration);

    const playlistUrl = `https://open.spotify.com/playlist/${targetPlaylist}`;

    await spotify.replaceTracksInPlaylist(apiInstance, targetPlaylist, newTracks);
    return res.render('created', { playlistUrl });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
