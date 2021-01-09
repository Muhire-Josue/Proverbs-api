import express from 'express';
import ProverbController from '../controllers/proverb.controller';
import proverbInputValidation from '../validations/proverb.validation';

const route = express.Router();
const { createProverb, editProverb } = ProverbController;

route.post('/proverb/add', proverbInputValidation, createProverb);
route.put('/proverb/edit/:id', proverbInputValidation, editProverb);
export default route;
