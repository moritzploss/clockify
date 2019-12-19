/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';

const requireLogin = (req: Request, res: Response, next: NextFunction): void => (
  (req.session.spotifyCode)
    ? next()
    : res.render('beforeLogin')
);

export default requireLogin;
