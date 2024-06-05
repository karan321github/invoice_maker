import express from "express";
import { generatePDF, login, registerUser  } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login);


export default router;
