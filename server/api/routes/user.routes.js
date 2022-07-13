import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, getUsers, loginUser, logoutUser } from '../controllers/user.controller.js';
import { isAuth } from '../../authentication/jwt.js';

const userRoutes = express.Router();

userRoutes.get('/', [isAuth] , getUsers);
userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);



export { userRoutes };