import * as spotifyConfig from './config';

const newApiInstance = async (spotifyCode: string) => {
  const spotifyApi = spotifyConfig.apiWithCredentials();
  const data = await spotifyApi.authorizationCodeGrant(spotifyCode);
  spotifyApi.setAccessToken(data.body.access_token);
  spotifyApi.setRefreshToken(data.body.refresh_token);
  return spotifyApi;
};

const getUser = async (apiInstance) => apiInstance.getMe();

const addSongsToPlaylist = async (apiInstance, playlist: string, songArray: string[]) => (
  apiInstance.addTracksToPlaylist(playlist, songArray)
);

const createPlaylist = async (apiInstance, listName: string) => {
  const { body } = await getUser(apiInstance);
  return apiInstance.createPlaylist(body.id, listName);
};

export {
  newApiInstance,
  getUser,
  addSongsToPlaylist,
  createPlaylist,
};
