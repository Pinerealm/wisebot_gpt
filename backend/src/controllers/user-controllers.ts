import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";

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
    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "OK", id: user._id.toString() });
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
    // res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
