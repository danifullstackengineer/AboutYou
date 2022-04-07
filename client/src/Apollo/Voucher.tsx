import { gql } from "@apollo/client";

const getVoucher = gql`
  query ($voucher: String!) {
    getVoucher(voucher: $voucher) {
      value
      startDate
      endDate
    }
  }
`;

export {getVoucher}
