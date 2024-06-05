import mongoose from "mongoose";


const invoiceSchema = new mongoose.Schema({
  products: [{
      name: String,
      qty: Number,
      rate: Number,
      total: Number,
      gst: Number
  }],
  date: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice