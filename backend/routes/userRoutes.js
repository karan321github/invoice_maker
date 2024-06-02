import express from "express";
import { login, registerUser , verifyEmail } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);

export default router;
