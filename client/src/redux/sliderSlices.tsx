import { createSlice } from "@reduxjs/toolkit";
import slider1 from "../assets/jpeg/slider1.jpg";
import slider2 from "../assets/jpeg/slider2.jpg";
import slider3 from "../assets/jpeg/slider3.webp";
import slider4 from "../assets/jpeg/slider4.webp";
import slider5 from "../assets/jpeg/slider5.webp";

const initialState: {
  sliderItems: string[];
  slider: string[];
  counter: number[];
} = {
  sliderItems: [slider1, slider2, slider3, slider4, slider5],
  slider: [slider1, slider2],
  counter: [0, 1],
};

export type RootState = ReturnType<typeof mainSliderSlice.reducer>;

const mainSliderSlice = createSlice({
  name: "mainSlider",
  initialState: initialState,
  reducers: {
    setNextSlide: (state: any, action: any) => {
      state.slider = [
        state.sliderItems[action.payload[0]],
        state.sliderItems[action.payload[1]],
      ];
    },
  },
});

export const { setNextSlide } = mainSliderSlice.actions;

export default mainSliderSlice;
