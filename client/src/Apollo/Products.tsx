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

const setLikedProduct = gql`
  mutation($id: ID!, $likedId: String!, $liked: Boolean!){
    modifyUserLikedProducts(id: $id, likedId: $likedId, liked: $liked){
      likedProducts
    }
  }
`

export { getAllProductsMain, setLikedProduct };
