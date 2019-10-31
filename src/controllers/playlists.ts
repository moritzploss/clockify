/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as spotify from '../spotify/apiTools';
import * as tracks from '../tracks/index';
import * as time from '../time/index';

const populate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiInstance = await spotify.newApiInstance(req.session.accessToken);
    const targetDuration = time.userInputToMilliseconds(req.body);
    const targetPlaylist = await spotify.getTargetPlaylist(apiInstance);
    const { userTracks, error } = await spotify.getNUserTracks(apiInstance, 500);

    if (error) {
      return res.render('error');
    }

    const newTracks = tracks.getNewTracks(userTracks, targetDuration);
    await spotify.replaceTracksInPlaylist(apiInstance, targetPlaylist, newTracks);
    return res.render('created', { playlistUrl: spotify.getPublicLink(targetPlaylist) });
  } catch (error) {
    return next(error);
  }
};

export {
  populate,
};
