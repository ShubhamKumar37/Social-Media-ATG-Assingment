import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import userRoute from './routes/user.route.js';
import commentRoute from './routes/comment.route.js';
import postRoute from './routes/post.route.js';

dotenv.config();

const app = express();

app.use(errorHandler);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

userRoute.use('/api/v1/user', userRoute);
commentRoute.use('/api/v1/comment', commentRoute);
postRoute.use('/api/v1/post', postRoute);

app.get('/', (_, res) => res.send('Hello World!'));

export default app;
