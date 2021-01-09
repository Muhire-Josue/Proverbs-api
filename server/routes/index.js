import express from 'express';
import welcomeRoute from './welcome.routes';
import userRoute from './user.routes';

const app = express.Router();

app.use(welcomeRoute);
app.use(userRoute);

export default app;
