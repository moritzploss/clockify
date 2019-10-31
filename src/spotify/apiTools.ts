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

const replaceTracksInPlaylist = async (apiInstance, playlist: string, tracks: string[]) => (
  apiInstance.replaceTracksInPlaylist(playlist, tracks)
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

const getTargetPlaylist = async (apiInstance): Promise<string> => {
  const userPlaylists = await getUserPlaylists(apiInstance);
  const playlistDetails = userPlaylists.body.items.map(({ id, name }) => ({ name, id }));
  let targetPlaylist = playlistDetails.find((list) => list.name === process.env.PLAYLIST_NAME);

  if (!targetPlaylist) {
    const { body } = await createPlaylist(apiInstance, process.env.PLAYLIST_NAME);
    targetPlaylist = body;
  }

  return targetPlaylist.id;
};


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
};
