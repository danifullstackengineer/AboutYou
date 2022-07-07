import { gql } from "@apollo/client";

const create_paypal_payment = gql`
  query (
    $basket: [ItemType]!
    $addressOne: AddressOneType!
    $addressTwo: AddressTwoType
    $_id: ID
    $country_code: String!
  ) {
    create_paypal_payment(
      basket: $basket
      addressOne: $addressOne
      addressTwo: $addressTwo
      _id: $_id
      country_code: $country_code
    ) {
      success
      message
      redirect_link
    }
  }
`;

export { create_paypal_payment };
