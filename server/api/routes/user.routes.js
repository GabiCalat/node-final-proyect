import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, loginUser, logoutUser, getUserById, getAllUsers, editUser, addNewContact } from '../controllers/user.controller.js';
import { isAuth } from '../../authentication/jwt.js';

import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

const userRoutes = express.Router();

userRoutes.get("/:id", getUserById);
userRoutes.get('/', [isAuth], getAllUsers);
userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);

userRoutes.put('/edit/:user_id', editUser);
userRoutes.put('/addContact', [isAuth], addNewContact);

// userRoutes.put('/edit/:user_id', [upload.single('image'), uploadToCloudinary], editUser);


//userRoutes.post("/add-photo", [upload.single('image'), uploadToCloudinary], createPhotoUserFile);



export { userRoutes };