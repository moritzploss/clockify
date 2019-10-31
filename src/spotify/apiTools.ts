import * as spotifyConfig from './config';

const newApiInstance = async (spotifyCode: string) => {
  const spotifyApi = spotifyConfig.apiWithCredentials();
  const data = await spotifyApi.authorizationCodeGrant(spotifyCode);
  spotifyApi.setAccessToken(data.body.access_token);
  spotifyApi.setRefreshToken(data.body.refresh_token);
  return spotifyApi;
};

const getUser = async (apiInstance) => apiInstance.getMe();

const getUserPlaylists = async (apiInstance) => {
  const { body } = await getUser(apiInstance);
  return apiInstance.getUserPlaylists(body.id);
};

const addSongsToPlaylist = async (apiInstance, playlist: string, songArray: string[]) => (
  apiInstance.addTracksToPlaylist(playlist, songArray)
);

const createPlaylist = async (apiInstance, listName: string) => {
  const { body } = await getUser(apiInstance);
  return apiInstance.createPlaylist(body.id, listName);
};

const getUserTracks = async (apiInstance, limit: number, offset: number) => {
  return apiInstance.getMySavedTracks({
    limit,
    offset,
  });
};

export {
  newApiInstance,
  getUser,
  addSongsToPlaylist,
  createPlaylist,
  getUserPlaylists,
  getUserTracks,
};
