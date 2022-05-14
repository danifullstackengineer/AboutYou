import { gql } from "@apollo/client";

const getAccessoriesBasedOnParent = gql
`query($parentId: ID!) {
    getAccessoriesBasedOnParent(parentId:$parentId){
         id,
      backgroundImg,
      title,
      price,
      dark
    }
  }
  `

const getAccessories = gql`
query {
  getAccessories {
    id,
    backgroundImg,
    title,
    price,
    likes,
    parentId,
    dark
  }
}
`

  export {getAccessoriesBasedOnParent, getAccessories}