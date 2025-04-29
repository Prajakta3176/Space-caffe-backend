import Food from "../models/food.js";
import User from "../models/user.js";

export const addOrUpdateReview = async(req,res)=>{
    try{

        const foodid = req.headers['foodid']
        const id = req.headers['id']

        const {rating, comment} = req.body;
        
        console.log('foodid:', foodid);
        console.log('id:', id);
        console.log('rating:', rating);
        console.log('comment:', comment);

        const food = await Food.findById(foodid);
        if (!food) return res.status(404).json({ message: "Food item not found" });

        const existingReviewIndex = food.reviews.findIndex((r)=> r.user.toString() === id);

        if(existingReviewIndex !== -1){
            // if for particular food you have already added an review next time yo try to add add it will just update the previous one 
            food.reviews[existingReviewIndex].rating = rating;
            food.reviews[existingReviewIndex].comment = comment;
            food.reviews[existingReviewIndex].createdAt = new Date();

        }else{
            food.reviews.push({
                user : id,
                rating : rating,
                comment : comment
            })
        }

        const totalRating = food.reviews.reduce((sum, r)=> sum + r.rating, 0);
        food.averageRating = totalRating / food.reviews.length;

        await food.save();
        res.status(200).json({ message: "Review added/updated successfully" });

    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"})
    }
}

export const getAllReviews = async(req,res)=>{
    try{
        const {foodid} = req.params;
        const food = await Food.findById(foodid).populate('reviews.user',"fullname email").sort({createdAt : -1})
        if(!food){
            return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({
            reviews : food.reviews,
            averageRating : food.averageRating
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"})
    }
}

export const deleteReview = async(req,res)=>{
    try{

        const {foodid} = req.params;
        const userId = req.headers['id'];




        const food = await Food.findById(foodid);
        if (!food) return res.status(404).json({ message: "Food item not found" });

        const updatedReviews = food.reviews.filter(
            (review) => review.user.toString() !== userId
          );

          food.reviews = updatedReviews;

          const totalRating = food.reviews.reduce((sum, r) => sum + r.rating, 0);
        food.averageRating = food.reviews.length > 0
      ? totalRating / food.reviews.length
      : 0;

    await food.save();

    res.status(200).json({ message: "Review deleted successfully" });


    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"})
    }
}
export const deleteReviewByAdmin = async(req,res)=>{
    try{

        const {foodid,userid} = req.params;
        // const adminid = req.headers['id'];



        const food = await Food.findById(foodid);
        if (!food) return res.status(404).json({ message: "Food item not found" });

        const updatedReviews = food.reviews.filter(
            (review) => review.user.toString() !== userid
          );

          food.reviews = updatedReviews;

          const totalRating = food.reviews.reduce((sum, r) => sum + r.rating, 0);
        food.averageRating = food.reviews.length > 0
      ? totalRating / food.reviews.length
      : 0;

    await food.save();

    res.status(200).json({ message: "Review deleted successfully" });


    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal server error"})
    }
}