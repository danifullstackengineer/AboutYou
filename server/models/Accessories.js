import mongoose from "mongoose";

const accessoryTable = mongoose.Schema({
  backgroundImg: String,
  title: String,
  price: Number,
  likes: {
    type: Number,
    default: 0,
  },
  parentId: [String],
  dark: {
    type: Boolean,
    default: true,
  },
//   search_string: {
//     type: String,
//     required: true,
//     index: true,
//   },
/* Temporary - will be removed */
  sizes: [String],
  colors: [String]
});

export default mongoose.model("Accessory", accessoryTable);
