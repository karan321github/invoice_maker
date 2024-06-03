import Product from "../models/product.js";

 const addProduct = async (req, res) => {
  try {
    const { name, quantity, rate } = req.body;
    if(!name || !quantity || ! rate){
        throw new Error("Please provide all details");
    }
    const total = quantity * rate;
    const gst = total * 0.18;
    const product = new Product({ name, quantity, rate, total, gst });
    await product.save();

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error });
  }
};
 export default addProduct;