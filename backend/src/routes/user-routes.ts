import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers.js";

const userRouter = Router({ strict: true });

userRouter.get("/", getAllUsers);
userRouter.post("/signup", userSignup);

export default userRouter;
