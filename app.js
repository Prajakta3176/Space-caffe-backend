import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conn from './connection/connection.js'; // MongoDB connection function

// Load env variables
dotenv.config();

// Create express server
const server = express();

// Middlewares (move above listen)
server.use(express.json());
server.use(cors());

// Routers
import foodRouter from './routes/food.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import cartRouter from './routes/cart.js';
import reviewRouter from './routes/review.js';
import orderRouter from './routes/order.js';

// Start app only after DB connection
const startServer = async () => {
  try {
    await conn(); // 🛠️ Wait for DB connection to finish
    server.use('/api/food', foodRouter);
    server.use('/api/user', userRouter);
    server.use('/api/admin', adminRouter);
    server.use('/api/cart', cartRouter);
    server.use('/api/review', reviewRouter);
    server.use('/api/order', orderRouter);

    server.get('/', (req, res) => {
      res.send("Backend server is running fine 🚀");
    });

    server.listen(process.env.PORT || 8080, () => {
      console.log("🚀 Server is running");
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();
