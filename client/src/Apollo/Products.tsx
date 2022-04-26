import { gql } from "@apollo/client";

const getAllProductsMain = gql`
  query {
    getProducts {
      id
      backgroundImg
      foregroundImg
      title
      price
      colors
      sizes
      accessoryId
      likes
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


export { getAllProductsMain, setLikedProduct};
