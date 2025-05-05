import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    cart: [
      {
        food: { type: mongoose.Types.ObjectId, ref: "Food" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const User =model("User", userSchema);
export default User;
