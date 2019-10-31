import * as spotifyConfig from './config';

const { logger } = require('../logging/logging');

const spotifyApi = spotifyConfig.apiWithCredentials();

const newApiInstance = async (spotifyCode: string) => {
  logger.info('attempting to get authoriazation code grant');
  const data = await spotifyApi.authorizationCodeGrant(spotifyCode);
  logger.info('attempting to set access token');
  spotifyApi.setAccessToken(data.body.access_token);
  logger.info('attempting to set refresh token');
  spotifyApi.setRefreshToken(data.body.refresh_token);
  return spotifyApi;
};

const getUser = async (apiInstance) => apiInstance.getMe();

const getUserPlaylists = async (apiInstance) => {
  const { body } = await getUser(apiInstance);
  logger.info('attempting to getUserPlaylists');
  return apiInstance.getUserPlaylists(body.id);
};

const addSongsToPlaylist = async (apiInstance, playlist: string, songArray: string[]) => {
  logger.info('attempting to add songs to user playlist');
  return apiInstance.addTracksToPlaylist(playlist, songArray);
};

const replaceTracksInPlaylist = async (apiInstance, playlist: string, tracks: string[]) => {
  logger.info('attempting to replace tracks in user playlist');
  return apiInstance.replaceTracksInPlaylist(playlist, tracks);
};

const createPlaylist = async (apiInstance, listName: string) => {
  logger.info('attempting to get user');
  const { body } = await getUser(apiInstance);
  logger.info('attempting to create playlist');
  return apiInstance.createPlaylist(body.id, listName);
};

const getUserTracks = async (apiInstance, limit: number, offset: number) => {
  logger.info('attempting to get saved tracks');
  return apiInstance.getMySavedTracks({ limit, offset });
};

const getTargetPlaylist = async (apiInstance) => {
  logger.info('attempting to get user playlists');
  const userPlaylists = await getUserPlaylists(apiInstance);
  const playlistDetails = userPlaylists.body.items.map(({ id, name }) => ({ name, id }));
  let targetPlaylist = playlistDetails.find((list) => list.name === process.env.PLAYLIST_NAME);

  if (!targetPlaylist) {
    logger.info('attempting to get create playlist');
    const { body } = await createPlaylist(apiInstance, process.env.PLAYLIST_NAME);
    targetPlaylist = body;
  }

  return targetPlaylist.id;
};

const getPublicLink = (playlistId) => `https://open.spotify.com/playlist/${playlistId}`;


const getNUserTracks = async (apiInstance, n: number) => {
  const tracks = [];
  let i = 0;
  const step = 50;
  while (tracks.length < n) {
    const { body } = await getUserTracks(apiInstance, step, i * step);
    tracks.push(...body.items);
    i += 1;
  }
  return tracks;
};

export {
  newApiInstance,
  getUser,
  addSongsToPlaylist,
  createPlaylist,
  getUserPlaylists,
  getUserTracks,
  replaceTracksInPlaylist,
  getNUserTracks,
  getTargetPlaylist,
  getPublicLink,
};
