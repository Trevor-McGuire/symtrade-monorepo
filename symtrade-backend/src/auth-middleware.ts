import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ActiveSession } from './models';

declare global {
  namespace Express {
    interface Request {
      userId?: jwt.JwtPayload;
    }
  }
}

export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      const userId = decoded.userId;
      req.userId = userId as jwt.JwtPayload;
    } catch (err) {
      console.log('Invalid token');
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
  }

  next();
};
