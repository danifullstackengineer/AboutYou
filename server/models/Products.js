import mongoose from "mongoose";

const productTable = mongoose.Schema({
  backgroundImg: String,
  foregroundImg: String,
  tags: [{ name: String, special: Boolean }],
  title: String,
  price: String,
  priceDiscount: {full: String, discount: String},
  colors: [String],
  sizes: [String],
});

export default mongoose.model("Product", productTable);
