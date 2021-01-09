import express from 'express';
import UserController from '../controllers/user.controller';
import userValidation from '../validations/user.validation';

const route = express.Router();
const { createUser } = UserController;

route.post('/user', userValidation, createUser);

export default route;
