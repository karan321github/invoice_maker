import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import Invoice from "./models/invoice.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Api is working");
// });

app.use("/api/user", userRoutes);
app.use("/api/user", productRoute);




//-----------------------------------------------Deployment-----------------------------------------

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
