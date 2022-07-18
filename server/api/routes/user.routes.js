import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, loginUser, logoutUser, getUserById, getAllUsers, editUser, addNewContact } from '../controllers/user.controller.js';
import { isAuth } from '../../authentication/jwt.js';

import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

const userRoutes = express.Router();

userRoutes.get("/:id", getUserById);
userRoutes.get('/', getAllUsers);

userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);

userRoutes.put('/addContact', [isAuth], addNewContact);
userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser);

export { userRoutes };