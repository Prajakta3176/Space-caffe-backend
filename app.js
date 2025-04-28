import { config } from 'dotenv';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// private variable config 
dotenv.config();

// sever config
const server = express();

//mongodb atlas connection
import conn from './connection/connection.js';
conn();

// middlewares
server.use(express.json());
server.use(cors());
// server.use('/assets', express.static('assets'));


// api end points 
import foodRouter from './routes/food.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import cartRouter from './routes/cart.js';
import reviewRouter from './routes/review.js';
import orderRouter from './routes/order.js';
server.use('/',foodRouter)
server.use('/',userRouter)
server.use('/',adminRouter)
server.use('/',cartRouter)
server.use('/',reviewRouter)
server.use('/',orderRouter)

server.get('/', (req, res) => {
    res.send("Backend server is running fine 🚀");
});

server.listen(process.env.PORT, ()=>{
    console.log("Server is running");
})