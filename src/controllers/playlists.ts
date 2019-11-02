/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as spotify from '../spotify/apiTools';
import getFixedDurationPlaylist from '../tracks/index';
import userInputToMilliseconds from '../time/index';

const makePlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apiInstance = await spotify.newApiInstance(req.session.accessToken);
    const targetPlaylistId = await spotify.getTargetPlaylist(apiInstance);
    const { userTracks, error } = await spotify.getNUserTracks(apiInstance, 500);
    if (error) return res.render('error');

    const playlist = getFixedDurationPlaylist(userTracks, userInputToMilliseconds(req.body));
    await spotify.replaceTracksInPlaylist(apiInstance, targetPlaylistId, playlist);
    return res.render('created', { playlistUrl: spotify.getPublicLink(targetPlaylistId) });
  } catch (error) {
    return next(error);
  }
};

export default makePlaylist;
