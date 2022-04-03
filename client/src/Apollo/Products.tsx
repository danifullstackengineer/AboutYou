import { gql } from "@apollo/client";

const getSliderOneItem = gql`
  query ($slideNumber: Int!) {
    getSliderOneProductsBasedOnSlideNumber(slideNumber: $slideNumber) {
      id
      image
      button
      heart
      lastSlide
      title1
      title2
      slideNumber
      specialTitle
      buttonName
    }
  }
`;
const getSliderTwoItem = gql`
  query ($slideNumber: Int!) {
    getSliderTwoProductsBasedOnSlideNumber(slideNumber: $slideNumber) {
      id
      backgroundImg
      foregroundImg
      tags {
        name
        special
      }
      title
      priceDiscount {
        full
        discount
      }
      price
      colors
      sizes
      slideNumber
    }
  }
`;

export { getSliderOneItem, getSliderTwoItem };
