import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
} from "../controllers/user-controllers.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";

const userRouter = Router({ strict: true });

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);

export default userRouter;
