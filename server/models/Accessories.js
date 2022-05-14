import mongoose from "mongoose";

const accessoryTable = mongoose.Schema({
    backgroundImg: String,
    title: String,
    price: Number,
    likes: {
        type: Number,
        default: 0
    },
    parentId: [String],
    dark: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Accessory", accessoryTable);