import { Router } from "express";
import { getAllUsers } from "../controllers/user-controllers.js";

const userRouter = Router({ strict: true });

userRouter.get("/", getAllUsers);

export default userRouter;
