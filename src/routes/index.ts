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


const byDuration = (track1, track2) => (
  (track1.duration < track2.duration) ? -1 : 1
);

const filterTrackData = (tracks) => (
  tracks.map((item) => ({
    duration: item.track.duration_ms,
    id: item.track.id,
    name: item.track.name,
  }))
);

const getMeanTrackLength = (tracks) => (
  Math.round(tracks.reduce((acc, curr) => acc + curr.duration, 0) / tracks.length)
);

const getTrackByDuration = (tracks, duration) => {
  const closest = tracks.reduce((prev, curr) => {
    return (Math.abs(curr.duration - duration) < Math.abs(prev.duration - duration) ? curr : prev);
  });
  return closest;
};

const getNewTracks = (userTracks, targetDuration = 60000 * 30) => {
  const sortedTracks = filterTrackData(userTracks).sort(byDuration);
  let targetLength = getMeanTrackLength(sortedTracks);
  const numberOfTracks = Math.round(targetDuration / targetLength);
  const tracksToAdd = [];

  let i = 0;
  let timeLeft = targetDuration;
  while (i <= numberOfTracks) {
    targetLength = Math.round(timeLeft / (numberOfTracks - i));
    const closest = getTrackByDuration(sortedTracks, targetLength);
    tracksToAdd.push(`spotify:track:${closest.id}`);
    sortedTracks.splice(sortedTracks.indexOf(closest), 1);
    timeLeft -= closest.duration;
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

    const userTracks = await spotify.getNUserTracks(apiInstance, 500);
    const newTracks = getNewTracks(userTracks);

    await spotify.replaceTracksInPlaylist(apiInstance, appPlaylist.id, newTracks);
    return res.json(newTracks);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
