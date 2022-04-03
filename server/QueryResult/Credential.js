const registerGood = { success: true, message: "Successfuly registered!" };
const registerBad = {
  success: false,
  message: "Something went wrong while registering, please try again!",
};
const registerExists = {
  success: false,
  message: "Email is already in use, please use a different one!",
};
const loginGood = { success: true, message: "Successfully logged in!" };
const loginBad = {
  success: false,
  message: "Something went wrong while logging in, please try again!",
};
const loginInvalid = {
  success: false,
  message: "Invalid credentials, please try again!",
};
const orderCreationFailed = {
  success: false,
  message: "Something went wrong while creating your order, please try again!",
};
const orderCreationSuccess = {
  success: true,
  message: "Order successfully created. Awaiting payment.",
};

export {
  registerGood,
  registerBad,
  registerExists,
  loginGood,
  loginBad,
  loginInvalid,
};
