import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
import { generateToken } from '../utils/tokens-manager.js';
import { COOKIE_NAME, COOKIE_OPTIONS } from '../utils/constants.js';

/**
 * Clears the current cookie from the response object.
 * @param res - The response object.
 */
const clearCurrentCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    path: '/',
    ...COOKIE_OPTIONS,
  });
};

/**
 * Retrieves all users from the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the list of users or an error message.
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

/**
 * Handles user signup.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the user's name and email if login is successful, or an error message if login fails.
 */
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Clear cookie before setting it
    clearCurrentCookie(res);
    const token = generateToken(user._id.toString(), user.email, '14d');
    res.cookie(COOKIE_NAME, token, {
      ...COOKIE_OPTIONS,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

/**
 * Handles user login.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the user's name and email if login is successful, or an error message if login fails.
 */
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not registered' });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Clear cookie before setting it
    clearCurrentCookie(res);
    const token = generateToken(user._id.toString(), user.email, '14d');
    res.cookie(COOKIE_NAME, token, {
      ...COOKIE_OPTIONS,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

/**
 * Verify user authentication and retrieve user information.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with user information if authentication is successful, or an error message if authentication fails.
 */
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send('Invalid OR expired token!');
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Incorrect token!');
    }

    res.status(200).json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

/**
 * Logs out the user by clearing the authentication cookie.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the user's name and email if successful, or an error message if unsuccessful.
 */
export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send('Invalid OR expired token!');
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Incorrect token!');
    }

    clearCurrentCookie(res);
    res.status(200).json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};
