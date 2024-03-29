import { Router } from 'express';
import { verifyToken } from '../utils/tokens-manager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from '../controllers/chat-controllers.js';

// Router for handling chat routes.
const chatRouter = Router();

// Chat routes
chatRouter.post(
  '/new',
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRouter.get('/all-chats', verifyToken, sendChatsToUser);
chatRouter.delete('/delete', verifyToken, deleteChats);

export default chatRouter;
