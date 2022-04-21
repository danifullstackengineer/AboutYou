import { gql } from "@apollo/client";

const getAllProductsMain = gql`
  query ($isCustomizable: Boolean!) {
    getProducts(isCustomizable: $isCustomizable) {
      id
      backgroundImg
      foregroundImg
      title
      price
      colors
      sizes
      accessoryId
      likes
      isCustomizable
    }
  }
`;

export { getAllProductsMain };
