import * as spotify from '../spotify/apiTools';
import * as tracks from '../tracks/index';
import * as time from '../time/index';

const populate = async (req, res, next) => {
  try {
    const apiInstance = await spotify.newApiInstance(req.session.spotifyCode);
    const targetDuration = time.userInputToMilliseconds(req.body);
    const targetPlaylist = await spotify.getTargetPlaylist(apiInstance);
    const userTracks = await spotify.getNUserTracks(apiInstance, 500);
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
