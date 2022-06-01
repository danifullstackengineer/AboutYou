import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userTable = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  birthDate: String,
  phoneNumber: String,
  likedProducts: {
    type: [String],
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
  verification_uuid: {
    type: String,
    default: uuidv4(),
  },
});

export default mongoose.model("User", userTable);
