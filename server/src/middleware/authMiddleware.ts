import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new Error('Invalid or missing authorization header'));
  }

  const token = authHeader.slice(7); // Assuming token is after "Bearer "

  try {
    jwt.verify(token, process.env.JWT_SECRET as string); // Verify token (ignoring payload extraction)
    next();
  } catch (error) {
    return next(new Error('Invalid token'));
  }
};