import express from "express";
import { addOrUpdateReview, getAllReviews,deleteReview, deleteReviewByAdmin } from "../controllers/review.js";
import authenticateToken from "../middlewares/userAuth.js";
import authenticateAdmin from "../middlewares/adminAuth.js"

const reviewRouter = express.Router();

reviewRouter.post("/add-or-update-review",authenticateToken, addOrUpdateReview)      
.get("/get-all-reviews/:foodid", getAllReviews) 
.delete("/delete-review/:foodid",authenticateToken, deleteReview) 
.delete("/admin-delete-review/:foodid/:userid",authenticateAdmin, deleteReviewByAdmin);  


export default reviewRouter;