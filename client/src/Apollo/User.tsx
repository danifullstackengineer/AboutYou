import { gql } from "@apollo/client";

const getUserFirstName = gql`
  query ($id: ID!) {
    getUserInfo(id: $id) {
      first
    }
  }
`;

const getUserInformation = gql`
  query ($id: ID!) {
    getUserInfo(id: $id) {
      first
      last
      birthDate
      phoneNumber
    }
  }
`;

const setUserInformation = gql`
    mutation($id: ID!, $first: String, $last: String, $email: String, $birthDate: String, $phoneNumber: String){
        modifyUserInformation(id: $id, first: $first, last: $last, email: $email, birthDate: $birthDate, phoneNumber: $phoneNumber){
            first,
            last,
            email,
            birthDate,
            phoneNumber,
            id
        }
    }
`;

const getUserLikedProducts = gql`
  query($id: ID!){
    getUserInfo(id: $id){
      likedProducts
    }
  }
`

export { getUserFirstName, getUserInformation, setUserInformation, getUserLikedProducts, };
