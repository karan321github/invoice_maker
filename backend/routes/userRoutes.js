import express from "express";
import fs from 'fs';
import { generatePDF, login, registerUser , verifyEmail } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.post('/generate-pdf' , (req , res) =>{
    const{products , userDetails} = req.body;
    generatePDF(products , userDetails);
    res.download('invoice.pdf');
});
router.get("/verify/:token", verifyEmail);

export default router;
