import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers.js";
import { validate, signupValidator } from "../utils/validators.js";

const userRouter = Router({ strict: true });

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);

export default userRouter;
