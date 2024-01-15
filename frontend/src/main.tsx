/**
 * Entry point of the application.
 * Renders the root component and sets up the necessary configurations.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

import { Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto slab, serif',
    allVariants: { color: 'rgb(211, 206, 206)' },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
