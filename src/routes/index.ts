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


router.post('/create', async (req, res, next) => {
  try {
    const targetDuration = 60000 * 30;

    const instance = await spotify.newApiInstance(req.session.spotifyCode);
    const user = await spotify.getUser(instance);
    const playlists = await spotify.getUserPlaylists(instance);

    const playlistDetails = playlists.body.items.map(({ id, name }) => ({ name, id }));
    let playlist = playlistDetails.find((playlists) => playlists.name === process.env.PLAYLIST_NAME);

    const tracks = await spotify.getUserTracks(instance, 50, 2);
    const trackDetails = tracks.body.items.map(({ track }) => ({
      duration: track.duration_ms,
      id: track.id,
    }));

    if (!playlist) {
      playlist = await spotify.createPlaylist(instance, process.env.PLAYLIST_NAME);
    }

    let duration = 0;
    let i = 0;
    const tracksToAdd = [];
    while (duration < targetDuration) {
      tracksToAdd.push(`spotify:track:${trackDetails[i].id}`);
      duration += trackDetails[i].duration;
      i += 1;
    }
    console.log(playlist.id);
    // console.log(playlists.body.items);
    await spotify.addSongsToPlaylist(instance, playlist.id, tracksToAdd);
    return res.json(trackDetails);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
