declare type IAddress = {
  formality: string;
  country: string;
  firstName: string;
  lastName: string;
  addressOne: string;
  addressTwo: string;
  state: string;
  p_code: string;
  city: string;
  birth?: string;
  tax?: string;
} | undefined;
export default IAddress;
