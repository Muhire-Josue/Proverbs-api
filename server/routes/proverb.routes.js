import express from 'express';
import ProverbController from '../controllers/proverb.controller';
import proverbInputValidation from '../validations/proverb.validation';

const route = express.Router();
const { createProverb } = ProverbController;

route.post('/proverb/add', proverbInputValidation, createProverb);
export default route;
