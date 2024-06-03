import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/user", userRoutes);
app.use("/api/user", productRoute);
// app.use(verifyEmailRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
