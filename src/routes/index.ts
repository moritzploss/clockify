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
  makeSomeChanges);


const getNewTracks = (userTracks) => {
  const trackDetails = userTracks.map((item) => ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
  }));

  const targetDuration = 60000 * 30;
  let duration = 0;
  let i = 0;
  const tracksToAdd = [];
  while (duration < targetDuration) {
    tracksToAdd.push(`spotify:track:${trackDetails[i].id}`);
    duration += trackDetails[i].duration;
    i += 1;
  }
  return tracksToAdd;
};


router.post('/create', async (req, res, next) => {
  try {
    const apiInstance = await spotify.newApiInstance(req.session.spotifyCode);

    const userPlaylists = await spotify.getUserPlaylists(apiInstance);
    const listDetails = userPlaylists.body.items.map(({ id, name }) => ({ name, id }));
    let appPlaylist = listDetails.find((list) => list.name === process.env.PLAYLIST_NAME);

    if (!appPlaylist) {
      appPlaylist = await spotify.createPlaylist(apiInstance, process.env.PLAYLIST_NAME);
    }

    const userTracks = await spotify.getNUserTracks(apiInstance, 1000);
    const newTracks = getNewTracks(userTracks);

    await spotify.replaceTracksInPlaylist(apiInstance, appPlaylist.id, newTracks);
    return res.json(newTracks);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
