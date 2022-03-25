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

export { registerGood, registerBad, registerExists, loginGood, loginBad, loginInvalid };
