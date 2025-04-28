import express from "express";
import {
  addFoodItem,
  addFoodItems,
  deleteFoodItem,
  getAllFoodItems,
  getFoodByCategory,
  getFoodById,
  getFoodByName,
  updateDetails,
} from "../controllers/food.js";
import authenticateAdmin from "../middlewares/adminAuth.js";

const foodRouter = express.Router();

// image storage engine

foodRouter
  // for user
  .get("/get-all-food-items", getAllFoodItems)
  .get("/get-food-item-by-id/:foodid", getFoodById)
  .get('/get-food-by-category/:category',getFoodByCategory)
  .get('/get-food-by-name/:name',getFoodByName)


  // for admin
  .post("/add-food-item", authenticateAdmin, addFoodItem)
  .post("/add-food-items", authenticateAdmin, addFoodItems)
  .delete("/delete-food-item/:foodid", authenticateAdmin, deleteFoodItem)
  .patch("/update-food-item-details/:foodid", authenticateAdmin, updateDetails);

export default foodRouter;
