import User from "../models/user.js";
import Food from "../models/food.js";

export const addFoodInCart = async (req, res) => {
  try {
    const foodid = req.headers["foodid"];
    const id = req.headers["id"];

    const food = await Food.findById(foodid);
    const user = await User.findById(id);
    if (!food) {
      return res.status(400).json({ message: "Failed to find food item" });
    }
    if (!user) {
      return res.status(400).json({ message: "Failed to add item in cart" });
    }
    const existingItem = user.cart.find(
      (item) => item.food.toString() === foodid
    );

    if (existingItem) {
      await User.updateOne(
        { _id: id, "cart.food": foodid },
        { $inc: { "cart.$.quantity": 1 } }
      );
    } else {
      await User.findByIdAndUpdate(id, {
        $push: { cart: { food: foodid, quantity: 1 } },
      });
    }
    res.status(200).json({ message: "Item added to cart Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFoodFromCart = async (req, res) => {
  try {
    const foodid = req.headers["foodid"];
    const id = req.headers["id"];

    const food = await Food.findById(foodid);
    const user = await User.findById(id);
    if (!food) {
      return res.status(400).json({ message: "Failed to find food item" });
    }
    if (!user) {
      return res.status(400).json({ message: "Failed to find user" });
    }
    const itemInCart = user.cart.find(
      (item) => item.food.toString() === foodid
    );
    if (!itemInCart) {
      return res.status(300).json({ message: "Item not in cart" });
    }

    await User.findByIdAndUpdate(id, { $pull: { cart: { food: foodid } } });
    res.status(200).json({ message: "Item removed from cart Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id).populate("cart.food");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = user.cart.reverse();

    res.status(200).json(cartData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const decreaseQuantityOfItem = async (req, res) => {
  try {
    const foodid = req.headers["foodid"];
    const id = req.headers["id"];

    const food = await Food.findById(foodid);
    const user = await User.findById(id);
    if (!food) {
      return res.status(400).json({ message: "Failed to find food item" });
    }
    if (!user) {
      return res.status(400).json({ message: "Failed to find user" });
    }
    const itemInCart = user.cart.find(
      (item) => item.food.toString() === foodid
    );
    if (!itemInCart) {
      return res.status(300).json({ message: "Item not in cart" });
    }

    if (itemInCart.quantity <= 1) {
      await User.findByIdAndUpdate(id, { $pull: { cart: { food: foodid } } });
      return res
        .status(200)
        .json({ message: "Item removed from cart as quantity reached 0" });
    }

    await User.updateOne(
      { _id: id, "cart.food": foodid },
      { $inc: { "cart.$.quantity": -1 } }
    );
    res.status(200).json({ message: "Item quantity decreased successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
