import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index-routes.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ORIGIN } from './utils/constants.js';

config();
// Express application instance.
const app = express();

// Middlewares
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev')); // Development mode

// API routes
app.use('/api/v1', appRouter);

export default app;
