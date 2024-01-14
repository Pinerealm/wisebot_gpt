import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';

/**
 * Generates a token with the provided id, email, and expiration time.
 * @param id - The user's id.
 * @param email - The user's email.
 * @param expiresIn - The expiration time for the token.
 * @returns The generated token.
 */
export const generateToken = (id: string, email: string, expiresIn: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verifies the token received in the request's signed cookies.
 * If the token is valid, it sets the decoded token data in the response locals and calls the next middleware.
 * If the token is invalid or expired, it sends a 401 response with an appropriate error message.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves if the token is valid, or rejects with an error message if the token is invalid or expired.
 */
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === '') {
    return res.status(401).json({ message: 'Token not received!' });
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: 'Token expired!' });
      } else {
        resolve();
        res.locals.jwtData = decoded;
        return next();
      }
    });
  });
};
