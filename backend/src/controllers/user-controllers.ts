import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { generateToken } from "../utils/tokens-manager.js";
import { COOKIE_NAME, COOKIE_OPTIONS } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Clear cookie before setting it
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      ...COOKIE_OPTIONS,
    });

    const token = generateToken(user._id.toString(), user.email, "14d");
    res.cookie(COOKIE_NAME, token, {
      ...COOKIE_OPTIONS,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ message: "User not registered" });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Invalid credentials");
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Clear cookie before setting it
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      ...COOKIE_OPTIONS,
    });

    const token = generateToken(user._id.toString(), user.email, "14d");
    res.cookie(COOKIE_NAME, token, {
      ...COOKIE_OPTIONS,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
