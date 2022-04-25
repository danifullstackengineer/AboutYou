import mongoose from "mongoose";

const productTable = mongoose.Schema({
  backgroundImg: String,
  foregroundImg: String,
  title: String,
  price: Number,
  colors: [String],
  sizes: [Number],
  accessoryId: [String],
  likes: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("Product", productTable);

