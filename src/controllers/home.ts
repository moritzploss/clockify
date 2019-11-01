/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express-serve-static-core';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'connect';

const showHome = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return res.render('afterLogin');
  } catch (error) {
    return next(error);
  }
};

export {
  showHome,
};
