import express from 'express';
import { adminSignin, adminSignup } from '../controllers/admin.js';

const adminRouter = express.Router();

adminRouter
.post('/admin-signup',adminSignup)
.post('/admin-signin',adminSignin)


export default adminRouter;