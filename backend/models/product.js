import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true },
  gst: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
