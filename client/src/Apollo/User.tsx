import { gql } from "@apollo/client";

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
  mutation (
    $id: ID!
    $first: String
    $last: String
    $email: String
    $birthDate: String
    $phoneNumber: String
  ) {
    modifyUserInformation(
      id: $id
      first: $first
      last: $last
      email: $email
      birthDate: $birthDate
      phoneNumber: $phoneNumber
    ) {
      first
      last
      email
      birthDate
      phoneNumber
      id
    }
  }
`;

const getUserLikedProducts = gql`
  query ($id: ID!) {
    getUserInfo(id: $id) {
      likedProducts
    }
  }
`;

const register_user_no_third_party = gql`
  mutation (
    $first: FirstNameRegexType!
    $last: LastNameRegexType!
    $password: PasswordRegexType!
    $email: EmailRegexType!
  ) {
    register_user_no_third_party(
      first: $first
      last: $last
      password: $password
      email: $email
    ) {
      id
      email
    }
  }
`;

const login_user_no_third_party = gql`
  query ($email: EmailRegexType!, $password: PasswordRegexType!) {
    login_user_no_third_party(email: $email, password: $password) {
      success
      message
      token
      uid
      expirationDate
    }
  }
`;

export {
  getUserInformation,
  setUserInformation,
  getUserLikedProducts,
  register_user_no_third_party,
  login_user_no_third_party
};
