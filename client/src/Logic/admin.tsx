import { AccessLevel } from "../Context/Admin";

const patterns = {
    username: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   Minimum eight characters, at least one letter, one number and one special character:
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    code: /^[a-z]{5,7}$/
  };

const handleValidationAdmin = (
  username: string,
  password: string,
  accessCode: string
): { message: string; truth: boolean } => {
  var result;
  if (!patterns.username.test(username)){
      return {message: "Username failed validation. Please try again.", truth: false};
  }
  if(!patterns.password.test(password)){
      return {message: "Password failed validation. Please try again.", truth: false}
  }
  if(!patterns.code.test(accessCode)){
      return {message: "Access code failed validation. Please try again.", truth: false};
  }
  return {truth: true, message: "Validation is successful. Awaiting server response."};
};


export {handleValidationAdmin};