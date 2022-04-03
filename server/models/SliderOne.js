import mongoose from 'mongoose';

const sliderOneProductTable = mongoose.Schema({
    image: String,
    button: Boolean,
    heart: Boolean,
    lastSlide: Boolean,
    title1: String,
    title2: String,
    slideNumber: Number,
    specialTitle: String,
    buttonName: String
})

export default mongoose.model("SliderOneProduct", sliderOneProductTable)