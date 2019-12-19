import SpotifyWebApi = require('spotify-web-api-node');

const stateKey = 'spotify_auth_state';

const scope = [
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-modify',
  'playlist-read-private',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-private',
  'user-read-email',
  'user-library-modify',
  'user-library-read',
  'user-follow-modify',
  'user-follow-read',
  'user-read-recently-played',
  'user-top-read',
  'streaming',
  'app-remote-control',
].join(' ');

const getRedirectURI = (): string => (
  (process.env.NODE_ENV === 'production')
    ? process.env.SPOTIFY_REDIRECT_URI_PROD
    : process.env.SPOTIFY_REDIRECT_URI_DEV
);

const apiWithCredentials = (): SpotifyWebApi => (
  new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: getRedirectURI(),
  })
);

export {
  stateKey,
  scope,
  apiWithCredentials,
  getRedirectURI,
};
