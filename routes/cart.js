import express from 'express';
import authenticateToken from '../middlewares/userAuth.js';
import { addFoodInCart, decreaseQuantityOfItem, getAllCartItems, removeFoodFromCart } from '../controllers/cart.js';


const cartRouter = express.Router();

cartRouter
.patch('/add-food-in-cart',authenticateToken, addFoodInCart)
.patch('/remove-food-from-cart',authenticateToken, removeFoodFromCart)
.get('/get-all-cart-items',authenticateToken, getAllCartItems)
.patch('/decrease-quantity-of-item',authenticateToken,decreaseQuantityOfItem);


export default cartRouter;