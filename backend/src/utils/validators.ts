import { NextFunction, Response, Request } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();
    res.status(400).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Invalid email."),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

export const signupValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  ...loginValidator,
];

export const chatCompletionValidator = [
  body("prompt").notEmpty().withMessage("A prompt message is required."),
];
