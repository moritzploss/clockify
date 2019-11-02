import * as authentification from '../controllers/authentification';
import makePlaylist from '../controllers/playlists';
import requireLogin from '../controllers/authorization';
import showHome from '../controllers/home';

import express = require('express');

const router = express.Router();

router.get('/logout',
  authentification.logout);

router.get('/login',
  authentification.loginWithSpotify);

router.get('/callback',
  authentification.verifySpotifyState,
  authentification.saveSpotifyCodeToSession);

router.get('/',
  requireLogin,
  showHome);

router.post('/create',
  authentification.saveAccessToken,
  makePlaylist);

export default router;
