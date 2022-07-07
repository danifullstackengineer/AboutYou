import mongoose from "mongoose";

const orderTable = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  madeBy: String,
  orderId: String,
  orderInformation: Object,
  payId: String,
  paid: {
    type: Boolean,
    default: false,
  },
  method: String,
});

export default mongoose.model("Order", orderTable);
