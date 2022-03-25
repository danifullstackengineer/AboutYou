import { createSlice } from "@reduxjs/toolkit";
import slider1 from "../assets/jpeg/slider1.jpg";
import slider2 from "../assets/jpeg/slider2.jpg";
import slider3 from "../assets/jpeg/slider3.webp";
import slider4 from "../assets/jpeg/slider4.webp";
import slider5 from "../assets/jpeg/slider5.webp";

const initialState: [] = [];

export type RootState = ReturnType<typeof basketSlice.reducer>;

export const getBasketTotal = (basket: []) => {};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addToBasketAction: (state: any, action: any) => {
      state.unshift(action.payload);
    },
    addAllItemsToBasketAction: (state: any, action: any) => {
      
    },
  },
});

export const { addToBasketAction, addAllItemsToBasketAction } =
  basketSlice.actions;

export default basketSlice;
