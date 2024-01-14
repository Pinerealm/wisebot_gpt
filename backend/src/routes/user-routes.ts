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

// Router for handling user-related routes.
const userRouter = Router({ strict: true });

// User routes
userRouter.get('/', getAllUsers);
userRouter.post('/signup', validate(signupValidator), userSignup);
userRouter.post('/login', validate(loginValidator), userLogin);
userRouter.get('/auth-status', verifyToken, verifyUser);
userRouter.get('/logout', verifyToken, userLogout);

export default userRouter;
