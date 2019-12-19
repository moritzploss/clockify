import SpotifyWebApi from 'spotify-web-api-node';

import * as spotifyConfig from './config';
import { logger } from '../logging';

const spotifyApi = spotifyConfig.apiWithCredentials();

const getAccessToken = async (spotifyCode: string) => {
  logger.info('attempting to get authorization code grant');
  try {
    const { body } = await spotifyApi.authorizationCodeGrant(spotifyCode);
    return { accessToken: body.access_token };
  } catch (error) {
    return { error };
  }
};

const newApiInstance = async (accessToken: string): Promise<SpotifyWebApi> => {
  logger.info('attempting to set access token');
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};

const getUser = async (apiInstance: SpotifyWebApi) => {
  logger.info('attempting to get user data');
  return apiInstance.getMe();
};

const getUserPlaylists = async (apiInstance: SpotifyWebApi) => {
  const { body } = await getUser(apiInstance);
  logger.info('attempting to get user playlists');
  return apiInstance.getUserPlaylists(body.id);
};

const addSongsToPlaylist = async (apiInstance: SpotifyWebApi, playlist: string, songArray: string[]) => {
  logger.info('attempting to add songs to user playlist');
  return apiInstance.addTracksToPlaylist(playlist, songArray);
};

const replaceTracksInPlaylist = async (apiInstance: SpotifyWebApi, playlist: string, tracks: string[]) => {
  logger.info('attempting to replace tracks in user playlist');
  return apiInstance.replaceTracksInPlaylist(playlist, tracks);
};

const createPlaylist = async (apiInstance: SpotifyWebApi, listName: string) => {
  const { body } = await getUser(apiInstance);
  logger.info('attempting to create new playlist');
  return apiInstance.createPlaylist(body.id, listName);
};

const getUserTracks = async (apiInstance: SpotifyWebApi, limit: number, offset: number) => {
  logger.info('attempting to get saved tracks');
  return apiInstance.getMySavedTracks({ limit, offset });
};

const getTargetPlaylist = async (apiInstance: SpotifyWebApi) => {
  const userPlaylists = await getUserPlaylists(apiInstance);
  const playlistDetails = userPlaylists.body.items.map(({ id, name }) => ({ id, name }));
  let targetPlaylist = playlistDetails.find((list: Playlist) => list.name === process.env.PLAYLIST_NAME);

  if (!targetPlaylist) {
    const { body } = await createPlaylist(apiInstance, process.env.PLAYLIST_NAME);
    targetPlaylist = body;
  }

  return targetPlaylist.id;
};

const getPublicLink = (playlistId: string) => `https://open.spotify.com/playlist/${playlistId}`;

const getNUserTracks = async (apiInstance: SpotifyWebApi, n: number) => {
  const userTracks = [];
  let i = 0;
  const step = 50;
  while (userTracks.length < n) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const { body } = await getUserTracks(apiInstance, step, i * step);
      userTracks.push(...body.items);
      i += 1;
    } catch (error) {
      return { error };
    }
  }
  return { userTracks };
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
  getAccessToken,
};
