import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  products: [productSchema],
  date: { type: Date, default: Date.now },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
