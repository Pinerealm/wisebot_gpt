import { Router } from "express";
import { verifyToken } from "../utils/tokens-manager.js";
import { chatCompletionValidator } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";

const chatRouter = Router();
chatRouter.post(
  "/new",
  chatCompletionValidator,
  verifyToken,
  generateChatCompletion
);

export default chatRouter;
