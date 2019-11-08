/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

import * as spotifyConfig from '../spotify/config';
import * as spotify from '../spotify/apiTools';

import randomstring = require('randomstring');
import querystring = require('querystring');

const logout = (req: Request, res: Response): void => {
  req.session.spotifyCode = undefined;
  res.redirect('/');
};

const saveAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.session.accessToken) {
    const { accessToken, error } = await spotify.getAccessToken(req.session.spotifyCode);
    req.session.accessToken = accessToken;
    if (error) return next(error);
  }
  return next();
};

const saveSpotifyCodeToSession = (req: Request, res: Response): void => {
  req.session.spotifyCode = req.query.code || null;
  return res.redirect('/');
};

const verifySpotifyState = (req: Request, res: Response, next: NextFunction): void => {
  const storedState = req.cookies ? req.cookies[spotifyConfig.stateKey] : null;
  const state = req.query.state || null;
  return (state === null || state !== storedState)
    ? res.redirect('/state-mismatch')
    : next();
};

const loginWithSpotify = (req: Request, res: Response): void => {
  const state = randomstring.generate(16);
  res.cookie(spotifyConfig.stateKey, state);

  const reqParams = querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: spotifyConfig.scope,
    redirect_uri: spotifyConfig.getRedirectURI(),
    state,
  });
  return res.redirect(`https://accounts.spotify.com/authorize?${reqParams}`);
};

export {
  loginWithSpotify,
  verifySpotifyState,
  saveSpotifyCodeToSession,
  saveAccessToken,
  logout,
};
