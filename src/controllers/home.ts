/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';

const showHome = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return res.render('afterLogin');
  } catch (error) {
    return next(error);
  }
};

export default showHome;
