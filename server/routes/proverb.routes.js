import express from 'express';
import ProverbController from '../controllers/proverb.controller';
import proverbInputValidation from '../validations/proverb.validation';
import { proverbIdValidation, checkProverbExist } from '../middlewares/checkProverbId.middleware';

const route = express.Router();
const {
  createProverb,
  editProverb,
  getAllProverbs,
  getAllProverbsByPostedBy,
  getAllProverbsByUser,
  getProverbById,
  deleteProverb
} = ProverbController;

route.post('/proverb/add', proverbInputValidation, createProverb);
route.put('/proverb/edit/:proverbId', [proverbIdValidation, checkProverbExist], proverbInputValidation, editProverb);
route.get('/proverbs', getAllProverbs);
route.get('/proverbs/mine', getAllProverbsByPostedBy);
route.get('/proverbs/:postedBy', getAllProverbsByUser);
route.get('/proverb/:proverbId', [proverbIdValidation, checkProverbExist], getProverbById);
route.delete('/proverb/:proverbId', [proverbIdValidation, checkProverbExist], deleteProverb);
export default route;
