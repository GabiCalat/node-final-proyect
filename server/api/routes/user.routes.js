import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { registerUser, loginUser, logoutUser, getUserById, getAllUsers, editUser } from '../controllers/user.controller.js';
import { isAuth } from '../../authentication/jwt.js';

import {upload, uploadToCloudinary} from '../../middlewares/file.middleware.js';

const userRoutes = express.Router();

userRoutes.get('/', [isAuth] , getAllUsers);
userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.put('/edit/:id', [upload.single('image'), uploadToCloudinary], editUser);
userRoutes.post('/logout', logoutUser);
userRoutes.get("/:id", getUserById);
//userRoutes.post("/add-photo", [upload.single('image'), uploadToCloudinary], createPhotoUserFile);
//userRoutes.post("/", createUser);
//userRoutes.get("/dni/:dni", getUsersByDni);



export { userRoutes };