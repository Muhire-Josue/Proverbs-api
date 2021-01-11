import express from 'express';
import CommentController from '../controllers/comment.controller';
import { checkCommentExist, validateCommentId } from '../middlewares/checkCommentId.middleware';
import { proverbIdValidation, checkProverbExist } from '../middlewares/checkProverbId.middleware';

const route = express.Router();
const { CommentProverb, editComment, removeComment } = CommentController;

route.post('/proverb/:proverbId/comment', [proverbIdValidation, checkProverbExist], CommentProverb);
route.put('/proverb/comment/edit/:commentId', [validateCommentId, checkCommentExist], editComment);
route.delete('/proverb/comment/delete/:commentId', [validateCommentId, checkCommentExist], removeComment);

export default route;
