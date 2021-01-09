import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'regenerator-runtime/runtime';
import routes from './server/routes/index';

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }));
app.use(routes);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
export default app;
