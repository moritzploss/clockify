"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpotifyWebApi = require("spotify-web-api-node");
var stateKey = 'spotify_auth_state';
exports.stateKey = stateKey;
var scope = [
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
exports.scope = scope;
var apiWithCredentials = function () { return (new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
})); };
exports.apiWithCredentials = apiWithCredentials;
