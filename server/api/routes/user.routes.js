import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, loginUser, logoutUser, getUserById, getAllUsers, editUser, addNewContact, getUserContacts, deleteContact } from '../controllers/user.controller.js';
import { isAuth } from '../../authentication/jwt.js';

import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

const userRoutes = express.Router();

userRoutes.get('/contacts', [isAuth], getUserContacts);
userRoutes.get("/:id", getUserById);
userRoutes.get('/', getAllUsers);

userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);

userRoutes.put('/addContact', [isAuth], addNewContact);
userRoutes.put('/deleteContact', [isAuth], deleteContact);
userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser);

export { userRoutes };