import express from 'express';
import welcomeRoute from './welcome.routes';
import userRoute from './user.routes';
import proverbRoute from './proverb.routes';

const app = express.Router();

app.use(welcomeRoute);
app.use(userRoute);
app.use(proverbRoute);

export default app;
