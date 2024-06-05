import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../config/generateToken.js";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";

dotenv.config();

console.log("Email:", process.env.EMAIL);
console.log("Password:", process.env.PASSWORD);


export const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, password, pic, address } = req.body;

    if (!name || !email || !password || !address) {
      res.status(400).json({ message: "Please fill all the details" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
      address,
    });

    if (user) {
      const token = generateToken(user._id);
      // sendVerificationEmail(user, token);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token,
        message: "User created successfully. Please verify your email.",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      pic: user.pic,
      token: generateToken(user._id),
      message: "Logged in",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


