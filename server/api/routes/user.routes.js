import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, loginUser, logoutUser, getUserById, getAllUsers } from '../controllers/user.controller.js';
import { isAuth } from '../../authentication/jwt.js';

const userRoutes = express.Router();

userRoutes.get('/', [isAuth] , getAllUsers);
userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
//userRoutes.post("/", createUser);
//userRoutes.get("/dni/:dni", getUsersByDni);



export { userRoutes };