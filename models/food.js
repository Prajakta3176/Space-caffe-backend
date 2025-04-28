import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const foodSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Food = model.Food || model("Food", foodSchema);
export default Food;
