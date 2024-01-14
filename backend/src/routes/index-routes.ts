import { Router } from 'express';
import userRouter from './user-routes.js';
import chatRouter from './chat-routes.js';

// Express router for handling routes in the application.
const appRouter = Router();

// API routes
appRouter.use('/users', userRouter);
appRouter.use('/chats', chatRouter);

export default appRouter;
