import express from 'express';
import LikeController from '../controllers/like.controller';

const route = express.Router();
const { likeProverb } = LikeController;

route.post('/proverb/like', likeProverb);

export default route;
