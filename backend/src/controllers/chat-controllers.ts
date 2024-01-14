import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { configureOpenAI } from '../config/openai-config.js';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

/**
 * Generates a chat response based on the provided prompt.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response containing the generated chat completion.
 */
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prompt } = req.body;
  try {
    // This sub-block may need to be extracted to a separate function
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({ message: 'Invalid OR expired token!' });
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Incorrect token!');
    }

    // Get chat history and append the prompt message
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ role: 'user', content: prompt });
    user.chats.push({ role: 'user', content: prompt });

    // Generate chat completion
    const openai = configureOpenAI();
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chats as ChatCompletionMessageParam[],
    });

    user.chats.push(chatCompletion.choices[0].message);
    await user.save();
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Sends chats to the user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the user's chats or an error message.
 */
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send('Invalid OR expired token!');
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Incorrect token!');
    }

    res.status(200).json({ message: 'OK', chats: user.chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

/**
 * Deletes all chats for the authenticated user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response indicating the success or failure of the operation.
 */
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send('Invalid OR expired token!');
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Incorrect token!');
    }

    // @ts-ignore
    user.chats = [];
    await user.save();
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};
