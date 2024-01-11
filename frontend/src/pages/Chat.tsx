import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';

import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    const prompt = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: ChatMessage = { role: 'user', content: prompt };
    setChatMessages((prevChats) => [...prevChats, newMessage]);
    const chatResponse = await sendChatRequest(prompt);
    setChatMessages([...chatResponse.chats]);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const scrollToBottom = () => {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting chats...', { id: 'deleteChats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Chats deleted successfully!', { id: 'deleteChats' });
    } catch (error) {
      console.log(error);
      toast.error("Couldn't delete chats!", { id: 'deleteChats' });
    }
  };

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate('/login');
    }
  }, [auth]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading('Loading chat...', { id: 'loadChats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          if (data.chats.length > 0) {
            scrollToBottom();
            toast.success('Chats loaded successfully!', { id: 'loadChats' });
          } else {
            toast.success('No chats found!', { id: 'loadChats' });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Couldn't load chats!", { id: 'loadChats' });
        });
    }
  }, [auth]);
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ')[1][0]}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
            You are logged in as {auth?.user?.name}
            <br />
            Feel free to ask any question.
            <br />
            Avoid sharing personal information.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: '200px',
              m: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
          >
            Delete chats
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '35px',
            fontWeight: 600,
            color: 'white',
            mb: 2,
            mx: 'auto',
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          id="chat-box"
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            // Design the scroll bar
            '&::-webkit-scrollbar': {
              width: '0.5em',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'darkgrey',
            },
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem
              content={chat.content}
              role={chat.role as 'user' | 'assistant'}
              key={index}
            />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,29,39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            placeholder="Enter your prompt here..."
            ref={inputRef}
            onKeyDown={handleEnterKeyPress}
            type="text"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: 'auto', color: 'white', mx: 2 }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
