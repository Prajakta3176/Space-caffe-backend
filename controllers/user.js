import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

export const signup = async (req, res) => {
  try {
    const { fullname, number, email, password } = req.body;
    if (!fullname || !number || !email || !password) {
      return res.status(300).json({ message: "All fields are required" });
    }

    const existingNumber = await User.findOne({ number: number });
    const existingEmail = await User.findOne({ email: email });

    if (existingEmail || existingNumber) {
      return res.status(300).json({ message: "User already exist" });
    }

    // email and password validation

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter valid email " });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Please enter strong password" });
    }
    if (String(number).length < 10) {
      return res
        .status(400)
        .json({ message: "Please enter valid contact number" });
    }
    // console.log(number.length);

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = new User({
      fullname: fullname,
      email: email,
      password: hashPass,
      number: number,
    });

    await user.save();
    res.status(200).json({ message: "Signed up successfully!" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password, number } = req.body;
    if (!((email && password) || (number && password))) {
      return res.status(300).json({ message: "All fields are required!" });
    }

    let existingUser;
    if (email) {
      existingUser = await User.findOne({ email: email });
    } else if (number) {
      existingUser = await User.findOne({ number: number });
    }

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
      const authClaims = {
        id: existingUser.id,
      };

      const token = jwt.sign(authClaims, process.env.JWT_PASSWORD, {
        expiresIn: "15d",
      });

      //   console.log(email, number);

      res
        .status(200)
        .json({ success: true, id: existingUser.id, token: token });
    } else {
      res.status(400).json({ message: "Invalid Credential" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const id = req.headers["id"];
    const data = await User.findById(id).select("-password");
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const id = req.headers["id"];
    const { address } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { address: address },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "Address updated successfully" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
