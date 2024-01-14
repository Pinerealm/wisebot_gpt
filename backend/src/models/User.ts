import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

// Represent the chat schema for a user.
const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Represents the schema for a user in the database.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default mongoose.model('User', userSchema);
