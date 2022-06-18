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
    default: 0,
  },
  dark: {
    type: Boolean,
    default: false,
  },
//   search_string: {
//     type: String,
//     required: true,
//     index: true,
//   },
});

export default mongoose.model("Product", productTable);
