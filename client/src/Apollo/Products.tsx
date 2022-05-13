import { gql } from "@apollo/client";

const getAllProductsMain = gql`
  query ($dark: Boolean!) {
    getProducts(dark: $dark) {
      id
      backgroundImg
      foregroundImg
      title
      price
      colors
      sizes
      accessoryId
      likes
      dark
    }
  }
`;

const setLikedProduct = gql`
  mutation ($id: ID!, $likedId: String!, $liked: Boolean!) {
    modifyUserLikedProducts(id: $id, likedId: $likedId, liked: $liked) {
      likedProducts
    }
  }
`;
const getIfLikedProductByUserAndTotalLikes = gql`
  query ($id: ID, $product_id: ID!) {
    getIfLikedProductByUserAndTotalLikes(
      id: $id,
      product_id: $product_id
    ) {
      likes
      liked
    }
  }
`;

export { getAllProductsMain, setLikedProduct, getIfLikedProductByUserAndTotalLikes };
