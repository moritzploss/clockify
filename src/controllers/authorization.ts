/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

const requireLogin = (req: Request, res: Response, next: NextFunction): void => (
  (req.session.spotifyCode)
    ? next()
    : res.render('beforeLogin')
);

export default requireLogin;
