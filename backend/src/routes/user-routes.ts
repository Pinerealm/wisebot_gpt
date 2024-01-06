import { Router } from 'express';
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from '../controllers/user-controllers.js';
import {
  validate,
  signupValidator,
  loginValidator,
} from '../utils/validators.js';
import { verifyToken } from '../utils/tokens-manager.js';

const userRouter = Router({ strict: true });

userRouter.get('/', getAllUsers);
userRouter.post('/signup', validate(signupValidator), userSignup);
userRouter.post('/login', validate(loginValidator), userLogin);
userRouter.get('/auth-status', verifyToken, verifyUser);
userRouter.get('/logout', verifyToken, userLogout);

export default userRouter;
