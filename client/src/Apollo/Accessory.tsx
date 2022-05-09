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

const getAccessories = gql`
query {
  getAccessories {
    id,
    image,
    title,
    price,
    likes,
    parentId
  }
}
`

  export {getAccessoriesBasedOnParent, getAccessories}