import { gql } from "@apollo/client";

const getAccessoriesBasedOnParent = gql`
  query ($parentId: ID!) {
    getAccessoriesBasedOnParent(parentId: $parentId) {
      _id
      backgroundImg
      title
      price
      dark
    }
  }
`;

const getAccessories = gql`
  query ($offset: Int, $limit: Int) {
    getAccessories(offset: $offset, limit: $limit) {
      _id
      backgroundImg
      title
      price
      likes
      parentId
      dark
    }
  }
`;

const setLikedAccessory = gql`
  mutation ($id: ID!, $likedId: String!, $liked: Boolean!){
	  modifyUserLikedAccessories (id: $id, likedId: $likedId, liked: $liked) {
		  likedProducts
	  }
  }
`

const getIfLikedAccessoryByUserAndTotalLikes = gql`
  query ($id: ID, $accessory_id: ID!) {
	  getIfLikedAccessoryByUserAndTotalLikes (id: $id, accessory_id: $accessory_id) {
		  likes
		  liked
	  }
  }
`

export { getAccessoriesBasedOnParent, getAccessories, getIfLikedAccessoryByUserAndTotalLikes , setLikedAccessory};
