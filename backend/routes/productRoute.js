import express from "express";
import addProduct from "../controllers/productController.js";
// import { protect } from "../utils/authMiddiliware.js";
const router = express.Router();

router.post("/products", addProduct);

export default router;
