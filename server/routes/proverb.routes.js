import express from 'express';
import ProverbController from '../controllers/proverb.controller';
import proverbInputValidation from '../validations/proverb.validation';

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
route.put('/proverb/edit/:id', proverbInputValidation, editProverb);
route.get('/proverbs', getAllProverbs);
route.get('/proverbs/mine', getAllProverbsByPostedBy);
route.get('/proverbs/:postedBy', getAllProverbsByUser);
route.get('/proverb/:proverbId', getProverbById);
route.delete('/proverb/:proverbId', deleteProverb);
export default route;
