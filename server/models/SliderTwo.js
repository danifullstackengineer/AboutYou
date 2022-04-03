import mongoose from 'mongoose';

const sliderTwoProductTable = mongoose.Schema({
    backgroundImg: String,
    foregroundImg: String,
    tags: [{ name: String, special: Boolean }],
    title: String,
    price: String,
    priceDiscount: { full: String, discount: String },
    colors: [String],
    sizes: [String],
    slideNumber: Number,
})

export default mongoose.model("SliderTwoProduct", sliderTwoProductTable)