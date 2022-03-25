import mongoose from 'mongoose';


const userTable = new mongoose.Schema({
    first: String,
    last: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model("User", userTable);