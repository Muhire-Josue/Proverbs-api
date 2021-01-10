import express from 'express';
import CommentController from '../controllers/comment.controller';

const route = express.Router();
const { CommentProverb, editComment, removeComment } = CommentController;

route.post('/proverb/comment', CommentProverb);
route.put('/proverb/comment/edit', editComment);
route.delete('/proverb/comment/delete/:commentId', removeComment);

export default route;
