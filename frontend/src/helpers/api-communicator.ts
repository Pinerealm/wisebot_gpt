import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post('/users/login', { email, password });
  if (response.status !== 200) {
    throw new Error('Login failed');
  }
  const data = await response.data;
  return data;
};

export const checkAuthStatus = async () => {
  const response = await axios.get('/users/auth-status');
  if (response.status !== 200) {
    throw new Error('Auth status check failed');
  }
  const data = await response.data;
  return data;
};

export const sendChatRequest = async (prompt: string) => {
  const response = await axios.post('/chats/new', { prompt });
  if (response.status !== 200) {
    throw new Error('Chat request failed');
  }
  const data = await response.data;
  return data;
};

export const getUserChats = async () => {
  const response = await axios.get('/chats/all-chats');
  if (response.status !== 200) {
    throw new Error('Unable to get stored chats');
  }
  const data = await response.data;
  return data;
};

export const deleteUserChats = async () => {
  const response = await axios.delete('/chats/delete');
  if (response.status !== 200) {
    throw new Error('Unable to delete stored chats');
  }
  const data = await response.data;
  return data;
};

export const logoutUser = async () => {
  const response = await axios.get('/users/logout');
  if (response.status !== 200) {
    throw new Error('Unable to delete stored chats');
  }
  const data = await response.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post('/users/signup', { name, email, password });
  if (response.status !== 201) {
    throw new Error('Unable to signup user');
  }
  const data = await response.data;
  return data;
};
