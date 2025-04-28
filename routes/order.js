import express from 'express';
import authenticateToken from '../middlewares/userAuth.js';
import { getAllOrders, getOrderHistory, placeOrder, updateOrderStatus, viewEachOrder } from '../controllers/order.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
const orderRouter =  express.Router();

orderRouter
.patch('/place-order',authenticateToken, placeOrder)
.get('/get-order-history',authenticateToken, getOrderHistory)
.get('/admin-get-all-orders',authenticateAdmin,getAllOrders)
.patch('/admin-update-status',authenticateAdmin,updateOrderStatus)
.get('/admin-view-each-order',authenticateAdmin,viewEachOrder)

export default orderRouter;