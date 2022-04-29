import mongoose from "mongoose";

const accessoryTable = mongoose.Schema({
    image: String,
    title: String,
    price: Number,
    likes: {
        type: Number,
        default: 0
    },
    parentId: [String]
})

export default mongoose.model("Accessory", accessoryTable);