import { gql } from "@apollo/client";

const getAccessoriesBasedOnParent = gql
`query($parentId: ID!) {
    getAccessoriesBasedOnParent(parentId:$parentId){
         id,
      image,
      title,
      price,
    }
  }
  `

  export {getAccessoriesBasedOnParent}