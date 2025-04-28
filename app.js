
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
server.use('/api/food',foodRouter)
server.use('/api/user',userRouter)
server.use('/api/admin',adminRouter)
server.use('/api/cart',cartRouter)
server.use('/api/review',reviewRouter)
server.use('/api/order',orderRouter)

server.get('/', (req, res) => {
    res.send("Backend server is running fine 🚀");
});

server.listen(process.env.PORT, ()=>{
    console.log("Server is running");
})