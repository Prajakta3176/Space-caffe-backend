import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        food: { type: mongoose.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, default: 1 },
      }
    ],
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for Delivery", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
