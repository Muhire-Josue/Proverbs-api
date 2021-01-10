import express from 'express';
import welcomeRoute from './welcome.routes';
import userRoute from './user.routes';
import proverbRoute from './proverb.routes';
import likeRoute from './like.routes';
import commentRoute from './comment.routes';

const app = express.Router();

app.use(welcomeRoute);
app.use(userRoute);
app.use(proverbRoute);
app.use(likeRoute);
app.use(commentRoute);

export default app;
