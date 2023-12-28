import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const generateToken = (id: string, email: string, expiresIn: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not received!" });
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token expired!" });
      } else {
        resolve();
        res.locals.jwtData = decoded;
        return next();
      }
    });
  });
};
