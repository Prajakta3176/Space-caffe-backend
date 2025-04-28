import express from 'express';
import {  getUserInfo, signin, signup, updateAddress } from '../controllers/user.js';
import authenticateToken from '../middlewares/userAuth.js';

const userRouter = express.Router();

userRouter.post('/signup',signup)
.post('/signin', signin)
.get('/get-user-information', authenticateToken, getUserInfo)
.patch('/update-address',authenticateToken,updateAddress)


export default userRouter;