import Food from "../models/food.js";

// admin

export const addFoodItem = async (req, res) => {
  try {
    // let image_filename = `${req.file.filename}`;
    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingItem = await Food.findOne({ name: name });
    if (existingItem) {
      return res
        .status(409)
        .json({ message: "Food item with the same name already exist!" });
    }

    const food = new Food({
      name: name,
      description: description,
      price: price,
      image: image,
      category: category,
    });

    await food.save();
    res.status(200).json({ success: true, message: "Food added successfully" });
  } catch(err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteFoodItem = async (req, res) => {
  try {
    const { foodid } = req.params;
    const foodItem = await Food.findByIdAndDelete(foodid);
    console.log(foodItem);
    if (!foodItem) {
      return res.status(400).json({
        success: false,
        message: "There's no item with given id to delete",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Food item deleted successfully" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { foodid } = req.params;
    const dataToUpdate = req.body;
    const updatedFood = await Food.findByIdAndUpdate(foodid, dataToUpdate, {
      new: true,
    });

    if (!updatedFood) {
      return res.status(400).json({
        success: false,
        message: "There's no item with given id to update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      updatedFood,
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

// user

export const getAllFoodItems = async (req, res) => {
  try {
    const allFoodItems = await Food.find().sort({ createdAt: -1 });
    if (allFoodItems === 0) {
      res.status(404).json({ message: "Error fetching food items." });
    }

    res.status(200).json({ success: true, data: allFoodItems });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const { foodid } = req.params;
    const foodItem = await Food.findById(foodid);

    if (!foodItem) {
      return res
        .status(400)
        .json({ success: false, message: "There's no item with given id" });
    }

    res.status(200).json({ success: true, foodItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addFoodItems = async (req, res) => {
  try {
    const foods = req.body;

    if (!Array.isArray(foods) || foods.length === 0) {
      return res.status(400).json({
        message: "Invalid Food data. Please provide an array of foods.",
      });
    }

    await Food.insertMany(foods);
    res.status(200).json({ message: "Food added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFoodByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foodItems = await Food.find({ category: category });

    if (!foodItems) {
      return res
        .status(400)
        .json({ success: false, message: "No item found with such category" });
    }

    res.status(200).json(foodItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFoodByName = async (req, res) => {
  try {
    const { name } = req.params;

    const foodItems = await Food.find({
      name: { $regex: name, $options: "i" }, // partial + case-insensitive match
    });

    if (!foodItems || foodItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food items found matching the search keyword.",
      });
    }

    res.status(200).json(foodItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
