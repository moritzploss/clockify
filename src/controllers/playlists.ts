import * as spotify from '../spotify/apiTools';
import * as tracks from '../tracks/index';
import * as time from '../time/index';

const populate = async (req, res, next) => {
  try {
    const apiInstance = await spotify.newApiInstance(req.session.accessToken);
    const targetDuration = time.userInputToMilliseconds(req.body);
    const targetPlaylist = await spotify.getTargetPlaylist(apiInstance);
    const { userTracks, error } = await spotify.getNUserTracks(apiInstance, 200);

    if (error) {
      res.render('error');
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
