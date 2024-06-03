import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../config/generateToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

console.log("Email:", process.env.EMAIL);
console.log("Password:", process.env.PASSWORD);
const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

// async function getAccessToken() {
//   try {
//     const { token } = await oauth2Client.getAccessToken();
//     if (!token) {
//       throw new Error("Failed to obtain access token");
//     }
//     return token;
//   } catch (error) {
//     console.error("Error getting access token:", error);
//     throw error;
//   }
// }

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    //     accessToken:  await getAccessToken(), // optional, will be generated automatically
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter verified successfully");
  }
});

const sendVerificationEmail = async (user, token) => {
  const url = `http://localhost:5000/verify-email?token=${token}`;

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verify your email",
      html: `Click <a href="${url}">here</a> to verify your email.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic, address } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (!name || !email || !password || !address) {
      res.status(400);
      throw Error("Please fill all the details");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400);
      throw new Error("user already exist");
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
      address,
    });

    if (user) {
      const token = generateToken(user._id);
      sendVerificationEmail(user, token);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token,
        message: "User created successfully. Please verify your email.",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
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

    // if (!user.isVerified) {
    //   return res.status(401).json({ message: "Please verify your email" });
    // }

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
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
